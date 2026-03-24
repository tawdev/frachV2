import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    try {
      return await this.prisma.contactMessage.create({
        data: {
          ...createContactDto,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to submit contact message');
    }
  }

  findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { created_at: 'desc' }
    });
  }
}
