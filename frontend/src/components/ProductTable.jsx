export function ProductTable({ products, onEdit, onDelete }) {
  if (!products.length) return <p className="empty">Nenhum produto cadastrado.</p>;

  return (
    <div className="table-wrapper">
      <table>
        <thead><tr><th>Produto</th><th>Código</th><th>Valor</th><th>Estoque</th><th>Ações</th></tr></thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td><td>{product.code}</td>
              <td>{Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td>{product.quantity}</td>
              <td className="row-actions"><button className="link" onClick={() => onEdit(product)}>Editar</button><button className="link danger" onClick={() => onDelete(product)}>Excluir</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
