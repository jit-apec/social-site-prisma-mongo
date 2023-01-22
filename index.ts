import 'dotenv/config'
import app from './app'
import { PrismaClient } from '@prisma/client';

const { PORT } = process.env

app.listen(PORT, () => {


  const prisma = new PrismaClient()

  async function main() {
    await prisma.$connect()
  }

  main().then(async () => {
      await prisma.$disconnect()
    }).catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })

  console.log(`server listen http://127.0.0.1:${PORT}`);
})


//for migration
//npx prisma db push