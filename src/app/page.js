'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
 
    const registration = localStorage.getItem('registration');
    if (registration) {
      router.push('/programacao');
      return;
    }
    const guest = localStorage.getItem('guest');
    if (guest) {
      router.push('/cadastro');

    const stored = localStorage.getItem('guest');
    if (stored) {
      router.push('/programacao');

    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    localStorage.setItem('guest', JSON.stringify(data));
    router.push('/cadastro');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">Bem-vindo</h1>
        <input required name="responsavel" placeholder="Nome do responsável" className="w-full border p-2" />
        <input required name="apartamento" placeholder="Número do apartamento" className="w-full border p-2" />
        <input required name="hotel" placeholder="Nome do hotel" className="w-full border p-2" />
        <button className="bg-blue-600 text-white px-4 py-2 w-full" type="submit">Continuar</button>
      </form>
    </div>
  );
}
