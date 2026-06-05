import { ChangeDetectionStrategy, Component, inject, signal } from "@angular/core";
import { ModalDismissReasons, NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { IOrder } from "../../../../articles/services/cart.service";
import { DecimalPipe } from "@angular/common";

@Component({
    imports: [NgbModule, FontAwesomeModule, DecimalPipe],
    templateUrl: './confirm-order.component.html',
    styleUrl: './confirm-order.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
}) export class ConfirmOrderComponent {
    modal = inject(NgbActiveModal);
    currentCart = signal<IOrder | undefined>(undefined);
    totalPrice = signal<number | undefined>(undefined);

    faCheck = faCheck;
    faClose = faClose;

    modalDismissReasons = ModalDismissReasons;
}