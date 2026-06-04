import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ArticleService, IArticle } from '../../services/article.service';
import { EnhancedCartService, IOrder, OrderStatus } from '../../services/cart.service';
import { AddToBaskedEvent, ArticleComponent } from '../../components/article/article.component';
import { EnterQuantityResponses } from '../../dialogs/enter-quantity/enter-quantity.component';

@Component({
  selector: 'app-article-overview',
  imports: [ArticleComponent],
  templateUrl: './article-overview.component.html',
  styleUrl: './article-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent implements OnInit {
  #articleService = inject(ArticleService);
  #cartService = inject(EnhancedCartService);
  protected readonly articles: WritableSignal<null | IArticle[]> = signal(null);
  currentOrders = this.#cartService.currentOrders;
  currentCart = this.#cartService.currentCart;
  
  ngOnInit(): void {
    this.#articleService.getAll().subscribe(all => this.articles.set((all)));
  }

  addOrUpdateToBasket(event: AddToBaskedEvent): void {
    this.#cartService.addOrUpdateItem(event.articleId, event.amount).subscribe(() => {
      if (event.response === EnterQuantityResponses.ADD_AND_GO_TO_CART){
        this.#cartService.openCart();
      }
    });
  }
}
