import { useEffect, useState } from 'react';

const emptyProduct = { name: '', price: '', quantity: '', code: '' };

export function ProductForm({ product, onSave, onCancel, saving }) {
  const [form, setForm] = useState(emptyProduct);

  useEffect(() => {
    setForm(product ? { name: product.name, price: product.price, quantity: product.quantity, code: product.code } : emptyProduct);
  }, [product]);

  function changeField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function submit(event) {
    event.preventDefault();
    onSave({ ...form, price: Number(form.price), quantity: Number(form.quantity) });
  }

  return (
    <form className="product-form" onSubmit={submit}>
      <h2>{product ? 'Editar produto' : 'Novo produto'}</h2>
      <label>Nome<input name="name" value={form.name} onChange={changeField} required maxLength="120" /></label>
      <label>Código<input name="code" value={form.code} onChange={changeField} required maxLength="50" /></label>
      <div className="form-row">
        <label>Valor (R$)<input name="price" type="number" value={form.price} onChange={changeField} required min="0" step="0.01" /></label>
        <label>Quantidade<input name="quantity" type="number" value={form.quantity} onChange={changeField} required min="0" step="1" /></label>
      </div>
      <div className="actions">
        {product && <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>}
        <button disabled={saving}>{saving ? 'Salvando...' : product ? 'Salvar alterações' : 'Cadastrar produto'}</button>
      </div>
    </form>
  );
}
