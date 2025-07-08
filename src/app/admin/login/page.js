'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pass = e.target.password.value;
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass }),
    });
    if (res.ok) {
      sessionStorage.setItem('admin', 'true');
      router.push('/admin');
    } else {
      setError('Senha incorreta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-center">Login Admin</h1>
        <input type="password" name="password" required className="w-full border p-2" placeholder="Senha" />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 w-full" type="submit">Entrar</button>
      </form>
    </div>
  );
}
