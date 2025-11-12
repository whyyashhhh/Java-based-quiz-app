package com.intelliquiz.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.intelliquiz.model.Question;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuizService {
    private List<Question> allQuestions;

    public QuizService() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream in = getClass().getResourceAsStream("/questions.json");
        if (in == null) {
            throw new IllegalStateException("questions.json not found on classpath");
        }
        allQuestions = mapper.readValue(in, new TypeReference<List<Question>>() {});
    }

    public List<Question> getQuestionsByCategory(String category) {
        return allQuestions.stream()
                .filter(q -> q.getCategory() != null && q.getCategory().equalsIgnoreCase(category))
                .limit(10)
                .collect(Collectors.toList());
    }

    /**
     * answers: list of maps with keys: 'question' -> question text, 'answer' -> user answer text
     */
    public int calculateScore(List<Map<String, String>> answers) {
        int score = 0;
        for (Map<String, String> ans : answers) {
            String questionText = ans.get("question");
            String userAnswer = ans.get("answer");
            Optional<Question> q = allQuestions.stream()
                    .filter(x -> x.getQuestion() != null && x.getQuestion().equals(questionText))
                    .findFirst();
            if (q.isPresent()) {
                String correct = q.get().getAnswer();
                if (correct != null && correct.equals(userAnswer)) score++;
            }
        }
        return score;
    }
}
