import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';
import { Todo } from './todo';

@Component({
    selector: 'xp-dashboard',
    template: `
        <div class="list-group">
            <div class="list-group-item">
                <h4 class="list-group-item-heading">
                    <input type="checkbox" />
                    <span class="label label-success">completed</span>
                    TODO title
                </h4>
                <p class="list-group-item-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptates porro repudiandae quaerat neque culpa distinctio ratione. Dolor, optio. Deleniti totam aut at aliquid nihil voluptate magnam possimus accusamus fugiat alias cum non vero quasi quis iure quia mollitia officia maxime blanditiis ex ipsum, rerum sint. Nam sapiente odio laboriosam. Veniam debitis quae tempore magni alias provident sunt accusamus non, facere necessitatibus dignissimos quasi nesciunt adipisci atque molestias enim expedita voluptatum dolores voluptatem dolor, tempora commodi architecto dicta! Cumque eaque nemo, in eos quaerat maxime asperiores ullam officiis ad perferendis dolorem ab voluptas eum vero veritatis sequi reiciendis quasi laborum.</p>
            </div>
        </div>
    `
})
export class DashboardComponent implements OnInit {

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.todoService.repository.setup(
            this.todoService.apiGetURLS.all,
            Todo
        );
    }

}
