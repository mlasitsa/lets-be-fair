import express from 'express';
import http from 'http';
import { Socket } from 'socket.io';


const app = express();
const server = http.createServer(app);
const io = new Socket(server);

