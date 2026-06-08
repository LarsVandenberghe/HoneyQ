import { ChangeDetectionStrategy, Component, computed, inject, input, output } from "@angular/core";
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IArticle } from "../../services/article.service";
import { DecimalPipe } from "@angular/common";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EnterQuantityComponent, EnterQuantityResponses } from "../../dialogs/enter-quantity/enter-quantity.component";
import { IOrder } from "../../../orders/services/order.service";

export interface AddToBaskedEvent {
    response: EnterQuantityResponses, amount: number, articleId: number;
}

@Component({
    selector: 'app-article',
    imports: [NgbModule, DecimalPipe, FontAwesomeModule],
    templateUrl: './article.component.html',
    styleUrl: './article.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
}) export class ArticleComponent {
    faBasketShopping = faBasketShopping;

    article = input.required<IArticle>();
    currentCart = input.required<IOrder | undefined>();
    onAddToBasket = output<AddToBaskedEvent>();

    availableStock = computed(() => {
        const currentArticle = this.article();
        return 100 - (currentArticle.reservedStock * 100 / currentArticle.amountOfStock)
    });
    availableStockLabel = computed(() => {
        const currentArticle = this.article();
        return `${currentArticle.amountOfStock - currentArticle.reservedStock} / ${currentArticle.amountOfStock}`;
    });

    #modalService = inject(NgbModal);

    openArticleDialog(): void {
        const modalRef = this.#modalService.open(EnterQuantityComponent, { ariaLabelledBy: 'modal-basic-title', centered: true })
        const article = this.article();
        modalRef.componentInstance.article.set(article);
        modalRef.componentInstance.currentCart.set(this.currentCart());

        modalRef.result.then(
            (result: {response: EnterQuantityResponses, value: number}) => {
                this.onAddToBasket.emit({
                    response: result.response,
                    amount: result.value,
                    articleId: article.id});
            },
            () => {}, // dismissed
        );
    }
}