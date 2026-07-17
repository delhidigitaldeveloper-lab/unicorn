/**
 * Usage: node scripts/hash-password.js "yourNewPassword"
 *
 * Prints a bcrypt hash you can paste into .env as ADMIN_PASSWORD_HASH.
 */
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.js \"yourNewPassword\"");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nAdd this to your .env file:\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
