import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

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

  // obj is a reference to the original report entity
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
