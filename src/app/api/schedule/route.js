import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'schedule.json');

export async function GET() {
  const file = await fs.readFile(dataPath, 'utf8');
  return new Response(file, { status: 200 });
}

export async function PUT(request) {
  const schedule = await request.json();
  await fs.writeFile(dataPath, JSON.stringify(schedule, null, 2));
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
