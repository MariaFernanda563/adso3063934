const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const db = require("./database");
const auth = require("./authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "your_secret";

// AUTH ENDPOINTS:
// POST: /register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(
        `INSERT INTO users (username, password) VALUES(?, ?)`,
        [username, hashedPassword],
        (err) => {
            if (err)
                return res.status(400).json({ error: "User already exists!" });
            res.json({ message: "User Registered!" });
        },
    );
});

// POST: /login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    db.get(
        `SELECT * FROM users WHERE username = ?`,
        [username],
        async (err, user) => {
            if (err || !user)
                return res.status(400).json({ error: "User not found!" });
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword)
                return res.status(400).json({ error: "Invalid password!" });
            const token = jwt.sign(
                { id: user.id, username: user.username },
                SECRET_KEY,
                { expiresIn: "1h" },
            );
            res.json({ token });
        },
    );
});

// ======= SEASONS =======

// GET: /seasons
app.get("/seasons", auth, (req, res) => {
    db.all(`SELECT * FROM seasons`, [], (err, rows) => {
        res.json(rows);
    });
});

// GET: /seasons/:id
app.get("/seasons/:id", auth, (req, res) => {
    db.get(
        `SELECT * FROM seasons WHERE id = ?`,
        [req.params.id],
        (err, row) => {
            if (err || !row)
                return res.status(404).json({ error: "Not found!" });
            res.json(row);
        },
    );
});

// POST: /seasons
app.post("/seasons", auth, (req, res) => {
    const { title, episodes, release_year } = req.body;
    db.run(
        `INSERT INTO seasons (title, episodes, release_year) VALUES(?, ?, ?)`,
        [title, episodes, release_year],
        (err) => {
            if (err) return res.status(400).json({ error: "Already exists!" });
            res.json({ message: "Season created!" });
        },
    );
});

// PUT: /seasons/:id
app.put("/seasons/:id", auth, (req, res) => {
    const { title, episodes, release_year } = req.body;
    db.run(
        `UPDATE seasons SET title = ?, episodes = ?, release_year = ? WHERE id = ?`,
        [title, episodes, release_year, req.params.id],
        (err) => {
            if (err) return res.status(400).json({ error: "Error updating!" });
            res.json({ message: "Season updated!" });
        },
    );
});

// DELETE: /seasons/:id
app.delete("/seasons/:id", auth, (req, res) => {
    db.run(`DELETE FROM seasons WHERE id = ?`, [req.params.id], (err) => {
        if (err) return res.status(400).json({ error: "Error deleting!" });
        res.json({ message: "Season deleted!" });
    });
});

// ======= CHARACTERS =======
// GET: /characters
app.get("/characters", auth, (req, res) => {
    db.all(`SELECT * FROM characters`, [], (err, rows) => {
        res.json(rows);
    });
});

// GET: /characters/:id
app.get("/characters/:id", auth, (req, res) => {
    db.get(
        `SELECT * FROM characters WHERE id = ?`,
        [req.params.id],
        (err, row) => {
            if (err || !row)
                return res.status(404).json({ error: "Not found!" });
            res.json(row);
        },
    );
});

// POST: /characters
app.post("/characters", auth, (req, res) => {
    const { name, role, breathing_style } = req.body;
    db.run(
        `INSERT INTO characters (name, role, breathing_style) VALUES(?, ?, ?)`,
        [name, role, breathing_style],
        (err) => {
            if (err) return res.status(400).json({ error: "Already exists!" });
            res.json({ message: "Character created!" });
        },
    );
});

// PUT: /characters/:id
app.put("/characters/:id", auth, (req, res) => {
    const { name, role, breathing_style } = req.body;
    db.run(
        `UPDATE characters SET name = ?, role = ?, breathing_style = ? WHERE id = ?`,
        [name, role, breathing_style, req.params.id],
        (err) => {
            if (err) return res.status(400).json({ error: "Error updating!" });
            res.json({ message: "Character updated!" });
        },
    );
});

// DELETE: /characters/:id
app.delete("/characters/:id", auth, (req, res) => {
    db.run(`DELETE FROM characters WHERE id = ?`, [req.params.id], (err) => {
        if (err) return res.status(400).json({ error: "Error deleting!" });
        res.json({ message: "Character deleted!" });
    });
});

// ======= MOVIES =======
// GET: /movies
app.get("/movies", auth, (req, res) => {
    db.all(`SELECT * FROM movies`, [], (err, rows) => {
        res.json(rows);
    });
});

// GET: /movies/:id
app.get("/movies/:id", auth, (req, res) => {
    db.get(`SELECT * FROM movies WHERE id = ?`, [req.params.id], (err, row) => {
        if (err || !row) return res.status(404).json({ error: "Not found!" });
        res.json(row);
    });
});

// POST: /movies
app.post("/movies", auth, (req, res) => {
    const { title, duration_min, release_year } = req.body;
    db.run(
        `INSERT INTO movies (title, duration_min, release_year) VALUES(?, ?, ?)`,
        [title, duration_min, release_year],
        (err) => {
            if (err) return res.status(400).json({ error: "Already exists!" });
            res.json({ message: "Movie created!" });
        },
    );
});

// PUT: /movies/:id
app.put("/movies/:id", auth, (req, res) => {
    const { title, duration_min, release_year } = req.body;
    db.run(
        `UPDATE movies SET title = ?, duration_min = ?, release_year = ? WHERE id = ?`,
        [title, duration_min, release_year, req.params.id],
        (err) => {
            if (err) return res.status(400).json({ error: "Error updating!" });
            res.json({ message: "Movie updated!" });
        },
    );
});

// DELETE: /movies/:id
app.delete("/movies/:id", auth, (req, res) => {
    db.run(`DELETE FROM movies WHERE id = ?`, [req.params.id], (err) => {
        if (err) return res.status(400).json({ error: "Error deleting!" });
        res.json({ message: "Movie deleted!" });
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
