package be.honeyq.HoneyQBE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import be.honeyq.HoneyQBE.model.Article;

public interface ArticleRepository extends JpaRepository<Article, Integer> {}
