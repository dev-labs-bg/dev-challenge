import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'xp-register-prerequisites',
    template: `
        <p>Хей приятелче,</p>

        <p>За да имаш шанс да станеш част екипа, има няколко умения,
        които задължително трябва да имаш:</p>

        <ol>
            <li>Английски език.</li>
            <li>Да имаш основно понятие от програмиране.</li>
            <li>Да имаш мотивация да се развиваш в Web & Mobile Development света!</li>
        </ol>

        <p>Ако ти липсва някое от уменията,
        най-добре поработи върху него
        и ако си достатъчно мотивиран - се върни пак тук.</p>

        <p>Ако покриваш базовите умения, потвърди и кликай смело напред:</p>

        <button
            type="button"
            class="btn btn-primary"
            (click)="handleToggleMode()">
            Да, потвърждавам!
        </button>
    `,
    styles: []
})
export class PrerequisitesComponent {
    @Output() onToggleMode = new EventEmitter();

    constructor() { }

    handleToggleMode() {
        this.onToggleMode.emit('MAIN_INFORMATION');
    }
}
