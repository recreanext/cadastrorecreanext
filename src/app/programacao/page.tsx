'use client'
import { useEffect, useState } from 'react';

interface Activity {
  day: string;
  time: string;
  description: string;
}

export default function Programacao() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [copied, setCopied] = useState(false);

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

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

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
      <button
        onClick={copyLink}
        className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
      >
        {copied ? 'Link copiado!' : 'Copiar link da programação'}
      </button>
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
