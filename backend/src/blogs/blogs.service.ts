import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        published_at: createBlogDto.status === 'published' ? new Date() : null,
      },
    });
  }

  async findAll(params: { q?: string; category?: string; status?: string; author?: string; page: number; limit: number }) {
    const { q, category, status, author, page, limit } = params;
    
    const where: any = {};
    
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { content: { contains: q } },
      ];
    }
    
    if (category) where.category = category;
    if (status) where.status = status;
    if (author) where.author_id = +author;
    
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        include: { author: { select: { id: true, username: true } } },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.blog.count({ where }),
    ]);
    
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: { author: { select: { id: true, username: true } } },
    });
    
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async findOneBySlug(slug: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { slug },
      include: { author: { select: { id: true, username: true } } },
    });
    
    if (!blog) throw new NotFoundException('Blog not found');

    // Increment views
    await this.prisma.blog.update({
      where: { id: blog.id },
      data: { views: { increment: 1 } },
    });

    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const data: any = { ...updateBlogDto };
    
    if (updateBlogDto.status === 'published') {
      const existing = await this.prisma.blog.findUnique({ where: { id } });
      if (existing && !existing.published_at) {
        data.published_at = new Date();
      }
    }
    
    return this.prisma.blog.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.blog.delete({
      where: { id },
    });
  }

  async bulkDelete(ids: number[]) {
    return this.prisma.blog.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
