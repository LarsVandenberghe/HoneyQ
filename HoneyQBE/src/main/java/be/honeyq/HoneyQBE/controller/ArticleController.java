package be.honeyq.HoneyQBE.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import be.honeyq.HoneyQBE.dto.SimpleArticleDto;
import be.honeyq.HoneyQBE.repository.ArticleRepository;

@RestController
@RequestMapping("article")
@CrossOrigin
public class ArticleController {

    @Autowired
    private ArticleRepository articleRepository;

    @GetMapping("")
	public List<SimpleArticleDto> findAll() {
		return articleRepository.findAll().stream().map(article -> SimpleArticleDto.fromDomain(article)).toList();
	}

    @GetMapping("/{id}")
	public SimpleArticleDto findById(@PathVariable Integer id) {
		return articleRepository
				.findById(id)
				.map(article -> SimpleArticleDto.fromDomain(article))
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						"Content not found!"
						));
	}
}
