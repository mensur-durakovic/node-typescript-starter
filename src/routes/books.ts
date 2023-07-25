import { Router } from "express";
import { createBook, getBooks, updateBook, deleteBook } from "../controllers/books";

const router = Router();
router.post("/", createBook);
router.get("/", getBooks);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;