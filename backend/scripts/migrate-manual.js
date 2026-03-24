const mariadb = require('mariadb');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.DATABASE_URL;
// Parse mysql://root:@localhost:3306/meubles_db
const matches = url.match(/mysql:\/\/([^:]+):?([^@]*)@([^:]+):(\d+)\/(.+)/);

if (!matches) {
  console.error('Failed to parse DATABASE_URL');
  process.exit(1);
}

const pool = mariadb.createPool({
  host: matches[3],
  user: matches[1],
  password: matches[2],
  port: parseInt(matches[4]),
  database: matches[5],
  connectionLimit: 5
});

async function run() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('Connected to database');
    
    const sql = `
      CREATE TABLE IF NOT EXISTS product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        url VARCHAR(255) NOT NULL,
        is_main TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB;
    `;
    
    await conn.query(sql);
    console.log('Table product_images created or already exists.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (conn) conn.end();
    pool.end();
  }
}

run();
