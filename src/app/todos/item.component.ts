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
            <button
                class="btn btn-primary"
                (click)="toggleOpenAssessment()">
                {{ isAssessmentOpen ? 'close' : 'open' }} assessment
            </button>
            <hr />
        </div>
        <xp-assessment-micro-project *ngIf="isAssessmentOpen">
        </xp-assessment-micro-project>
    `,
    styles: []
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    private areDetailsOpen: boolean = true;
    private isAssessmentOpen: boolean = true;

    constructor() {
        console.log(this.todo);
    }

    ngOnInit() {
    }

    private toggleOpenDetails() {
        this.areDetailsOpen = ! this.areDetailsOpen;
    }

    private toggleOpenAssessment() {
        this.isAssessmentOpen = ! this.isAssessmentOpen;
    }

}
