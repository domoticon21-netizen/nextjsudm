import { prisma } from "./lib/prisma";

// ===============================
// Helpers
// ===============================

const bands = [
  "Guns N Roses",
  "Led Zeppelin",
  "Pink Floyd",
  "The Rolling Stones",
  "AC/DC",
  "Metallica",
  "Iron Maiden",
  "Black Sabbath",
  "Nirvana",
  "Pearl Jam",
  "Red Hot Chili Peppers",
  "Foo Fighters",
  "Queen",
  "Deep Purple",
  "Aerosmith",
  "Bon Jovi",
  "Linkin Park",
  "System Of A Down",
  "Kiss",
  "U2",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function randomDuration() {
  return Math.floor(Math.random() * 240) + 120; // 2–6 min
}

function generateTracks(bandName: string) {
  const total = Math.floor(Math.random() * 4) + 2; // 2–5 tracks

  return Array.from({ length: total }).map((_, i) => {
    const title = `${bandName} Track ${i + 1}`;

    return {
      title,
      slug: slugify(title),
      durationInSeconds: randomDuration(),
    };
  });
}

// ===============================
// Seed
// ===============================

async function main() {
  for (const bandName of bands) {
    const slug = slugify(bandName);

    const banda = await prisma.band.create({
      data: {
        name: bandName,
        slug,
        description: `Banda ${bandName} gerada automaticamente no seed.`,
        cover: `upload/${slug}.jpg`, // mock de capa
        tracks: {
          create: generateTracks(bandName),
        },
      },
      include: {
        tracks: true,
      },
    });

    console.log(`🎸 Banda criada: ${banda.name}`);
  }

  console.log("\n✅ Seed finalizado com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// import { prisma } from './lib/prisma'

// async function main() {
//   // Create a new user with a post
//   const banda = await prisma.band.create({
//   data: {
//     name: "guns n roses",
//     slug: "guns-roses",
//     tracks: {
//       create: {
//         title: "knocking n heavens door",
//         slug: "knock-heavens-door",
//         durationInSeconds: 330
//       },
//     }
//   },
//   include: {
//     tracks: true
//   }
// })
//   console.log('Created user:', banda)

// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
