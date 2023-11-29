module.exports = function () {
  if (!process.env.JWT_PRIVATE_KEY) {
    console.error("JWT_PRIVATE_KEY is not defined at .env");
    process.exit(1);
  }
};
