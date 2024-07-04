import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateReportDto {
  @IsBoolean()
  approved: boolean;

  @IsNumber()
  price: number;

  @IsString()
  make: string;
}
