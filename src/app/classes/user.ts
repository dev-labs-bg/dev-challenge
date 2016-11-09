export class User {
    constructor(
        public id: number,
        public first_name: string,
        public last_name: string,
        public email: string,
        public active: number,
        public created_at: string,
        public roles: Array<string>,
    ) {}
}