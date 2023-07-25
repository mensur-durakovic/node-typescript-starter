import express, { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import bookRoutes from "./routes/books";

const server = express();
server.use(express.json());
server.use("/books", bookRoutes);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
