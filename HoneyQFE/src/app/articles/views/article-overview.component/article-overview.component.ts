import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-overview.component',
  imports: [],
  templateUrl: './article-overview.component.html',
  styleUrl: './article-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent {
  articleService = inject(ArticleService)
  protected readonly article: WritableSignal<null | any> = signal(null);

  callArticle() {
    this.articleService.getAll().subscribe(all => this.article.set(JSON.stringify(all)))
  }
}
