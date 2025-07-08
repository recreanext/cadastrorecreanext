'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Cadastro() {
  const router = useRouter();
  const [children, setChildren] = useState([
    { nome: '', idade: '', restricoes: '', alergias: '', autorizado: false },
  ]);

  const addChild = () => {
    setChildren((c) => [
      ...c,
      { nome: '', idade: '', restricoes: '', alergias: '', autorizado: false },
    ]);
  };

  const handleChange = (idx, field, value) => {
    setChildren((c) => {
      const copy = [...c];
      copy[idx][field] = value;
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guest = JSON.parse(localStorage.getItem('guest')) || {};
    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest, children }),
    });
    router.push('/programacao');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-center">Ficha da(s) Criança(s)</h1>
        {children.map((child, idx) => (
          <div key={idx} className="border p-2 space-y-2">
            <input
              required
              value={child.nome}
              onChange={(e) => handleChange(idx, 'nome', e.target.value)}
              placeholder="Nome"
              className="w-full border p-2"
            />
            <input
              required
              value={child.idade}
              onChange={(e) => handleChange(idx, 'idade', e.target.value)}
              placeholder="Idade"
              className="w-full border p-2"
            />
            <input
              value={child.restricoes}
              onChange={(e) => handleChange(idx, 'restricoes', e.target.value)}
              placeholder="Restrições alimentares"
              className="w-full border p-2"
            />
            <input
              value={child.alergias}
              onChange={(e) => handleChange(idx, 'alergias', e.target.value)}
              placeholder="Alergias"
              className="w-full border p-2"
            />
            <label className="flex items-center gap-2">
              <input
                required
                type="checkbox"
                checked={child.autorizado}
                onChange={(e) => handleChange(idx, 'autorizado', e.target.checked)}
              />
              Autorizo a participação
            </label>
          </div>
        ))}
        <button type="button" onClick={addChild} className="border px-2 py-1">Adicionar criança</button>
        <button className="bg-blue-600 text-white px-4 py-2 w-full" type="submit">Salvar</button>
      </form>
    </div>
  );
}
