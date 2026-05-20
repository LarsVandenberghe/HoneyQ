import { ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-overview.component',
  imports: [],
  templateUrl: './article-overview.component.html',
  styleUrl: './article-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleOverviewComponent implements OnInit {
  articleService = inject(ArticleService)
  protected readonly article: WritableSignal<null | any> = signal(null);
  
  ngOnInit(): void {
    this.articleService.getAll().subscribe(all => this.article.set(JSON.stringify(all)));
  }
}
