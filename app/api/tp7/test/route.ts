import { NextRequest, NextResponse } from 'next/server';
import { logRequest } from '@/lib/tp7-logger';

export async function GET(request: NextRequest) {
  const responseData = {
    ok: true,
    message: 'El servidor web de AgendaYA está funcionando.',
    timestamp: new Date().toISOString(),
  };

  try {
    await logRequest({
      timestamp: responseData.timestamp,
      method: request.method,
      path: request.nextUrl.pathname,
      statusCode: 200,
    });
  } catch (error) {
    console.error('Error al registrar el request:', error);
    return NextResponse.json(
      { ok: false, message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }

  return NextResponse.json(responseData, { status: 200 });
}
