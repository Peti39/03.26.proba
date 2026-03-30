import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';



@Injectable()
export class CarsService {
  constructor(private readonly db : PrismaService){}
  

  async create(createCarDto: CreateCarDto) {
    return await this.db.cars.create({
      data:createCarDto,
      select:{
        id:true,license_plate_number: true, brand:true, model:true, daily_cost: true
      }
    })
  }

  async findAll() {
    return await this.db.cars.findMany({
      select:{
        id:true,license_plate_number: true, brand:true, model:true, daily_cost: true
      }
    })
  }

  async rentCar(carId: number) {
    const car = await this.db.cars.findUnique({
      where:{
        id: carId
      }
    })
    if(!car){
      throw new NotFoundException("Nincs ilyen autó")
    }
    const timeNow = new Date()
    const weekLater = new Date()
    weekLater.setDate(weekLater.getDate() +7)

    const thisCarRentals = await this.db.rentals.findMany({
      where:{
        car_id: carId
      }
    })
    let isCurrentlyRented = false
    thisCarRentals.forEach(rental => {
      const start = new Date(rental.start_date)
      const end = new Date(rental.end_date)
      if(timeNow < end || weekLater > start){
        isCurrentlyRented = true
      }
    });
    if(isCurrentlyRented){throw new ConflictException("Következő héten az autó már ki van kölcsönözve")}

    return await this.db.rentals.create({
      data:{
        car_id: carId,
        start_date: timeNow,
        end_date: weekLater
      }
    })

  }

  
}
