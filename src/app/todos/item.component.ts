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
            {{ todo.title }} | <span
                class="label label-info">
                3 days remaining
            </span>
        </h4>
        <p class="list-group-item-text">
            <button
                class="btn btn-default btn-xs"
                (click)="toggleOpen()">
                view more
            </button>
        </p>
        <p *ngIf="isOpen">
            {{ todo.description }}
        </p>
    `,
    styles: []
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    private isOpen: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    private toggleOpen() {
        this.isOpen = ! this.isOpen;
    }

}
