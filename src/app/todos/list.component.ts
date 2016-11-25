import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';

@Component({
    selector: 'xp-todos-list',
    template: `
        <div class="list-group">
            <div
                *ngFor="let todo of todoService.repository.getData()"
                class="list-group-item">
                <h4 class="list-group-item-heading">
                    <input type="checkbox" />
                    <span
                        *ngIf="todo.completed"
                        class="label label-success">
                        completed
                    </span>
                    {{ todo.title }}
                </h4>
                <p class="list-group-item-text">{{ todo.description }}</p>
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
