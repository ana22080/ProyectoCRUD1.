import UserModel from "../models/userModel.js";

const getUsers = async (req, res) => {
  const users = await UserModel.getAll();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await UserModel.getById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(user);
};

const createUser = async (req, res) => {
  const { nombre, email, edad } = req.body;
  if (!nombre || !email || edad === undefined) {
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }
  const result = await UserModel.create(nombre, email, edad);
  res.status(201).json({ id: result.insertId, nombre, email, edad });
};

const updateUser = async (req, res) => {
  const { nombre, email, edad } = req.body;
  const result = await UserModel.update(req.params.id, nombre, email, edad);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json({ id: Number(req.params.id), nombre, email, edad });
};

const deleteUser = async (req, res) => {
  const result = await UserModel.remove(req.params.id);
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.status(204).send();
};

export default { getUsers, getUserById, createUser, updateUser, deleteUser };
