import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportsRepository: Repository<Report>,
  ) {}

  async create(price: number) {
    const report = this.reportsRepository.create({
      price,
    });

    return this.reportsRepository.save(report);
  }

  async find() {
    return this.reportsRepository.find();
  }

  async findById(id: number) {
    return this.reportsRepository.findBy({
      id,
    });
  }
}
