import { useState, useEffect } from "react";
import UsuarioList from "../components/Usuario/UsuarioList";
import UsuarioForm from "../components/Usuario/UsuarioForm";
import { getUsuarios, addUsuario, updateUsuario } from "../services/api";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getUsuarios().then(setUsuarios);
  }, []);

  const handleAdd = (user) => {
    if (editingUser) {
      // Atualizar usuário existente
      updateUsuario(user).then((updated) => {
        setUsuarios(
          usuarios.map((u) => (u.id === updated.id ? updated : u))
        );
        setEditingUser(null);
      });
    } else {
      // Adicionar novo
      addUsuario(user).then((newUser) =>
        setUsuarios([...usuarios, newUser])
      );
    }
  };

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div>
      <h1>Usuários</h1>
      <UsuarioForm
        onSubmit={handleAdd}
        editingUser={editingUser}
        onCancel={handleCancel}
      />
      <UsuarioList
        usuarios={usuarios}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
