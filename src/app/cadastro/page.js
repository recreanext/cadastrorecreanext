'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Cadastro() {
  const router = useRouter();

  const [children, setChildren] = useState([{ nome: '', idade: '' }]);

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

    setChildren((c) => [...c, { nome: '', idade: '' }]);

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

    const payload = { ...form, children };
    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    localStorage.setItem('registration', JSON.stringify(payload));

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


        <h2 className="font-semibold">Dados pessoais</h2>
        <input
          required
          value={form.responsaveis}
          onChange={(e) => handleChange('responsaveis', e.target.value)}
          placeholder="Nome dos responsáveis"
          className="w-full border p-2"
        />
        <input
          required
          value={form.whatsapp1}
          onChange={(e) => handleChange('whatsapp1', e.target.value)}
          placeholder="WhatsApp 1"
          className="w-full border p-2"
        />
        <input
          value={form.whatsapp2}
          onChange={(e) => handleChange('whatsapp2', e.target.value)}
          placeholder="WhatsApp 2"
          className="w-full border p-2"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="E-mail"
          className="w-full border p-2"
        />
        <input
          value={form.hotel}
          readOnly
          className="w-full border p-2 bg-gray-100"
        />
        <input
          value={form.apartamento}
          readOnly
          className="w-full border p-2 bg-gray-100"
        />
        <div className="flex gap-2">
          <input
            required
            type="date"
            value={form.checkin}
            onChange={(e) => handleChange('checkin', e.target.value)}
            className="w-full border p-2"
          />
          <input
            required
            type="date"
            value={form.checkout}
            onChange={(e) => handleChange('checkout', e.target.value)}
            className="w-full border p-2"
          />
        </div>

        <h2 className="font-semibold">Informações médicas</h2>
        <input
          value={form.planoSaude}
          onChange={(e) => handleChange('planoSaude', e.target.value)}
          placeholder="Plano de saúde"
          className="w-full border p-2"
        />
        <input
          value={form.emergencia}
          onChange={(e) => handleChange('emergencia', e.target.value)}
          placeholder="Contato de emergência"
          className="w-full border p-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.alergias}
            onChange={(e) => handleChange('alergias', e.target.checked)}
          />
          Possui alergias?
        </label>
        {form.alergias && (
          <input
            value={form.alergiasDesc}
            onChange={(e) => handleChange('alergiasDesc', e.target.value)}
            placeholder="Quais?"
            className="w-full border p-2"
          />
        )}
        <input
          value={form.reacao}
          onChange={(e) => handleChange('reacao', e.target.value)}
          placeholder="Reação e medicamentos"
          className="w-full border p-2"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.medicamentoRegular}
            onChange={(e) => handleChange('medicamentoRegular', e.target.checked)}
          />
          Usa medicamento regular?
        </label>
        {form.medicamentoRegular && (
          <input
            value={form.medicamentoDesc}
            onChange={(e) => handleChange('medicamentoDesc', e.target.value)}
            placeholder="Descreva dosagem e frequência"
            className="w-full border p-2"
          />
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.doencaCronica}
            onChange={(e) => handleChange('doencaCronica', e.target.checked)}
          />
          Possui doença crônica?
        </label>
        {form.doencaCronica && (
          <input
            value={form.doencaDesc}
            onChange={(e) => handleChange('doencaDesc', e.target.value)}
            placeholder="Qual?"
            className="w-full border p-2"
          />
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.restricaoAlimentar}
            onChange={(e) => handleChange('restricaoAlimentar', e.target.checked)}
          />
          Possui restrição alimentar?
        </label>
        {form.restricaoAlimentar && (
          <input
            value={form.restricaoDesc}
            onChange={(e) => handleChange('restricaoDesc', e.target.value)}
            placeholder="Qual?"
            className="w-full border p-2"
          />
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.neurodivergencia}
            onChange={(e) => handleChange('neurodivergencia', e.target.checked)}
          />
          Possui neurodivergência?
        </label>
        {form.neurodivergencia && (
          <input
            value={form.neuroDesc}
            onChange={(e) => handleChange('neuroDesc', e.target.value)}
            placeholder="Qual?"
            className="w-full border p-2"
          />
        )}

        <h2 className="font-semibold">Sobre recreação</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.sabeNadar}
            onChange={(e) => handleChange('sabeNadar', e.target.checked)}
          />
          Sabe nadar?
        </label>
        {!form.sabeNadar && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.sabeFlutuar}
              onChange={(e) => handleChange('sabeFlutuar', e.target.checked)}
            />
            Sabe flutuar?
          </label>
        )}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.autorizaSairHotel}
            onChange={(e) => handleChange('autorizaSairHotel', e.target.checked)}
          />
          Autorizo sair do hotel para atividades
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.autorizaRefeicao}
            onChange={(e) => handleChange('autorizaRefeicao', e.target.checked)}
          />
          Autorizo refeição recreativa
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.autorizaSairSozinho}
            onChange={(e) => handleChange('autorizaSairSozinho', e.target.checked)}
          />
          Autorizo sair sozinho das atividades
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.autorizaImagem}
            onChange={(e) => handleChange('autorizaImagem', e.target.checked)}
          />
          Autorizo uso de imagem em redes sociais
        </label>


        <button className="bg-blue-600 text-white px-4 py-2 w-full" type="submit">Salvar</button>
      </form>
    </div>
  );
}
