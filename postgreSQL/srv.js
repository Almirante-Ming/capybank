import { Client } from 'pg'
 
const client = new Client({
  host: 'localhost',
  port: 5334,
  database: 'users',
  user: 'postgres',
  password: 'postgres',
})
await client.connect()
 
try {
   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
   console.log(res.rows[0].message) // Hello world!
} catch (err) {
   console.error(err);
} finally {
   await client.end()
}