// blog-backend/index.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "mt5XlO", // Replace with your MySQL password
  database: "blog_db123", // Create this database in MySQL
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

// Create blog table if it doesn't exist
db.query(
  `CREATE TABLE IF NOT EXISTS blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  (err) => {
    if (err) throw err;
    console.log("Blogs table created or already exists");
  }
);

// Routes
// Get all blogs
app.get("/api/blogs", (req, res) => {
  db.query("SELECT * FROM blogs", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a blog
app.post("/api/blogs", (req, res) => {
  const { title, content } = req.body;
  db.query(
    "INSERT INTO blogs (title, content) VALUES (?, ?)",
    [title, content],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId, title, content });
    }
  );
});

// Update a blog
app.put("/api/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  db.query(
    "UPDATE blogs SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err) => {
      if (err) throw err;
      res.json({ id, title, content });
    }
  );
});

// Delete a blog
app.delete("/api/blogs/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM blogs WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.json({ message: "Blog deleted successfully" });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});