import React, { useState } from 'react';
import { createInaanak } from '../api';

export default function InaanakForm() {
  const [name, setName] = useState('');
  const [pamasko, setPamasko] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await createInaanak({ name, pamasko: parseFloat(pamasko || 0) });
      setMsg('Created successfully');
      setName('');
      setPamasko('');
      // dispatch a global refresh? we'll use window.dispatchEvent below
      window.dispatchEvent(new Event('inaanak:created'));
    } catch (err) {
      setMsg('Error creating');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Create Inaanak</h2>
      <form onSubmit={handleSubmit} style={{ display:'flex', gap:8, alignItems:'center' }}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Pamasko" type="number" step="0.01" value={pamasko} onChange={e=>setPamasko(e.target.value)} />
        <button disabled={loading} type="submit">Create</button>
      </form>
      {msg && <div style={{ marginTop:8 }}>{msg}</div>}
    </div>
  );
}
