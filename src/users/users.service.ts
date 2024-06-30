import { Injectable } from '@nestjs/common';
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

  update() {}

  remove() {}
}
