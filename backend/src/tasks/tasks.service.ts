import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class TasksService {
  private prisma = new PrismaClient();
  create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({data: createTaskDto});
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
