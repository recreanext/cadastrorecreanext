'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Ficha() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedForm = localStorage.getItem('childForm');
    if (savedForm) {
      router.replace('/programacao');
    } else {
      setLoaded(true);
    }
  }, [router]);

  const parentInfo = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('parentInfo') || '{}')
    : {};

  const [nomeCriancas, setNomeCriancas] = useState('');
  const [idades, setIdades] = useState('');
  const [responsaveis, setResponsaveis] = useState(parentInfo.responsavel || '');
  const [whats1, setWhats1] = useState('');
  const [whats2, setWhats2] = useState('');
  const [email, setEmail] = useState('');
  const hotel = parentInfo.hotel || '';
  const apto = parentInfo.apartamento || '';
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');

  const [plano, setPlano] = useState('');
  const [contatoEmerg, setContatoEmerg] = useState('');
  const [temAlergia, setTemAlergia] = useState(false);
  const [descAlergia, setDescAlergia] = useState('');
  const [reacaoMed, setReacaoMed] = useState('');
  const [usaMed, setUsaMed] = useState(false);
  const [descMed, setDescMed] = useState('');
  const [doencaCronica, setDoencaCronica] = useState(false);
  const [qualDoenca, setQualDoenca] = useState('');
  const [restricaoAlim, setRestricaoAlim] = useState(false);
  const [qualRestricao, setQualRestricao] = useState('');
  const [neurodiv, setNeurodiv] = useState(false);
  const [qualNeuro, setQualNeuro] = useState('');

  const [sabeNadar, setSabeNadar] = useState(false);
  const [sabeFlutuar, setSabeFlutuar] = useState(false);
  const [autSaida, setAutSaida] = useState(false);
  const [autRefeicao, setAutRefeicao] = useState(false);
  const [autSozinho, setAutSozinho] = useState(false);
  const [autImagem, setAutImagem] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      nomeCriancas,
      idades,
      responsaveis,
      whats1,
      whats2,
      email,
      hotel,
      apto,
      checkin,
      checkout,
      plano,
      contatoEmerg,
      temAlergia,
      descAlergia,
      reacaoMed,
      usaMed,
      descMed,
      doencaCronica,
      qualDoenca,
      restricaoAlim,
      qualRestricao,
      neurodiv,
      qualNeuro,
      sabeNadar,
      sabeFlutuar,
      autSaida,
      autRefeicao,
      autSozinho,
      autImagem,
    };
    localStorage.setItem('childForm', JSON.stringify(data));
    const allForms = JSON.parse(localStorage.getItem('forms') || '[]');
    allForms.push(data);
    localStorage.setItem('forms', JSON.stringify(allForms));
    router.push('/programacao');
  };

  if (!loaded) return null;

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Ficha de Cadastro Infantil</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <h2 className="font-semibold">Dados Pessoais</h2>
        <input className="border p-2" placeholder="Nome da(s) criança(s)" value={nomeCriancas} onChange={e=>setNomeCriancas(e.target.value)} required />
        <input className="border p-2" placeholder="Idades" value={idades} onChange={e=>setIdades(e.target.value)} required />
        <input className="border p-2" placeholder="Nome dos responsáveis" value={responsaveis} onChange={e=>setResponsaveis(e.target.value)} required />
        <input className="border p-2" placeholder="WhatsApp 1" value={whats1} onChange={e=>setWhats1(e.target.value)} required />
        <input className="border p-2" placeholder="WhatsApp 2" value={whats2} onChange={e=>setWhats2(e.target.value)} />
        <input className="border p-2" placeholder="E-mail" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="border p-2" placeholder="Hotel" value={hotel} readOnly />
        <input className="border p-2" placeholder="Apartamento" value={apto} readOnly />
        <div className="flex gap-2">
          <input className="border p-2 w-full" placeholder="Check-in" type="date" value={checkin} onChange={e=>setCheckin(e.target.value)} required />
          <input className="border p-2 w-full" placeholder="Check-out" type="date" value={checkout} onChange={e=>setCheckout(e.target.value)} required />
        </div>

        <h2 className="font-semibold mt-4">Informações Médicas</h2>
        <input className="border p-2" placeholder="Plano de saúde" value={plano} onChange={e=>setPlano(e.target.value)} />
        <input className="border p-2" placeholder="Contato de emergência" value={contatoEmerg} onChange={e=>setContatoEmerg(e.target.value)} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={temAlergia} onChange={e=>setTemAlergia(e.target.checked)} />Possui alergias?</label>
        {temAlergia && <input className="border p-2" placeholder="Descrição das alergias" value={descAlergia} onChange={e=>setDescAlergia(e.target.value)} />}
        <input className="border p-2" placeholder="Reação e medicamentos" value={reacaoMed} onChange={e=>setReacaoMed(e.target.value)} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={usaMed} onChange={e=>setUsaMed(e.target.checked)} />Usa medicamento regular?</label>
        {usaMed && <input className="border p-2" placeholder="Descrição com dosagem e frequência" value={descMed} onChange={e=>setDescMed(e.target.value)} />}
        <label className="flex items-center gap-2"><input type="checkbox" checked={doencaCronica} onChange={e=>setDoencaCronica(e.target.checked)} />Possui doença crônica?</label>
        {doencaCronica && <input className="border p-2" placeholder="Qual?" value={qualDoenca} onChange={e=>setQualDoenca(e.target.value)} />}
        <label className="flex items-center gap-2"><input type="checkbox" checked={restricaoAlim} onChange={e=>setRestricaoAlim(e.target.checked)} />Possui restrição alimentar?</label>
        {restricaoAlim && <input className="border p-2" placeholder="Qual?" value={qualRestricao} onChange={e=>setQualRestricao(e.target.value)} />}
        <label className="flex items-center gap-2"><input type="checkbox" checked={neurodiv} onChange={e=>setNeurodiv(e.target.checked)} />Possui neurodivergência?</label>
        {neurodiv && <input className="border p-2" placeholder="Qual?" value={qualNeuro} onChange={e=>setQualNeuro(e.target.value)} />}

        <h2 className="font-semibold mt-4">Sobre Recreação</h2>
        <label className="flex items-center gap-2"><input type="checkbox" checked={sabeNadar} onChange={e=>setSabeNadar(e.target.checked)} />Sabe nadar?</label>
        {!sabeNadar && <label className="flex items-center gap-2"><input type="checkbox" checked={sabeFlutuar} onChange={e=>setSabeFlutuar(e.target.checked)} />Sabe flutuar?</label>}
        <label className="flex items-center gap-2"><input type="checkbox" checked={autSaida} onChange={e=>setAutSaida(e.target.checked)} />Autorização para sair do hotel para atividades</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={autRefeicao} onChange={e=>setAutRefeicao(e.target.checked)} />Autorização para refeição recreativa</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={autSozinho} onChange={e=>setAutSozinho(e.target.checked)} />Autorização para sair sozinho das atividades</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={autImagem} onChange={e=>setAutImagem(e.target.checked)} />Autorização de uso de imagem em redes sociais</label>

        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">Salvar</button>
      </form>
    </main>
  );
}
