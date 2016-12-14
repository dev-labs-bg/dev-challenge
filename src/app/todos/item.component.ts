import { Component, OnInit, Input } from '@angular/core';

import { TODO_STATUSES } from '../assessment/constants';

import { Todo } from './todo';

@Component({
    selector: 'xp-todo-item',
    template: `
        <h4 
            [ngSwitch]="todo.status"
            class="list-group-item-heading">
            <span *ngSwitchCase="TODO_STATUSES.UNCOMPLETED">
                <span
                    class="label label-default">
                    Uncompleted
                </span>
            </span>
            <span *ngSwitchCase="TODO_STATUSES.SUBMITTED_FOR_REVIEW">
                <span
                    class="label label-warning">
                    submitted for review
                </span>
            </span>
            <span *ngSwitchCase="TODO_STATUSES.DENIED">
                <span
                    class="label label-danger">
                    denied
                </span>
            </span>
            <span *ngSwitchCase="TODO_STATUSES.COMPLETED" class="text-success">
                <i class="glyphicon glyphicon-check"></i>
                completed
            </span>
            &nbsp;
            {{ todo.task.title }}
            <span
                *ngIf="isActive(todo) && todo.status == TODO_STATUSES.UNCOMPLETED"
                class="label label-info">
                {{ todo.days_left }} days remaining
            </span>
            <span
                *ngIf="!isActive(todo)"
                class="label label-danger">
                Locked
            </span>
        </h4>
        <p class="list-group-item-text">
            <button
                *ngIf="isActive(todo)"
                class="btn btn-default btn-xs"
                (click)="toggleOpenDetails()">
                {{ areDetailsOpen ? 'hide details' : 'see details' }}
            </button>
        </p>
        <div *ngIf="areDetailsOpen">
            <pre class="line-break-pre">{{ todo.task.description }}</pre>
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
    private areDetailsOpen: boolean = false;
    private TODO_STATUSES = TODO_STATUSES;

    constructor() { }

    ngOnInit() {
        //
    }

    private toggleOpenDetails() {
        this.areDetailsOpen = ! this.areDetailsOpen;
    }

    private isActive(todo) {
        return todo.active;
    }

}
