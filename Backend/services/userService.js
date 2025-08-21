const User = require("../models/User");
const bcrypt = require("bcrypt");

const createUser = async ({ name, email, password }) => {
  console.log({ name, email, password });
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

module.exports = { createUser };
