import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

dotenv.config();

const PORT = process.env.PORT || 3001;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_PORT = process.env.MYSQL_PORT || '3306';
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const FILE_UPLOAD_PATH = 'public/upload';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        const parsedFile = path.parse(file.originalname);
        cb(null, parsedFile.name + '_' + randomName() + path.extname(file.originalname));
    },
});

const upload = multer({ 
    storage: storage
});

const db = mysql.createConnection({
    host: MYSQL_HOST,
    port: parseInt(MYSQL_PORT),
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
});

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }
    const name = req.file.filename || 'unknown';
    const sql = "INSERT INTO files (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
            return;
        }
        res.status(201).json({ message: 'File uploaded' });
    });
});

app.listen(PORT, () => {
    console.log(`Server launched on port ${PORT} 🚀`);
});

const randomName = () => {
    let result = '';
    while (result.length < 50) {
        result += Math.random().toString(36).substring(2, 15);
    }
    return result.substring(0, 50);
};