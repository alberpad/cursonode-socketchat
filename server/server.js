"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
let server = http_1.default.createServer(app);
const publicPath = path_1.default.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
app.use(express_1.default.static(publicPath));
exports.io = socket_io_1.default(server);
require("./sockets/socket");
server.listen(port, (err) => {
    if (err)
        throw new Error(err);
    console.log(`Servidor corriendo en puerto ${port}`);
});
//# sourceMappingURL=server.js.map