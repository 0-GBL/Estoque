import { useEffect, useState } from 'react';
import { ProductForm } from './components/ProductForm.jsx';
import { ProductTable } from './components/ProductTable.jsx';
import { api } from './services/api.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function loadProducts() {
    try { setProducts((await api.get('/products')).data); } catch { setError('Não foi possível carregar os produtos. Confira se a API está em execução.'); }
  }
  useEffect(() => { loadProducts(); }, []);

  async function saveProduct(data) {
    setSaving(true); setError(''); setMessage('');
    try {
      if (editing) await api.put(`/products/${editing._id}`, data);
      else await api.post('/products', data);
      setMessage(editing ? 'Produto atualizado com sucesso.' : 'Produto cadastrado com sucesso.');
      setEditing(null); await loadProducts();
    } catch (requestError) { setError(requestError.response?.data?.message || 'Não foi possível salvar o produto.'); }
    finally { setSaving(false); }
  }

  async function deleteProduct(product) {
    if (!window.confirm(`Excluir o produto “${product.name}”?`)) return;
    try { await api.delete(`/products/${product._id}`); setMessage('Produto excluído com sucesso.'); await loadProducts(); }
    catch (requestError) { setError(requestError.response?.data?.message || 'Não foi possível excluir o produto.'); }
  }

  return <main className="container">
    <header><p className="eyebrow">GERENCIAMENTO</p><h1>Controle de estoque</h1><p>Cadastre e acompanhe seus produtos em um só lugar.</p></header>
    {message && <p className="notice success">{message}</p>}{error && <p className="notice error">{error}</p>}
    <section className="grid"><ProductForm product={editing} onSave={saveProduct} onCancel={() => setEditing(null)} saving={saving} />
      <section className="products"><div className="section-heading"><h2>Produtos cadastrados</h2><span>{products.length} {products.length === 1 ? 'item' : 'itens'}</span></div><ProductTable products={products} onEdit={setEditing} onDelete={deleteProduct} /></section>
    </section>
  </main>;
}
