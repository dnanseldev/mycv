import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private rep: Repository<Report>) {}

  createEstimate(estimate: GetEstimateDto) {
    const { make, model, lng, lat, year, mileage } = estimate;
    return this.rep
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC') //orderBye doesn't take parameters in
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
    //.getRawMany();
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.findOne(+id);

    if (!report) throw new NotFoundException('Report not found');

    report.approved = approved;
    return this.rep.save(report);
  }
  create(reportDto: CreateReportDto, user: User) {
    const report = this.rep.create(reportDto);
    report.user = user;
    return this.rep.save(report);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.rep.findOneBy({ id });
  }

  find(make: string) {
    return this.rep.find({ where: { make } });
  }

  async update(id: number, fields: Partial<Report>) {
    const report = await this.findOne(id);
    if (!report) throw new NotFoundException(`Report not found.`);

    return this.rep.save({ ...report, ...fields });
  }

  async remove(id: number) {
    const report = await this.findOne(id);

    if (!report) throw new NotFoundException('Report not found');

    return this.rep.remove(report);
  }
}
