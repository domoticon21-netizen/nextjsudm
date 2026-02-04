import { prisma } from './lib/prisma'

async function main() {
  // Create a new user with a post
  const banda = await prisma.band.create({
  data: {
    name: "guns n roses",
    slug: "guns-roses",
    tracks: {
      create: {
        title: "knocking n heavens door",
        slug: "knock-heavens-door",
        durationInSeconds: 330
      },      
    }
  },
  include: {
    tracks: true
  }
})
  console.log('Created user:', banda)
  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })