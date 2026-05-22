import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ArticleService, IArticle } from '../../services/article.service';

@Component({
  selector: 'app-article-overview.component',
  imports: [],
  templateUrl: './article-overview.component.html',
  styleUrl: './article-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent implements OnInit {
  articleService = inject(ArticleService)
  protected readonly articles: WritableSignal<null | IArticle[]> = signal(null);
  
  ngOnInit(): void {
    this.articleService.getAll().subscribe(all => this.articles.set((all)));
  }

  openArticleDialog(id: number): void {
    console.log("open dialog om hoeveelheid toe te voegen aan winkelmand.", id)
  }
}
