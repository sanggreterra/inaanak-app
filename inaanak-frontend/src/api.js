const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000';

export async function fetchInaanak({ page=1, limit=10, sort, name } = {}) {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('limit', limit);
  if (sort) params.set('sort', sort);
  if (name) params.set('name', name);
  const res = await fetch(`${API_BASE}/inaanak?${params.toString()}`);
  if (!res.ok) throw new Error('Failed fetching');
  return res.json();
}

export async function createInaanak(payload) {
  const res = await fetch(`${API_BASE}/inaanak`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
}

export async function updateInaanak(id, payload) {
  const res = await fetch(`${API_BASE}/inaanak/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
}

export async function deleteInaanak(id) {
  const res = await fetch(`${API_BASE}/inaanak/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
  return res.json();
}
