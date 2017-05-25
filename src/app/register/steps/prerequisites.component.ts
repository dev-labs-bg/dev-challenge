import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'xp-register-prerequisites',
    template: `
        <p>Преди да се включиш в предизвикателството, има няколко умения,
        които задължително трябва да притежаваш:</p>

        <ol>
            <li>Да владееш Английски език на работно ниво, минимум;</li>
            <li>Да имаш основно понятие от програмиране;</li>
            <li>Да имаш мотивация да се развиваш в Web & Mobile Development света!</li>
        </ol>

        <p>Ако ти липсва някое от уменията, поработи върху него
        и ако си достатъчно мотивиран - се върни пак тук.</p>

        <p>Ако покриваш базовите умения, потвърди и кликай смело напред:</p>

        <button
            type="button"
            class="btn btn-primary btn-lg"
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
