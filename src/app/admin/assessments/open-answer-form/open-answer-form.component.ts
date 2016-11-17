import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Question } from "../../../classes/question";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'xp-open-answer-form',
  templateUrl: './open-answer-form.component.html',
  styleUrls: ['./open-answer-form.component.scss']
})
export class OpenAnswerFormComponent implements OnInit {
    @Input() private question: Question;
    @Input() private form: FormGroup;

    constructor() { }

    ngOnInit() {
        //
    }

}
