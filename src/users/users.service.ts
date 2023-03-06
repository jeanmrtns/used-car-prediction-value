import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface CreateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create({ email, password }: CreateUserRequest) {
    const userExists = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const user = this.usersRepository.create({
      email,
      password,
    });

    return this.usersRepository.save(user);
  }

  async findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async find(email: string) {
    return this.usersRepository.find({
      where: {
        email,
      },
    });
  }

  async update(id: number, userData: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    Object.assign(user, userData);

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    return this.usersRepository.remove(user);
  }
}
