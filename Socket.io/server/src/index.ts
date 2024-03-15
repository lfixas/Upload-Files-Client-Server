import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
import http from 'http';

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

const db = mysql.createConnection({
    host: MYSQL_HOST,
    port: parseInt(MYSQL_PORT),
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
});

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
    maxHttpBufferSize: 2 * 1024 * 1024 * 1024 // ? 2GB
});

io.on('connection', (socket) => {
    socket.on('upload', (data) => {
        const parsedFile = path.parse(data.name);
        const filename = path.join(FILE_UPLOAD_PATH, `${parsedFile.name}_${randomName()}${parsedFile.ext}`);
        fs.writeFile(filename, data.file, (err) => {
            if (err) {
                socket.emit('error', err.message);
                return;
            }
            const sql = "INSERT INTO files (name) VALUES (?)";
            db.query(sql, [filename], (err, result) => {
                if (err) {
                    socket.emit('error', err.message);
                    return;
                }
                socket.emit('done', 'File uploaded');
            });
        });
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server launched on port ${PORT} 🚀`);
});

const randomName = () => {
    let result = '';
    while (result.length < 50) {
        result += Math.random().toString(36).substring(2, 15);
    }
    return result.substring(0, 50);
};