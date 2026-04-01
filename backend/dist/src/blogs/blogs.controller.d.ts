import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
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
    findAll(q?: string, category?: string, status?: string, author?: string, page?: string, limit?: string): Promise<{
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
    findOne(id: string): Promise<{
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
    update(id: string, updateBlogDto: UpdateBlogDto): Promise<{
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
    remove(id: string): Promise<{
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
    uploadFile(file: Express.Multer.File): {
        url: string;
    };
}
