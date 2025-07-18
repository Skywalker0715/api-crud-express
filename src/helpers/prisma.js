// Import PrismaClient dari package @prisma/client
const { PrismaClient } = require("@prisma/client");

// Buat instance baru dari PrismaClient
const prisma = new PrismaClient();

// Export instance prisma agar bisa digunakan di file lain
module.exports = prisma;