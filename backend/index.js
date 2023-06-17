import express, { query }  from "express";
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test'
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('this is the backedn')
})

app.get('/books', (req, res) => {
    const query = 'select * from books';
    connection.query(query, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(data);
      }
    });
  });
  
app.post('/books', (req, res) => {
  const query = 'insert into books(`title`, `description`, `cover`, `price`) values(?)';

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price
  ]

  connection.query(query, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})


app.delete("/books/:id", (req,res) => {
  const bookId = req.params.id;
  const query = 'delete from books where id = ?';

  connection.query(query, [bookId], (err, data) => {
    if(err) return res.json(err);
    return res.json("Book has been deleted successfully");
  })
})

app.put("/books/:id", (req,res) => {
  const bookId = req.params.id;
  const query = 'update books set `title` = ?, `description` = ?, `cover` = ?, `price` = ? where id = ?';

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price
  ]

  connection.query(query, [...values, bookId], (err, data) => {
    if(err) return res.json(err);
    return res.json("Book has been updated successfully");
  })
})

app.listen(3000, () => {
    console.log('connected to backend11')
})