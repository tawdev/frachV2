import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class BlogsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBlogDto: CreateBlogDto): Promise<{
        title: string;
        slug: string;
        content: string;
        category: string | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
        id: number;
        author_id: number | null;
    }>;
    findAll(params: {
        q?: string;
        category?: string;
        status?: string;
        author?: string;
        page: number;
        limit: number;
    }): Promise<{
        data: ({
            author: {
                id: number;
                username: string;
            } | null;
        } & {
            title: string;
            slug: string;
            content: string;
            category: string | null;
            image: string | null;
            status: string;
            tags: string | null;
            views: number;
            created_at: Date;
            updated_at: Date;
            published_at: Date | null;
            id: number;
            author_id: number | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        author: {
            id: number;
            username: string;
        } | null;
    } & {
        title: string;
        slug: string;
        content: string;
        category: string | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
        id: number;
        author_id: number | null;
    }>;
    findOneBySlug(slug: string): Promise<{
        author: {
            id: number;
            username: string;
        } | null;
    } & {
        title: string;
        slug: string;
        content: string;
        category: string | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
        id: number;
        author_id: number | null;
    }>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<{
        title: string;
        slug: string;
        content: string;
        category: string | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
        id: number;
        author_id: number | null;
    }>;
    remove(id: number): Promise<{
        title: string;
        slug: string;
        content: string;
        category: string | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
        id: number;
        author_id: number | null;
    }>;
    bulkDelete(ids: number[]): Promise<import("@prisma/client").Prisma.BatchPayload>;
}
