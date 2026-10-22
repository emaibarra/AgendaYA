import { NextRequest, NextResponse } from 'next/server';
import { logRequest } from '@/lib/tp7-logger';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const ALLOWED_DOCUMENTS = ['protocolo-mantenimiento.txt'];

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name');
  const documentName = name ?? 'protocolo-mantenimiento.txt';

  // Solo se permiten los nombres de archivo autorizados.
  if (!ALLOWED_DOCUMENTS.includes(documentName)) {
    try {
      await logRequest({
        timestamp: new Date().toISOString(),
        method: request.method,
        path: request.nextUrl.pathname,
        statusCode: 400,
      });
    } catch (error) {
      console.error('Error al registrar el request:', error);
      return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
    }

    return NextResponse.json({ error: 'Nombre de documento no permitido.' }, { status: 400 });
  }

  const documentPath = path.join(process.cwd(), 'public', 'documents', documentName);

  try {
    const content = await readFile(documentPath, 'utf-8');

    await logRequest({
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.nextUrl.pathname,
      statusCode: 200,
    });

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error al consultar el documento:', error);

    try {
      await logRequest({
        timestamp: new Date().toISOString(),
        method: request.method,
        path: request.nextUrl.pathname,
        statusCode: 500,
      });
    } catch (logError) {
      console.error('Error al registrar el request:', logError);
    }

    return NextResponse.json({ error: 'No se pudo consultar el documento.' }, { status: 500 });
  }
}
