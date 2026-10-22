import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

type RequestLog = {
  timestamp: string;
  method: string;
  path: string;
  statusCode: number;
};

const logDirectory = path.join(process.cwd(), 'data');
const logFile = path.join(logDirectory, 'tp7-logs.json');

export async function logRequest(entry: RequestLog) {
  await mkdir(logDirectory, { recursive: true });

  let logs: RequestLog[] = [];

  try {
    const content = await readFile(logFile, 'utf-8');
    logs = JSON.parse(content) as RequestLog[];
  } catch (error) {
    if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) {
      throw error;
    }
  }

  logs.push(entry);

  await writeFile(logFile, JSON.stringify(logs, null, 2), 'utf-8');
}
