const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function ProductTable({ products, onEdit, onDelete }) {
  if (!products.length) return <p className="empty">Nenhum produto cadastrado.</p>;

  return (
    <div className="table-wrapper">
      <table>
        <thead><tr><th>Produto</th><th>Código</th><th>Valor</th><th>Estoque</th><th>Status</th><th>Ações</th></tr></thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td><div className="table-product"><span>{product.name.slice(0, 1).toUpperCase()}</span><strong>{product.name}</strong></div></td><td><code>{product.code}</code></td>
              <td>{money.format(Number(product.price))}</td><td>{product.quantity} un.</td>
              <td><span className={`stock-badge ${product.quantity === 0 ? 'out' : product.quantity <= 5 ? 'low' : 'healthy'}`}>{product.quantity === 0 ? 'Sem estoque' : product.quantity <= 5 ? 'Estoque baixo' : 'Disponível'}</span></td>
              <td className="row-actions"><button className="link" onClick={() => onEdit(product)}>Editar</button><button className="link danger" onClick={() => onDelete(product)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
