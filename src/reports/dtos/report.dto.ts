import { Expose } from 'class-transformer';

export class ReportDto {
  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  long: number;

  @Expose()
  lat: number;
}
