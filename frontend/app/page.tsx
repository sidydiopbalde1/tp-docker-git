'use client';
import { useEffect, useState } from 'react';

type Task = { id: number; title: string; description?: string; done: boolean };

const API = 'http://localhost:3001/tasks';

export default function Home() {
  const [tasks, setTasks]   = useState<Task[]>([]);
  const [title, setTitle]   = useState('');
  const [desc, setDesc]     = useState('');

  const fetchTasks = () => fetch(API).then(r => r.json()).then(setTasks);

  useEffect(() => { fetchTasks(); }, []);

  const create = async () => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc }),
    });
    setTitle(''); setDesc('');
    fetchTasks();
  };

  const toggle = async (task: Task) => {
    await fetch(`${API}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done }),
    });
    fetchTasks();
  };

  const remove = async (id: number) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  return (
    <main style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>📋 Task Manager</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Titre" />
        <input value={desc}  onChange={e => setDesc(e.target.value)}  placeholder="Description" />
        <button onClick={create}>Ajouter</button>
      </div>

      {tasks.map(task => (
        <div key={task.id} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
          <input type="checkbox" checked={task.done} onChange={() => toggle(task)} />
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.title} {task.description && `— ${task.description}`}
          </span>
          <button onClick={() => remove(task.id)}>🗑</button>
        </div>
      ))}
    </main>
  );
}