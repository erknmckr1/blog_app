import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blog_app',
    password: 'postgres',
    port: 5432,
})

export default pool;