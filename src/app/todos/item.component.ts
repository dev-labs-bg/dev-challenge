import { Component, OnInit, Input } from '@angular/core';

import { TODO_STATUSES } from '../assessment/constants';

import { Todo } from './todo';

@Component({
    selector: 'xp-todo-item',
    template: `
        <a class="list-group-item" [ngClass]="getStatusClass()">
            <ng-container [ngSwitch]="todo.status">
                <span *ngSwitchCase="TODO_STATUSES.UNCOMPLETED" class="badge text-uppercase">
                    Uncompleted
                </span>
                <span *ngSwitchCase="TODO_STATUSES.SUBMITTED_FOR_REVIEW" class="badge text-uppercase">
                    submitted for review
                </span>
                <span *ngSwitchCase="TODO_STATUSES.DENIED" class="badge text-uppercase">
                    denied
                </span>
                <span *ngSwitchCase="TODO_STATUSES.COMPLETED" class="badge text-uppercase">
                    completed
                </span>
            </ng-container>

            <h4
                class="list-group-item-heading"
                (click)="toggleOpenDetails()"
                style="cursor: pointer;">
                {{ todo.task.title }}
                <span
                    *ngIf="isActive(todo) && todo.status == TODO_STATUSES.UNCOMPLETED"
                    class="label label-info">
                    ... {{ todo.days_left }} days remaining
                </span>
                <span
                    *ngIf="!isActive(todo)"
                    class="label label-danger">
                    Locked
                </span>
            </h4>

            <div *ngIf="areDetailsOpen" class="list-group-item-text">
                <hr />
                <pre class="line-break-pre">{{ todo.task.description }}</pre>
                <hr />
                <xp-assessment
                    [assessment]="todo.assessment"
                    [todo]="todo">
                </xp-assessment>
            </div>
        </a>
    `
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    private areDetailsOpen: boolean = false;
    private TODO_STATUSES = TODO_STATUSES;

    constructor() { }

    ngOnInit() {
        //
    }

    getStatusClass() {
        switch (this.todo.status) {
            case TODO_STATUSES.UNCOMPLETED:
                return '';
            case TODO_STATUSES.COMPLETED:
                return 'list-group-item-success';
            case TODO_STATUSES.SUBMITTED_FOR_REVIEW:
                return 'list-group-item-warning';
            case TODO_STATUSES.DENIED:
                return 'list-group-item-danger'
        }
    }

    private toggleOpenDetails() {
        this.areDetailsOpen = ! this.areDetailsOpen;
    }

    private isActive(todo) {
        return todo.active;
    }

}
