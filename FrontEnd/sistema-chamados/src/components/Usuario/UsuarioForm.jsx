import { useState, useEffect } from "react";

export default function UsuarioForm({ onSubmit, editingUser, onCancel }) {
  const [form, setForm] = useState({ nome: "", email: "" });

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser); // preenche o form com os dados
    } else {
      setForm({ nome: "", email: "" });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || !form.email) {
      alert("Preencha todos os campos!");
      return;
    }
    onSubmit(form);
    setForm({ nome: "", email: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <div>
        <label>Nome: </label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Digite o nome"
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Digite o email"
        />
      </div>
      <button type="submit">
        {editingUser ? "Salvar Alterações" : "Adicionar Usuário"}
      </button>
      {editingUser && (
        <button type="button" onClick={onCancel} style={{ marginLeft: "0.5rem" }}>
          Cancelar
        </button>
      )}
    </form>
  );
}
