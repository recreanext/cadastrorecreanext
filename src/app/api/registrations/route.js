import { promises as fs } from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';
import { utils, write } from 'xlsx';

const dataPath = path.join(process.cwd(), 'data', 'registrations.json');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const download = searchParams.get('download');
  const file = await fs.readFile(dataPath, 'utf8');
  if (download) {
    const regs = JSON.parse(file);
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(regs);
    utils.book_append_sheet(wb, ws, 'Registrations');
    const buffer = write(wb, { type: 'buffer', bookType: 'xlsx' });
    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="registrations.xlsx"'
      }
    });
  }
  return new Response(file, { status: 200 });
}
