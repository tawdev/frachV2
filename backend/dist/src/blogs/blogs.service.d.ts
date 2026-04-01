import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class BlogsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBlogDto: CreateBlogDto): Promise<{
        id: number;
        title: string;
        slug: string;
        content: string;
        category: string | null;
        author_id: number | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
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
            id: number;
            title: string;
            slug: string;
            content: string;
            category: string | null;
            author_id: number | null;
            image: string | null;
            status: string;
            tags: string | null;
            views: number;
            created_at: Date;
            updated_at: Date;
            published_at: Date | null;
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
        id: number;
        title: string;
        slug: string;
        content: string;
        category: string | null;
        author_id: number | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
    }>;
    findOneBySlug(slug: string): Promise<{
        author: {
            id: number;
            username: string;
        } | null;
    } & {
        id: number;
        title: string;
        slug: string;
        content: string;
        category: string | null;
        author_id: number | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
    }>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<{
        id: number;
        title: string;
        slug: string;
        content: string;
        category: string | null;
        author_id: number | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        slug: string;
        content: string;
        category: string | null;
        author_id: number | null;
        image: string | null;
        status: string;
        tags: string | null;
        views: number;
        created_at: Date;
        updated_at: Date;
        published_at: Date | null;
    }>;
    bulkDelete(ids: number[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
