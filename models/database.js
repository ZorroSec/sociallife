import { createConnection } from "mysql2";

const connection = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: sociallife
})

export default connection