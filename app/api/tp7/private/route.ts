import { NextRequest, NextResponse } from 'next/server';
import { logRequest } from '@/lib/tp7-logger';

export async function GET(request: NextRequest) {
  const authorized = request.headers.get('x-demo-token') === 'tp7-demo-2026';

  const statusCode = authorized ? 200 : 401;

  try {
    await logRequest({
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.nextUrl.pathname,
      statusCode,
    });
  } catch (error) {
    console.error('Error al registrar el request:', error);

    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }

  if (!authorized) {
    return NextResponse.json(
      { error: 'No autorizado. Se requiere un token válido.' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: 'Acceso autorizado al recurso de demostración.',
  });
}
