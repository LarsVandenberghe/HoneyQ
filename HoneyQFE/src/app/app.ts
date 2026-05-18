import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthGoogleService } from './services/auth-google.service';
import { ArticleService } from './services/article.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthGoogleService);
  private articleService = inject(ArticleService);
  
  protected readonly title = signal('HoneyQFE');
  protected readonly article: WritableSignal<null | any> = signal(null);

  profile = this.authService.profile

  effect = effect(profile => {
    console.log(profile);
  })

  signInWithGoogle() {
    this.authService.login();
  }

  callArticle() {
    this.articleService.getAll().subscribe(all => this.article.set(JSON.stringify(all)))
  }
}
