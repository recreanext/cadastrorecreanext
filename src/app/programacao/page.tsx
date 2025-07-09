'use client'

export default function Programacao() {
  return (
    <main className="p-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-bold">Programação</h1>
      <a
        href="/programacao.pdf"
        download
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Baixar PDF da programação
      </a>
      <a
        href="https://wa.me/SEUNUMERO"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full"
        target="_blank" rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </main>
  );
}
