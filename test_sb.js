const SUPABASE_URL = 'https://egrrknwvdbkrnstaacmo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVncnJrbnd2ZGJrcm5zdGFhY21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwOTAwMjksImV4cCI6MjA5ODY2NjAyOX0.W6MNhF4P_bPxWop15cxMPr0_zdqCzSj954HM8S4-LqM';

async function test() {
  const data = {
    id: 99999,
    nome: 'Teste',
    categoria: 'A',
    qtd: 1,
    minimo: 0,
    custo: 10,
    observacoes: ''
  };

  const response = await fetch(`${SUPABASE_URL}/rest/v1/estoque`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(data)
  });

  const text = await response.text();
  console.log('Status:', response.status);
  console.log('Body:', text);
}

test();
