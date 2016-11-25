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
                (click)="toggleOpenDetails()">
                {{ areDetailsOpen ? 'hide details' : 'see details' }}
            </button>
        </p>
        <div *ngIf="areDetailsOpen">
            <p>
                {{ todo.description }}
            </p>
            <button
                class="btn btn-primary"
                (click)="toggleOpenAssessment()">
                {{ isAssessmentOpen ? 'close' : 'open' }} assessment
            </button>
            <hr />
        </div>
        <p *ngIf="isAssessmentOpen">
            TODO: Assessment
        </p>
    `,
    styles: []
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    private areDetailsOpen: boolean = false;
    private isAssessmentOpen: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    private toggleOpenDetails() {
        this.areDetailsOpen = ! this.areDetailsOpen;
    }

    private toggleOpenAssessment() {
        this.isAssessmentOpen = ! this.isAssessmentOpen;
    }

}
