'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Cadastro() {
  const router = useRouter();
  const [children, setChildren] = useState([{ nome: '', idade: '', restricoes: '', alergias: '', autorizado: false }]);
  const [form, setForm] = useState({
    responsaveis: '',
    whatsapp1: '',
    whatsapp2: '',
    email: '',
    hotel: '',
    apartamento: '',
    checkin: '',
    checkout: '',
    planoSaude: '',
    emergencia: '',
    alergias: false,
    alergiasDesc: '',
    reacao: '',
    medicamentoRegular: false,
    medicamentoDesc: '',
    doencaCronica: false,
    doencaDesc: '',
    restricaoAlimentar: false,
    restricaoDesc: '',
    neurodivergencia: false,
    neuroDesc: '',
    sabeNadar: false,
    sabeFlutuar: false,
    autorizaSairHotel: false,
    autorizaRefeicao: false,
    autorizaSairSozinho: false,
    autorizaImagem: false,
  });

  useEffect(() => {
    const guest = JSON.parse(localStorage.getItem('guest'));
    if (!guest) {
      router.push('/');
      return;
    }
    setForm((f) => ({
      ...f,
      responsaveis: guest.responsavel || '',
      hotel: guest.hotel || '',
      apartamento: guest.apartamento || '',
    }));
  }, [router]);

  const addChild = () => {
    setChildren((c) => [...c, { nome: '', idade: '', restricoes: '', alergias: '', autorizado: false }]);
  };

  const handleChildChange = (idx, field, value) => {
    setChildren((c) => {
      const copy = [...c];
      copy[idx][field] = value;
      return copy;
    });
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const guest = JSON.parse(localStorage.getItem('guest')) || {};
    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest, children, ...form }),
    });
    localStorage.setItem('registration', JSON.stringify({ guest, children, ...form }));
    router.push('/programacao');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-auto">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-xl font-bold text-center">Ficha de Cadastro</h1>

        <h2 className="font-semibold">Crianças</h2>
        {children.map((child, idx) => (
          <div key={idx} className="border p-2 space-y-2">
            <input
              required
              value={child.nome}
              onChange={(e) => handleChildChange(idx, 'nome', e.target.value)}
              placeholder="Nome da criança"
              className="w-full border p-2"
            />
            <input
              required
              value={child.idade}
              onChange={(e) => handleChildChange(idx, 'idade', e.target.value)}
              placeholder="Idade"
              className="w-full border p-2"
            />
            <input
              value={child.restricoes}
              onChange={(e) => handleChildChange(idx, 'restricoes', e.target.value)}
              placeholder="Restrições alimentares"
              className="w-full border p-2"
            />
            <input
              value={child.alergias}
              onChange={(e) => handleChildChange(idx, 'alergias', e.target.value)}
              placeholder="Alergias"
              className="w-full border p-2"
            />
            <label className="flex items-center gap-2">
              <input
                required
                type="checkbox"
                checked={child.autorizado}
                onChange={(e) => handleChildChange(idx, 'autorizado', e.target.checked)}
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
