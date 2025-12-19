import bcrypt from "bcrypt";

const password = "pass1234"; // admin 密碼
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log("passwordHash:", hash);
});
