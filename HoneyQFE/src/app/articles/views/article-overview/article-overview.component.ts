import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { EnhancedArticleService, IArticle } from '../../services/article.service';
import { EnhancedCartService } from '../../services/cart.service';
import { AddToBaskedEvent, ArticleComponent } from '../../components/article/article.component';
import { EnterQuantityResponses } from '../../dialogs/enter-quantity/enter-quantity.component';

@Component({
  selector: 'app-article-overview',
  imports: [ArticleComponent],
  templateUrl: './article-overview.component.html',
  styleUrl: './article-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent {
  #articleService = inject(EnhancedArticleService);
  #cartService = inject(EnhancedCartService);
  articles = this.#articleService.articles;
  currentCart = this.#cartService.currentCart;

  addOrUpdateToBasket(event: AddToBaskedEvent): void {
    this.#cartService.addOrUpdateItem(event.articleId, event.amount).subscribe(() => {
      if (event.response === EnterQuantityResponses.ADD_AND_GO_TO_CART){
        this.#cartService.openCartOffCanvas();
      }
    });
  }
}
