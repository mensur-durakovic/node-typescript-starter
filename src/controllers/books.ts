import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 as uuidv4 } from "uuid";
import { Book } from "../models/book";

const booksDatabase: Book[] = [];

interface TypedRequestBody<T, U> extends Express.Request {
    body: T;
    params: U;
}

interface BookRequestBody {
    title?: string;
    writer?: string;
    isRead?: boolean;
}
interface BookRequestParams {
    id?: string;
}

export const createBook: RequestHandler = (
    req: TypedRequestBody<BookRequestBody, BookRequestParams>,
    res,
    next
) => {
    const { title, writer } = req.body;
    if (!title || !writer) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Title and writer are required fields!" });
        return;
    }

    const id = uuidv4();
    const newBook = new Book(id, title, writer);
    booksDatabase.push(newBook);

    res
        .status(StatusCodes.OK)
        .json({ message: "Book saved successfully", book: newBook });
};

export const getBooks: RequestHandler = (req, res, next) => {
    res.json({ books: booksDatabase });
};

export const updateBook: RequestHandler<{ id: string }> = (
    req: TypedRequestBody<BookRequestBody, BookRequestParams>, res, next) => {
    const bookId = req.params.id;
    if (!bookId) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Book ID is required parameter!" });
        return;
    }

    const bookIndex = booksDatabase.findIndex(book => book.id === bookId);
    if (bookIndex < 0) {
        throw new Error('Book not found!');
    }

    const { title, writer, isRead } = req.body;
    const newTitle = title || booksDatabase[bookIndex].title;
    const newWriter = writer || booksDatabase[bookIndex].writer;
    const newIsRead = isRead || booksDatabase[bookIndex].isRead;
    booksDatabase[bookIndex] = new Book(bookId, newTitle, newWriter, newIsRead);

    res.json({ message: 'Book updated successfully!', updatedBook: booksDatabase[bookIndex] });
};

export const deleteBook: RequestHandler = (req, res, next) => {
    const bookId = req.params.id;
    if (!bookId) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Book ID is required parameter!" });
        return;
    }

    const todoIndex = booksDatabase.findIndex(book => book.id === bookId);
    if (todoIndex < 0) {
        throw new Error('Book not found!');
    }
    booksDatabase.splice(todoIndex, 1);

    res.json({ message: 'Book successfully deleted!' });
};