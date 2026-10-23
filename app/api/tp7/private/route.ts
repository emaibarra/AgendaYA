import { NextRequest, NextResponse } from 'next/server';
import { logRequest } from '@/lib/tp7-logger';
import { authenticateBasic } from '@/lib/tp7-auth';

export async function GET(request: NextRequest) {
  const authResponse = authenticateBasic(request);
  const statusCode = authResponse ? authResponse.status : 200;

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

  if (authResponse) {
    return authResponse;
  }

  return NextResponse.json({
    message: 'Acceso autorizado al recurso de demostración.',
  });
}
