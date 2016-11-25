import { Component, OnInit, Input } from '@angular/core';
import { Todo } from './todo';

@Component({
    selector: 'xp-todo-item',
    template: `
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
    `,
    styles: []
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;

    constructor() { }

    ngOnInit() {
    }

}
