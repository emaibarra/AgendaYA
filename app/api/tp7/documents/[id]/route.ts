import { NextRequest, NextResponse } from 'next/server';
import { logRequest } from '@/lib/tp7-logger';

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: Context) {
  const { id } = await context.params;

  // Por ahora no hay documentos cargados.
  const documentExists = false;

  const statusCode = documentExists ? 200 : 404;

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

  return NextResponse.json(
    {
      error: 'Documento no encontrado.',
      documentId: id,
    },
    { status: statusCode }
  );
}
