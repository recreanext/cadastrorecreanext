'use client';
import { useEffect, useState } from 'react';

export default function Programacao() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetch('/api/schedule')
      .then((res) => res.json())
      .then(setSchedule);
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center mb-4">Programação Semanal</h1>
      {schedule.map((dia) => (
        <div key={dia.dia} className="border p-2">
          <h2 className="font-semibold">{dia.dia}</h2>
          <ul className="list-disc pl-4">
            {dia.atividades.map((atv, idx) => (
              <li key={idx}>{atv.hora} - {atv.titulo}: {atv.descricao}</li>
            ))}
          </ul>
        </div>
      ))}
      <a
        href="https://wa.me/5581999999999"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full"
        target="_blank"
        rel="noopener noreferrer"
      >Falar com Coordenador</a>
    </div>
  );
}
