import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
