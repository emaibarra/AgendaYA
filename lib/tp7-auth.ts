import { NextRequest, NextResponse } from 'next/server';

export function authenticateBasic(request: NextRequest): NextResponse | null {
  const authorization = request.headers.get('authorization');

  if (!authorization?.startsWith('Basic ')) {
    return unauthorized();
  }

  try {
    const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf-8');

    const separator = decoded.indexOf(':');

    if (separator < 0) {
      return unauthorized();
    }

    const username = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);

    const expectedUsername = process.env.TP7_AUTH_USER;
    const expectedPassword = process.env.TP7_AUTH_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      console.error('Faltan las credenciales de TP7 en el entorno.');
      return NextResponse.json(
        { error: 'Configuración de autenticación incompleta.' },
        { status: 500 }
      );
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return unauthorized();
    }

    return null;
  } catch {
    return unauthorized();
  }
}

function unauthorized(): NextResponse {
  return NextResponse.json(
    { error: 'No autorizado. Se requieren credenciales válidas.' },
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="TP7"',
      },
    }
  );
}
