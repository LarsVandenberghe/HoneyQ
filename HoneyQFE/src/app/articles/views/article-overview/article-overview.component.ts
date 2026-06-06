import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { EnhancedArticleService, IArticle } from '../../services/article.service';
import { EnhancedCartService } from '../../services/cart.service';
import { AddToBaskedEvent, ArticleComponent } from '../../components/article/article.component';
import { EnterQuantityResponses } from '../../dialogs/enter-quantity/enter-quantity.component';

const EMPTY_MESSAGES = [
  { emoji: '🐝', text: 'De bijen zijn hard aan het werk, maar de honing is nog niet klaar. Kom later eens terug!' },
  { emoji: '🍯', text: 'De honingpotten zijn leeg... De bijen hebben een vergadering en bespreken de productie.' },
  { emoji: '🌸', text: 'Geen artikels? De bijen zijn op zoek naar de mooiste bloemen. Even geduld!' },
  { emoji: '🐝', text: 'De koningin heeft een vrije dag genomen. De rest van de bijenkorf doet ook maar relaxed aan.' },
  { emoji: '🌿', text: 'De bijen staken voor betere arbeidsomstandigheden. Onderhandelingen lopen nog.' },
  { emoji: '🍯', text: 'Er zijn geen artikels omdat de bijen al de honing zelf hebben opgegeten. Schandalig!' },
  { emoji: '🐝', text: 'De bijen zijn even op vakantie naar de Provence. Ze komen terug met inspiratie en stuifmeel!' },
  { emoji: '🛒', text: 'Iemand heeft blijkbaar heel erg van honing gehouden. Heel erg. De schappen zijn leeg.' },
  { emoji: '📦', text: 'De voorraad is op. Ergens staat een kelder vol honingpotten bij iemand thuis. Lucky them.' },
  { emoji: '🍯', text: 'Alle honing is al weg. We vermoeden dat er iemand is met een heel grote kelder en een heel klein schuldgevoel.' },
  { emoji: '😅', text: 'Uitverkocht! Iemand was er wat sneller bij dan de rest. Chapeau voor de motivatie.' },
  { emoji: '🚀', text: 'De honing is sneller vertrokken dan verwacht. We werken keihard om de bijenkorf bij te benen!' },
];

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
  emptyMessage = EMPTY_MESSAGES[Math.floor(Math.random() * EMPTY_MESSAGES.length)];

  addOrUpdateToBasket(event: AddToBaskedEvent): void {
    this.#cartService.addOrUpdateItem(event.articleId, event.amount).subscribe(() => {
      if (event.response === EnterQuantityResponses.ADD_AND_GO_TO_CART){
        this.#cartService.openCartOffCanvas();
      }
    });
  }
}
