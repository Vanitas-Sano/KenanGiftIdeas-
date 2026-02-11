const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.join(__dirname, 'gifts.db');

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS gifts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            link TEXT,
            image_url TEXT,
            price REAL,
            category TEXT
        )`, (err) => {
            if (err) {
                // Table already created
            } else {
                // Check if table is empty to seed data
                db.get("SELECT count(*) as count FROM gifts", [], (err, row) => {
                    if (err) return;
                    if (row.count === 0) {
                        const insert = 'INSERT INTO gifts (name, description, link, image_url, price, category) VALUES (?,?,?,?,?,?)';
                        const gifts = [
                            ["MSI GeForce RTX 5080 Gaming X Trio White", "The pinnacle of white-themed gaming performance. Ice cold cooling.", "https://www.msi.com/Graphics-Card/", "/images/ryzen-7.webp", 1199.99, "GPU"],
                            ["MSI GeForce RTX 5070 Gaming X Trio White", "High-FPS 1440p gaming in a stunning white design.", "https://www.msi.com/Graphics-Card/", "/images/cash.webp", 799.99, "GPU"],
                            ["Intel Core i9-14900K", "24 Cores (8P+16E). Up to 6.0 GHz. The ultimate gaming processor.", "https://www.intel.com/", "/images/i9-14900k.avif", 589.00, "CPU"],
                            ["AMD Ryzen 7 7800X3D", "The dominant gaming CPU with 3D V-Cache technology.", "https://www.amd.com/", "/images/gpu-5070.webp", 449.00, "CPU"],
                            ["Stack of £50 Banknotes (x20)", "A bold stack of £1000 cash. Freedom to buy anything.", "", "/images/gpu-5080.jpg", 1000.00, "Money"]
                        ];
                        gifts.forEach((gift) => {
                            db.run(insert, gift);
                        });
                        console.log("Database seeded with initial data.");
                    }
                });
            }
        });
    }
});

module.exports = db;
