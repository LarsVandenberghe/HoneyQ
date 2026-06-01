import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ArticleService, IArticle } from '../../services/article.service';
import { CartService } from '../../services/cart.service';
import { ArticleComponent } from '../../components/article.component';

@Component({
  selector: 'app-article-overview',
  imports: [ArticleComponent],
  templateUrl: './article-overview.component.html',
  styleUrl: './article-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent implements OnInit {
  articleService = inject(ArticleService);
  cartService = inject(CartService);
  protected readonly articles: WritableSignal<null | IArticle[]> = signal(null);
  
  ngOnInit(): void {
    this.articleService.getAll().subscribe(all => this.articles.set((all)));
    this.cartService.getAll().subscribe(all => console.log(all));
  }
}
