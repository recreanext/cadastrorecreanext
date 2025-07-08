'use client'
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

interface Activity {
  day: string;
  time: string;
  description: string;
}

interface FormData {
  nomeCriancas: string;
  responsaveis: string;
  [key: string]: unknown;
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [forms, setForms] = useState<FormData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('adminAuth');
    if (token === 'true') setAuthenticated(true);
    const storedActs = localStorage.getItem('activities');
    if (storedActs) setActivities(JSON.parse(storedActs));
    const savedForms = localStorage.getItem('forms');
    if (savedForms) setForms(JSON.parse(savedForms));
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      localStorage.setItem('adminAuth', 'true');
      setAuthenticated(true);
    }
  };

  const addActivity = () => {
    setActivities([...activities, { day: '', time: '', description: '' }]);
  };

  const updateActivity = (idx: number, field: keyof Activity, value: string) => {
    const copy = [...activities];
    copy[idx] = { ...copy[idx], [field]: value };
    setActivities(copy);
    localStorage.setItem('activities', JSON.stringify(copy));
  };

  const deleteActivity = (idx: number) => {
    const copy = activities.filter((_, i) => i !== idx);
    setActivities(copy);
    localStorage.setItem('activities', JSON.stringify(copy));
  };

  const exportForms = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(forms);
    XLSX.utils.book_append_sheet(wb, ws, 'cadastros');
    XLSX.writeFile(wb, 'cadastros.xlsx');
  };

  if (!authenticated) {
    return (
      <main className="p-4 max-w-sm mx-auto">
        <h1 className="text-xl font-bold mb-4">Login do Administrador</h1>
        <form onSubmit={login} className="flex flex-col gap-3">
          <input
            className="border p-2"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2">Entrar</button>
        </form>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-xl mx-auto space-y-6">
      <h1 className="text-xl font-bold">Painel do Administrador</h1>
      <section>
        <h2 className="font-semibold mb-2">Programação</h2>
        {activities.map((act, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              className="border p-1 w-32"
              placeholder="Dia"
              value={act.day}
              onChange={(e) => updateActivity(idx, 'day', e.target.value)}
            />
            <input
              className="border p-1 w-20"
              placeholder="Hora"
              value={act.time}
              onChange={(e) => updateActivity(idx, 'time', e.target.value)}
            />
            <input
              className="border p-1 flex-1"
              placeholder="Descrição"
              value={act.description}
              onChange={(e) => updateActivity(idx, 'description', e.target.value)}
            />
            <button className="bg-red-500 text-white px-2" onClick={() => deleteActivity(idx)}>X</button>
          </div>
        ))}
        <button className="bg-green-500 text-white px-3 py-1" onClick={addActivity}>Adicionar Atividade</button>
      </section>
      <section>
        <h2 className="font-semibold mb-2 mt-4">Fichas de Cadastro</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          {forms.map((f, i) => (
            <li key={i}>{f.nomeCriancas} - {f.responsaveis}</li>
          ))}
        </ul>
        <button className="bg-blue-500 text-white px-3 py-1 mt-2" onClick={exportForms}>Exportar XLSX</button>
      </section>
    </main>
  );
}
