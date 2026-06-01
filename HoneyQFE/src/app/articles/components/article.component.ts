import { ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, signal, TemplateRef, WritableSignal } from "@angular/core";
import { ModalDismissReasons, NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IArticle } from "../services/article.service";
import { DecimalPipe } from "@angular/common";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-article',
    imports: [NgbModule, DecimalPipe, FontAwesomeModule],
    templateUrl: './article.component.html',
    styleUrl: './article.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
}) export class ArticleComponent {
    faBasketShopping = faBasketShopping;

    article = input.required<IArticle>();
    availableStock = computed(() => {
        const currentArticle = this.article();
        return 100 - (currentArticle.reservedStock * 100 / currentArticle.amountOfStock)
    });
    availableStockLabel = computed(() => {
        const currentArticle = this.article();
        return `${currentArticle.amountOfStock - currentArticle.reservedStock} / ${currentArticle.amountOfStock}`;
    });

    #modalService = inject(NgbModal);
    closeResult: WritableSignal<string> = signal('');

    openArticleDialog(id: number, content: TemplateRef<any>): void {
        const modalRef = this.#modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
        
        modalRef.result.then(
            (result) => {
                this.closeResult.set(`Closed with: ${result}`);
            },
            (reason) => {
                this.closeResult.set(`Dismissed ${this.#getDismissReason(reason)}`);
            },
        );
    }

    #getDismissReason(reason: any): string {
        switch (reason) {
            case ModalDismissReasons.ESC:
                return 'by pressing ESC';
            case ModalDismissReasons.BACKDROP_CLICK:
                return 'by clicking on a backdrop';
            default:
                return `with: ${reason}`;
        }
    }
}