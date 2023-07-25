export class Book {
    constructor(
        public id: string,
        public title: string,
        public writer: string,
        public isRead: boolean = false,
    ) { }
}