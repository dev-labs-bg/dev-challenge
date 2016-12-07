import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'xp-modal',
    template: `
        <div bsModal
            #lgModal="bs-modal"
            class="modal fade"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
            (onShow)="handleShow()"
            (onHide)="handleHide()">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button
                            type="button"
                            class="close"
                            (click)="lgModal.hide()"
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">{{ title }}</h4>
                    </div>
                    <div class="modal-body">

                        <ng-content></ng-content>

                    </div>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class Modal {
    @ViewChild('lgModal') private childModal: ModalDirective;
    @Input() title: string;
    @Output() onShow = new EventEmitter();
    @Output() onHide = new EventEmitter();

    constructor() { }

    show(): void {
        this.childModal.show();
    }
    handleShow(): void {
        this.onShow.emit();
    }

    hide(): void {
        this.childModal.hide();
    }
    handleHide(): void {
        this.onHide.emit();
    }
}
