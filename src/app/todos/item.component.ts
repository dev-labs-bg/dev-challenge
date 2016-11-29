import { Component, OnInit, Input } from '@angular/core';

import { Todo } from './todo';

@Component({
    selector: 'xp-todo-item',
    template: `
        <h4 class="list-group-item-heading">
            <span *ngIf="todo.status == 0">
                <span
                    class="label label-default">
                    Uncompleted
                </span>
            </span>
            <span *ngIf="todo.status == 1">
                <span
                    class="label label-warning">
                    submitted for review
                </span>
            </span>
            <span *ngIf="todo.status == 2">
                <span
                    class="label label-danger">
                </span>
            </span>
            <span *ngIf="todo.status == 3" class="text-success">
                <i class="glyphicon glyphicon-check"></i>
                completed
            </span>
            &nbsp;
            {{ todo.task.title }} | <span
                class="label label-info">
                3 days remaining
            </span>
        </h4>
        <p class="list-group-item-text">
            <button
                class="btn btn-default btn-xs"
                (click)="toggleOpenDetails()">
                {{ areDetailsOpen ? 'hide details' : 'see details' }}
            </button>
        </p>
        <div *ngIf="areDetailsOpen">
            <p>
                {{ todo.task.description }}
            </p>
            <hr />
            <xp-assessment
                [assessment]="todo.assessment"
                [todo]="todo">
            </xp-assessment>
        </div>
    `
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    private areDetailsOpen: boolean = true;

    constructor() { }

    ngOnInit() { }

    private toggleOpenDetails() {
        this.areDetailsOpen = ! this.areDetailsOpen;
    }

}
