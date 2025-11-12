package com.intelliquiz.controller;

import com.intelliquiz.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/quiz")
public class QuizController {
    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/{category}")
    public List<?> getQuestions(@PathVariable String category) {
        return quizService.getQuestionsByCategory(category);
    }

    @PostMapping("/submit")
    public Map<String, Object> submitQuiz(@RequestBody List<Map<String, String>> answers) {
        int score = quizService.calculateScore(answers);
        return Map.of("score", score, "total", answers.size());
    }
}
