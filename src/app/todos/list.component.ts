import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { TodoService } from './todo.service';

@Component({
    selector: 'xp-todos-list',
    template: `
        <xp-loading-indicator [wait]="subscription">
            <div class="list-group">
                <div
                    *ngFor="let todo of todoService.repository.getData()"
                    class="list-group-item">
                    <xp-todo-item [todo]="todo"></xp-todo-item>
                </div>
            </div>
        </xp-loading-indicator>
    `,
    styles: []
})
export class TodosListComponent implements OnInit {
    private subscription: Subscription;

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.subscription = this.todoService.setup();
    }

}
