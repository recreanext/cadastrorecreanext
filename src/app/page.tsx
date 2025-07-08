'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [responsavel, setResponsavel] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [hotel, setHotel] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('parentInfo');
    if (saved) {
      const info = JSON.parse(saved);
      setResponsavel(info.responsavel || '');
      setApartamento(info.apartamento || '');
      setHotel(info.hotel || '');
    }
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(
      'parentInfo',
      JSON.stringify({ responsavel, apartamento, hotel })
    );
    router.push('/ficha');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 gap-4">
      <h1 className="text-2xl font-bold">Bem-vindo</h1>
      <form onSubmit={submit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          className="border p-2"
          placeholder="Nome do responsável"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          required
        />
        <input
          className="border p-2"
          placeholder="Número do apartamento"
          value={apartamento}
          onChange={(e) => setApartamento(e.target.value)}
          required
        />
        <input
          className="border p-2"
          placeholder="Nome do hotel"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Continuar</button>
      </form>
    </main>
  );
}
