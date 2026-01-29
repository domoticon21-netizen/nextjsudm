import "dotenv/config";

import { PrismaClient, Status } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.band.createMany({
    data: [
      { name: "Guns N' Roses", slug: "guns-n-roses", status: Status.active },
      { name: "Led Zeppelin", slug: "led-zeppelin", status: Status.active },
      { name: "Pink Floyd", slug: "pink-floyd", status: Status.active },
      { name: "The Rolling Stones", slug: "the-rolling-stones", status: Status.active },
      { name: "AC/DC", slug: "ac-dc", status: Status.active },
    ],
    skipDuplicates: true,
  });

  console.log("🎸 Seed executado com sucesso!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });