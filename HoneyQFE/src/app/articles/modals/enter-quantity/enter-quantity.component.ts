import { ChangeDetectionStrategy, Component, computed, inject, linkedSignal, OnInit, signal } from "@angular/core";
import { ModalDismissReasons, NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DecimalPipe } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IArticle } from "../../services/article.service";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FormsModule } from "@angular/forms";
import { IOrder } from "../../services/cart.service";

export enum EnterQuantityResponses {
    ADD,
    ADD_AND_GO_TO_CART
}

@Component({
    imports: [NgbModule, FontAwesomeModule, FormsModule],
    templateUrl: './enter-quantity.component.html',
    styleUrl: './enter-quantity.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
}) export class EnterQuantityComponent implements OnInit{
    modal = inject(NgbActiveModal);
    article = signal<IArticle | undefined>(undefined);
    currentCart = signal<IOrder | undefined>(undefined);

    faPlus = faPlus
    faMinus = faMinus

    enterQuantityResponses = EnterQuantityResponses;
    modalDismissReasons = ModalDismissReasons;

    amount = linkedSignal({
        source: () => {
            const currentCart = this.currentCart();
            const article = this.article();
            return currentCart?.orderDetails?.find(od => od.article.id === article?.id)?.quantity ?? 0;
        },
        computation: (source) => source
    });

    availableStock = computed(() => {
        const currentArticle = this.article();
        if (!currentArticle)
            return 0;
        return 100 - ((currentArticle.reservedStock  + this.amount()) * 100 / currentArticle.amountOfStock)
    });
    availableStockLabel = computed(() => {
        const currentArticle = this.article();
        if (!currentArticle)
            return 0;
        return `${currentArticle.amountOfStock - currentArticle.reservedStock - this.amount()} / ${currentArticle.amountOfStock}`;
    });

    maximumStockAllowed = computed(() => {
        const currentArticle = this.article();
        if (!currentArticle)
            return 0;
        return currentArticle.amountOfStock - currentArticle.reservedStock;
    });

    priceCalculation = computed(() => {
        const currentArticle = this.article();
        const amount = this.amount() ?? 0;
        if (!currentArticle)
            return "";

        const pipe = new DecimalPipe('nl-BE');

        return `${amount} x € ${pipe.transform(currentArticle.priceInEUR, '1.2-2')} = € ${pipe.transform(amount * currentArticle.priceInEUR, '1.2-2')}`
    })

    ngOnInit(): void {
        this.onAmountChange(this.amount());
    }

    onAmountChange(amount: number): void {
        const maximumAllowed = this.maximumStockAllowed();
        if (amount > maximumAllowed) {
            this.amount.set(maximumAllowed);
        } else if (amount < 0) {
            this.amount.set(0);
        } else {
             this.amount.set(amount);
        }
    }
}