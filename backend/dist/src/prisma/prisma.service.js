"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
function parseDatabaseUrl(url) {
    const match = url.match(/mysql:\/\/([^:]+):([^@]*)@([^:]+):(\d+)\/(.+)/);
    if (!match) {
        throw new Error(`Invalid DATABASE_URL format: ${url}`);
    }
    return {
        host: match[3],
        port: parseInt(match[4], 10),
        user: match[1],
        password: decodeURIComponent(match[2]),
        database: match[5],
    };
}
let PrismaService = class PrismaService {
    client;
    constructor() {
        const dbUrl = process.env.DATABASE_URL;
        const dbConfig = parseDatabaseUrl(dbUrl);
        const adapter = new adapter_mariadb_1.PrismaMariaDb({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database,
        });
        this.client = new client_1.PrismaClient({ adapter });
    }
    async onModuleInit() {
        await this.client.$connect();
    }
    async onModuleDestroy() {
        await this.client.$disconnect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map