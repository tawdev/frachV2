"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
async function main() {
    const databaseUrl = 'mysql://root:@localhost:3306/meubles_db';
    const url = new URL(databaseUrl);
    const adapter = new adapter_mariadb_1.PrismaMariaDb({
        host: url.hostname,
        port: Number(url.port) || 3306,
        user: url.username,
        password: url.password,
        database: url.pathname.substring(1),
    });
    const prisma = new client_1.PrismaClient({ adapter });
    const blogs = [
        {
            title: "Les 5 Tendances du Design d'Intérieur en 2026",
            slug: "tendances-design-interieur-2026",
            content: `
        <h2>L'évolution du design moderne</h2>
        <p>En 2026, le design d'intérieur prend un tournant décisif vers ce que nous appelons le "Minimalisme Sensoriel". Il ne s'agit plus seulement de vider l'espace, mais de le remplir de textures qui racontent une histoire.</p>
        <blockquote>"La maison de demain est un sanctuaire de calme et de technologie invisible."</blockquote>
        <h3>1. Les Textures Organiques</h3>
        <p>Le velours côtelé, la pierre brute et le bois non traité dominent. Ces matériaux apportent une chaleur immédiate aux intérieurs sombres (Dark Aesthetics) que nous affectionnons chez Frachdark.</p>
        <h3>2. L'Éclairage Architectural</h3>
        <p>Fini les lustres imposants au centre de la pièce. On privilégie désormais les rubans LED dissimulés et les appliques sculpturales qui créent des jeux d'ombres dramatiques.</p>
        <h3>3. Le Retour du Chrome</h3>
        <p>Après l'hégémonie de l'or brossé, le chrome et l'acier poli font leur grand retour, apportant une touche futuriste et froide qui contraste magnifiquement avec des tissus épais.</p>
      `,
            category: "Tendances",
            image: "/uploads/blogs/trends-2026.png",
            status: "published",
            tags: "Design, 2026, Luxe, Intérieur",
            published_at: new Date()
        },
        {
            title: "Comment Choisir le Canapé Parfait pour Votre Salon",
            slug: "guide-choix-canape-parfait",
            content: `
        <h2>Le cœur de votre foyer</h2>
        <p>Le canapé est bien plus qu'un simple meuble ; c'est l'investissement le plus important de votre salon. Voici comment ne pas vous tromper.</p>
        <h3>Considérez les proportions</h3>
        <p>Un canapé trop grand étouffe la pièce, un canapé trop petit semble perdu. Mesurez non seulement l'espace disponible, mais aussi le passage nécessaire pour circuler fluidement autour.</p>
        <h3>Le choix du tissu : Esthétique vs Durabilité</h3>
        <p>Si vous avez des animaux ou des enfants, les tissus techniques avec traitement anti-tâches sont indispensables. Pour un look ultra-premium, le velours noir reste un choix intemporel chez Frachdark.</p>
      `,
            category: "Conseils",
            image: "/uploads/blogs/sofa-guide.png",
            status: "published",
            tags: "Salon, Canapé, Mobilier, Guide",
            published_at: new Date()
        },
        {
            title: "L'Art du Minimalisme : Moins c'est Plus",
            slug: "art-minimalisme-moins-c-est-plus",
            content: `
        <h2>Vivre avec l'essentiel</h2>
        <p>Le minimalisme n'est pas une absence de décoration, c'est une intention. C'est choisir chaque objet avec soin pour qu'il serve à la fois une fonction et une émotion.</p>
        <h3>Désencombrer pour respirer</h3>
        <p>La première étape est toujours le tri. Si un objet ne vous apporte ni utilité ni joie (la méthode Marie Kondo appliquée au mobilier), il n'a pas sa place dans un intérieur Frachdark.</p>
        <h3>La palette de couleurs neutres</h3>
        <p>Jouez sur les nuances de gris, de noir et de beige. L'absence de couleurs vives permet à l'architecture de la pièce et à la qualité des matériaux de briller.</p>
      `,
            category: "Style",
            image: "/uploads/blogs/minimalism.png",
            status: "published",
            tags: "Minimalisme, Zen, Lifestyle, Pur",
            published_at: new Date()
        }
    ];
    try {
        console.log('Seeding blogs...');
        for (const blog of blogs) {
            await prisma.blog.upsert({
                where: { slug: blog.slug },
                update: blog,
                create: blog,
            });
            console.log(`- Created blog: ${blog.title}`);
        }
        console.log('Seeding completed successfully!');
    }
    catch (error) {
        console.error('Error seeding blogs:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=seed-blogs.js.map