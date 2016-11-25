export class Todo {

    constructor(private name: string) {}

    static newInstance(data) {
        return new Todo('name');
    }
}
