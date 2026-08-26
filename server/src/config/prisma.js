
//This will be the configuration file for Prisma, which is an ORM (Object-Relational Mapping) 
// tool that helps in managing database interactions in a Node.js application.
//  The configuration typically includes database connection settings, schema definitions, and other relevant options.
// This will be utilized by the same instance in the whole application, ensuring that all database operations are consistent and centralized.

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');


const adapter = new PrismaPg({connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({ adapter });


module.exports = prisma;