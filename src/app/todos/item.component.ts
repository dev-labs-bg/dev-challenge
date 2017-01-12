import { Component, OnInit, Input } from '@angular/core';

import { TODO_STATUSES } from '../assessment/constants';

import { Todo } from './todo';

@Component({
    selector: 'xp-todo-item',
    template: `
        <div class="list-group-item" [ngClass]="getStatusClass()" [class.disabled]="!isActive()">
            <h4
                class="list-group-item-heading mb0"
                (click)="isActive() && toggleOpenDetails()"
                [class.pointer]="isActive()">
                {{ todo.task.title }}
            </h4>

            <span
                *ngIf="isActive() && todo.status == TODO_STATUSES.UNCOMPLETED"
                class="label label-info pull-right">
                ... {{ todo.days_left }} days remaining
            </span>

            <ng-container [ngSwitch]="todo.status" *ngIf="isActive()">
                <span *ngSwitchCase="TODO_STATUSES.SUBMITTED_FOR_REVIEW" class="label pull-right label-warning text-uppercase">
                    submitted for review
                </span>
                <span *ngSwitchCase="TODO_STATUSES.DENIED" class="label pull-right label-danger text-uppercase">
                    denied
                </span>
                <span *ngSwitchCase="TODO_STATUSES.COMPLETED" class="label pull-right label-success text-uppercase">
                    completed
                </span>
            </ng-container>
            <span
                *ngIf="!isActive()"
                class="label pull-right text-uppercase">
                Locked
            </span>

            <div *ngIf="areDetailsOpen">
                <hr />
                <pre class="line-break-pre">{{ todo.task.description }}</pre>
                <hr />
                <xp-assessment
                    [assessment]="todo.assessment"
                    [todo]="todo">
                </xp-assessment>
            </div>
        </div>
    `,
    styles: [
        '.list-group-item-heading { width: 60%; display: inline-block; vertical-align: top; }',
        '.list-group-item > span { font-size: 18px; display: inline-block; vertical-align: top; }'
    ]
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

    private isActive() {
        return this.todo.active;
    }

}
