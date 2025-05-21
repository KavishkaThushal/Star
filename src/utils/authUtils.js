import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  const saltRounds = 12; // Number of salt rounds for hashing
  return await bcrypt.hash(password, saltRounds);
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
const hashRefreshToken = async (refreshToken) => {
  const saltRounds = 10;
  return await bcrypt.hash(refreshToken, saltRounds);
};

const compareRefreshToken = async (plainRefreshToken, hashedRefreshToken) => {
  return await bcrypt.compare(plainRefreshToken, hashedRefreshToken);
};

export { hashPassword, comparePassword, hashRefreshToken, compareRefreshToken };
