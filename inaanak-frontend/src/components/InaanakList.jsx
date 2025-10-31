import React, { useEffect, useState, useRef } from 'react';
import { fetchInaanak, deleteInaanak, updateInaanak } from '../api';

export default function InaanakList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const listRef = useRef();

  async function loadPage(p = 1, append = false) {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetchInaanak({ page: p, limit });
      if (append) {
        setItems(prev => [...prev, ...res.data]);
      } else {
        setItems(res.data);
      }
      setTotalPages(res.meta.totalPages);
      setPage(res.meta.page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage(1, false);
    function onCreated() {
      loadPage(1, false); // refresh
    }
    window.addEventListener('inaanak:created', onCreated);
    return () => window.removeEventListener('inaanak:created', onCreated);
  }, []);

  // basic scroll handler for infinite load
  useEffect(() => {
    function onScroll() {
      if (!listRef.current) return;
      const el = listRef.current;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 60) {
        // near bottom
        if (totalPages && page < totalPages) {
          loadPage(page + 1, true);
        }
      }
    }
    const node = listRef.current;
    if (node) node.addEventListener('scroll', onScroll);
    return () => node && node.removeEventListener('scroll', onScroll);
  }, [page, totalPages, loading]);

  async function handleDelete(id) {
    if (!confirm('Delete this item?')) return;
    try {
      await deleteInaanak(id);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  }

  async function handleEdit(item) {
    const name = prompt('Name', item.name);
    if (name === null) return;
    const pam = prompt('Pamasko', String(item.pamasko));
    if (pam === null) return;
    try {
      const updated = await updateInaanak(item.id, { name, pamasko: parseFloat(pam || 0) });
      setItems(prev => prev.map(it => it.id === updated.id ? updated : it));
    } catch (err) {
      alert('Update failed');
    }
  }

  return (
    <div>
      <h2>Inaanak List</h2>
      <div ref={listRef} style={{ height: 400, overflow: 'auto', border: '1px solid #ddd', padding: 8 }}>
        {items.length === 0 && !loading && <div>No items</div>}
        {items.map(it => (
          <div key={it.id} style={{ display:'flex', justifyContent:'space-between', padding:8, borderBottom:'1px solid #eee' }}>
            <div>
              <div><strong>{it.name}</strong></div>
              <div>Pamasko: {it.pamasko}</div>
              <div style={{ fontSize:12, color:'#666' }}>id: {it.id}</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={() => handleEdit(it)}>Edit</button>
              <button onClick={() => handleDelete(it.id)}>Delete</button>
            </div>
          </div>
        ))}
        {loading && <div style={{ padding: 10 }}>Loading...</div>}
      </div>
      <div style={{ marginTop: 8 }}>
        Page {page}{totalPages ? ` / ${totalPages}` : ''}
      </div>
    </div>
  );
}
