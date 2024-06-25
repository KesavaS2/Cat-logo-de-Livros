const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database(':memory:');

// Criando tabela de livros
db.serialize(() => {
    db.run("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, language TEXT, downloads INTEGER)");

    // Inserindo alguns livros para teste
    const stmt = db.prepare("INSERT INTO books (title, author, language, downloads) VALUES (?, ?, ?, ?)");
    stmt.run("Dom Casmurro", "Machado de Assis", "Português", 100);
    stmt.run("Pride and Prejudice", "Jane Austen", "Inglês", 200);
    stmt.run("Cien años de soledad", "Gabriel García Márquez", "Espanhol", 150);
    stmt.run("Harry Potter and the Philosopher's Stone", "J.K. Rowling", "Inglês", 300);
    stmt.run("1984", "George Orwell", "Inglês", 250);
    stmt.finalize();
});

// Rota para listar todos os livros
app.get('/books', (req, res) => {
    db.all("SELECT * FROM books", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Rota para buscar livros por título
app.get('/books/search', (req, res) => {
    const title = req.query.title;

    if (!title) {
        res.status(400).json({ error: "Title parameter is required" });
        return;
    }

    db.all("SELECT * FROM books WHERE title LIKE ?", [`%${title}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
