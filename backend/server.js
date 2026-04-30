const express = require('express');
const { Pool } = require('pg');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
const uploadPath = 'C:\\Users\\amanr_p0puhwg\\Downloads\\gogreen_uploads';

app.use('/uploads', express.static(uploadPath));
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve frontend from sibling folder

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// CockroachDB Connection
// PASTE YOUR CONNECTION STRING HERE
const connectionString = 'postgresql://gogreen:Jn03wuvhxZdCpumQlthOIw@firm-gremlin-25616.j77.aws-ap-south-1.cockroachlabs.cloud:26257/defaultdb';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function setupTables() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS settings (
            id STRING PRIMARY KEY,
            data JSONB NOT NULL
        )
    `;
    try {
        await pool.query(createTableQuery);
        console.log('CockroachDB Settings table ready.');
    } catch (err) {
        console.error('Error setting up tables:', err);
    }
}

setupTables();

// File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// API Endpoints
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');
    // Return relative path for DB storage
    res.json({ 
        url: `http://localhost:${port}/uploads/${req.file.filename}`,
        filename: req.file.filename 
    });
});

app.post('/api/settings/:id', async (req, res) => {
    const { id } = req.params;
    let data = req.body;
    
    // 1. Ensure data is a clean JavaScript Object/Array
    try {
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        // Double-check if it's still stringified (safety for double-json)
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
    } catch (e) {
        console.error('JSON Parse Error for id:', id);
    }

    // 2. Prepare for CockroachDB (Must be a clean JSON string for the DB driver)
    const jsonString = JSON.stringify(data);

    const query = 'UPSERT INTO settings (id, data) VALUES ($1, $2)';
    try {
        await pool.query(query, [id, jsonString]);
        res.send('Settings saved to CockroachDB.');
    } catch (err) {
        console.error('CRITICAL DATABASE ERROR:', err.message);
        res.status(500).send('Error saving to CockroachDB: ' + err.message);
    }
});

app.get('/api/settings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT data FROM settings WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0].data);
        } else {
            res.status(404).send('Not found');
        }
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

app.get('/api/all-settings', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, data FROM settings');
        const settings = {};
        result.rows.forEach(row => {
            settings[row.id] = row.data;
        });
        res.json(settings);
    } catch (err) {
        res.status(500).send('Error fetching all settings');
    }
});

// Delete a setting/section completely
app.delete('/api/settings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM settings WHERE id = $1', [id]);
        res.send(`Settings for ${id} deleted from CockroachDB.`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting from CockroachDB.');
    }
});

app.listen(port, () => {
    console.log(`CockroachDB Server running at http://localhost:${port}`);
});
