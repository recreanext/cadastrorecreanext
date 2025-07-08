'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const router = useRouter();
  const [schedule, setSchedule] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('admin') !== 'true') {
      router.push('/admin/login');
      return;
    }
    fetch('/api/schedule').then((r) => r.json()).then(setSchedule);
    fetch('/api/registrations').then((r) => r.json()).then(setRegistrations);
  }, [router]);

  const handleScheduleChange = (idx, field, value, aidx) => {
    setSchedule((s) => {
      const copy = JSON.parse(JSON.stringify(s));
      if (aidx !== undefined) {
        copy[idx].atividades[aidx][field] = value;
      } else {
        copy[idx][field] = value;
      }
      return copy;
    });
  };

  const saveSchedule = async () => {
    await fetch('/api/schedule', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule),
    });
    alert('Programação salva');
  };

  const download = () => {
    window.location.href = '/api/registrations?download=1';
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Painel Admin</h1>
      <h2 className="text-xl font-semibold">Programação</h2>
      {schedule.map((dia, idx) => (
        <div key={idx} className="border p-2 space-y-2">
          <input
            value={dia.dia}
            onChange={(e) => handleScheduleChange(idx, 'dia', e.target.value)}
            className="border p-1 w-full"
          />
          {dia.atividades.map((a, aidx) => (
            <div key={aidx} className="space-y-1">
              <input
                value={a.hora}
                onChange={(e) => handleScheduleChange(idx, 'hora', e.target.value, aidx)}
                className="border p-1 mr-2"
              />
              <input
                value={a.titulo}
                onChange={(e) => handleScheduleChange(idx, 'titulo', e.target.value, aidx)}
                className="border p-1 mr-2"
              />
              <input
                value={a.descricao}
                onChange={(e) => handleScheduleChange(idx, 'descricao', e.target.value, aidx)}
                className="border p-1"
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={saveSchedule} className="bg-blue-600 text-white px-4 py-2">Salvar Programação</button>
      <h2 className="text-xl font-semibold">Cadastros ({registrations.length})</h2>
      <button onClick={download} className="bg-green-600 text-white px-4 py-2">Baixar Excel</button>
    </div>
  );
}
