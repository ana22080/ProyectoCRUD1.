const users = [];
let nextId = 1;

const getAll = async () => {
  return users;
};

const getById = async (id) => {
  return users.find((user) => user.id === Number(id));
};

const create = async (nombre, email, edad) => {
  const newUser = {
    id: nextId++,
    nombre,
    email,
    edad: Number(edad),
  };
  users.push(newUser);
  return { insertId: newUser.id };
};

const update = async (id, nombre, email, edad) => {
  const index = users.findIndex((user) => user.id === Number(id));
  if (index === -1) return { affectedRows: 0 };
  users[index] = {
    id: Number(id),
    nombre,
    email,
    edad: Number(edad),
  };
  return { affectedRows: 1 };
};

const remove = async (id) => {
  const index = users.findIndex((user) => user.id === Number(id));
  if (index === -1) return { affectedRows: 0 };
  users.splice(index, 1);
  return { affectedRows: 1 };
};

export default { getAll, getById, create, update, remove };
