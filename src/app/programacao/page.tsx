'use client'
import { useEffect, useState } from 'react';

interface Activity {
  day: string;
  time: string;
  description: string;
}

export default function Programacao() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    } else {
      const sample = [
        { day: 'Segunda-feira', time: '10h', description: 'Pintura com tinta' },
        { day: 'Terça-feira', time: '14h', description: 'Gincana na piscina' },
      ];
      setActivities(sample);
      localStorage.setItem('activities', JSON.stringify(sample));
    }
  }, []);

  return (
    <main className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Programação Semanal</h1>
      <ul className="flex flex-col gap-2">
        {activities.map((act, idx) => (
          <li key={idx} className="border p-2 rounded">
            <strong>{act.day}, {act.time}</strong>: {act.description}
          </li>
        ))}
      </ul>
      <a
        href="https://wa.me/SEUNUMERO"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full"
        target="_blank" rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </main>
  );
}
