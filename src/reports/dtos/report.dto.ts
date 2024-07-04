import { Expose } from 'class-transformer';

export class ReportDto {
  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  make: string;
}
