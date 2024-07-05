import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Report } from 'src/reports/report.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  /*  @Column()
  name: string; */

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // Roles
  @Column({ default: true })
  is_admin: boolean;

  //Custom functions

  @AfterInsert()
  logInsert() {
    console.log('User added successfully', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated successfully', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed successfully', this.id);
  }
}
