package com.intelliquiz.service;

import org.junit.jupiter.api.Test;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class QuizServiceTest {

    @Test
    public void calculateScore_byQuestionText_shouldReturnCorrectScore() throws Exception {
        QuizService service = new QuizService();

        // Prepare answers: two answers, one correct (Mars), one incorrect
        List<Map<String,String>> answers = List.of(
                Map.of("question", "What planet is known as the Red Planet?", "answer", "Mars"),
                Map.of("question", "What does HTTP stand for?", "answer", "Wrong Answer")
        );

        int score = service.calculateScore(answers);
        assertEquals(1, score);
    }
}
