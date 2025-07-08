import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request) {
  const dataPath = path.join(process.cwd(), 'data', 'registrations.json');
  const payload = await request.json();
  const file = await fs.readFile(dataPath, 'utf8');
  const regs = JSON.parse(file);
  const record = payload.children
    ? { guest: payload.guest, children: payload.children }
    : payload;
  regs.push({ ...record, date: new Date().toISOString() });
  await fs.writeFile(dataPath, JSON.stringify(regs, null, 2));
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
