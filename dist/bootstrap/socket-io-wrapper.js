"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const escape = require("escape-html");
const socketIo = require("socket.io");
const logger = require("winston");
class SocketIOManager {
    constructor(server) {
        this.server = server;
        this.io = socketIo.listen(this.server);
    }
    start() {
        this.io.on("connection", (socket) => {
            logger.info(`User ${socket.id} connected. With name: ${socket.handshake.query.name}`);
            socket.handshake.query.name = socket.handshake.query.name ? socket.handshake.query.name.substring(0, 30) : "Un-named";
            this.sendChatMessage(`User ${socket.handshake.query.name} connected.`, "Announcement");
            socket.broadcast.emit("new-player", {
                color: socket.handshake.query.color,
                id: socket.id,
                name: socket.handshake.query.name,
            });
            socket.on("disconnect", (data) => {
                logger.info(`User ${socket.id} disconnected.`);
                socket.broadcast.emit("disconnected", {
                    id: socket.id,
                });
                this.sendChatMessage(`User ${socket.handshake.query.name} disconnected.`, "Announcement");
            });
            socket.on("jump", () => {
                logger.debug(`User ${socket.id} jumped.`);
                socket.broadcast.emit("jump", {
                    id: socket.id,
                });
            });
            socket.on("death", () => {
                logger.debug(`User ${socket.id} died.`);
                socket.broadcast.emit("death", {
                    id: socket.id,
                });
            });
            socket.on("position", (position) => {
                socket.broadcast.emit("position", {
                    angle: position.angle,
                    id: socket.id,
                    x: position.x,
                    y: position.y,
                });
            });
            socket.on("chat-message", (message) => {
                logger.debug(`User ${socket.id} sent message. ${message}`);
                this.sendChatMessage(message, socket.handshake.query.name);
            });
        });
    }
    get currentPlayers() {
        const players = new Array();
        const sockets = this.io.sockets.sockets;
        for (const socketId of Object.keys(sockets)) {
            const socket = sockets[socketId];
            players.push({
                color: socket.handshake.query.color,
                id: socket.id,
                name: socket.handshake.query.name,
            });
        }
        return players;
    }
    sendChatMessage(message, name) {
        this.io.emit("chat-message", {
            message: escape(message),
            name: escape(name),
        });
    }
}
exports.SocketIOManager = SocketIOManager;
