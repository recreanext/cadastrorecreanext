export async function POST(request) {
  const { password } = await request.json();
  if (password === process.env.ADMIN_PASS) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }
  return new Response(JSON.stringify({ success: false }), { status: 401 });
}
