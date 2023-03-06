import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Added user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with id ${this.id} updated`);
  }

  @BeforeRemove()
  logRemove() {
    console.log(`User with id ${this.id} removed`);
  }
}
