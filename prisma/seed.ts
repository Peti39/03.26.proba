/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import dotenv from 'dotenv';
import {PrismaClient} from "../generated/prisma/client"
import { faker } from '@faker-js/faker';

dotenv.config();

// Seeding code goes here
const prisma = new PrismaClient()

async function main() {
    const cars = await prisma.cars.findMany()
    if(cars.length == 0){return}
    for(let i = 0; i<15 ; i++){
      await prisma.rentals.create({
        data:{
          car_id: faker.helpers.arrayElement(cars).id,
          start_date: faker.date.recent(),
          end_date: faker.date.soon()
        }
      })
    }

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
