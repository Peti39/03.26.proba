import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator"

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  license_plate_number: string
  @IsNotEmpty()
  @IsString()
  brand: string
  @IsNotEmpty()
  @IsString()
  model: string
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  daily_cost: number
}
