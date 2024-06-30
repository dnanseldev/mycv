import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private rep: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.rep.create({ email, password });

    return this.rep.save(user);
  }

  findOne(id: number) {
    return this.rep.findOneBy({ id });
  }

  find(email: string) {
    return this.rep.find({ where: { email } });
  }

  async update(id: number, fields: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException(`User with not found.`);

    return this.rep.save({ ...user, ...fields });
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return this.rep.remove(user);
  }
}
