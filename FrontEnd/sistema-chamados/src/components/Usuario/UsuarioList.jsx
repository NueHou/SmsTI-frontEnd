import React from "react";

export default function UsuarioList({ usuarios = [], onDelete, onEdit }) {
  if (usuarios.length === 0) {
    return <p>Nenhum usuário cadastrado.</p>;
  }

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => onEdit && onEdit(u)}>Editar</button>
                <button onClick={() => onDelete && onDelete(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
