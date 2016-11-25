import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';

@Component({
    selector: 'xp-todos-list',
    template: `
        <div class="list-group">
            <div
                *ngFor="let todo of todoService.repository.getData()"
                class="list-group-item">
                <xp-todo-item [todo]="todo"></xp-todo-item>
            </div>
        </div>
    `,
    styles: []
})
export class TodosListComponent implements OnInit {

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.todoService.setup();
    }

}
