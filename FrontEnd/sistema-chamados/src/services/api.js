let usuarios = [
  { id: 1, nome: "José", email: "jose@email.com" },
  { id: 2, nome: "Maria", email: "maria@email.com" }
];

export const getUsuarios = async () => {
  return usuarios;
};

export const addUsuario = async (user) => {
  const newUser = { ...user, id: Date.now() };
  usuarios.push(newUser);
  return newUser;
};

export const updateUsuario = async (user) => {
  usuarios = usuarios.map((u) => (u.id === user.id ? user : u));
  return user;
};
