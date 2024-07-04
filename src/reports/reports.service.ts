import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { ReportDto } from './dtos/report.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private rep: Repository<Report>) {}

  async changeApproval(id: string, approved: boolean) {
    const report = await this.findOne(+id);

    if (!report) throw new NotFoundException('Report not found');

    report.approved = approved;
    return this.rep.save(report);
  }
  create(reportDto: ReportDto, user: User) {
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
