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
            if (ans == null) continue;
            String questionKey = ans.get("question");
            String userAnswerRaw = ans.get("answer");
            if (questionKey == null) continue;

            // Find matching question: allow matching by numeric id or by question text (case/whitespace tolerant)
            Optional<Question> qOpt = allQuestions.stream()
                    .filter(x -> {
                        if (x == null) return false;
                        // try id match when questionKey is a number
                        try {
                            int requestedId = Integer.parseInt(questionKey.trim());
                            if (x.getId() == requestedId) return true;
                        } catch (NumberFormatException ignored) {
                            // not an id, fall through to text match
                        }
                        String qText = x.getQuestion();
                        return qText != null && qText.trim().equalsIgnoreCase(questionKey.trim());
                    })
                    .findFirst();

            if (qOpt.isPresent()) {
                Question q = qOpt.get();
                if (userAnswerRaw == null) continue;
                String user = userAnswerRaw.trim();

                boolean correct = false;
                // If user supplied an index (numeric), compare to answerIndex when available
                try {
                    int idx = Integer.parseInt(user);
                    if (q.getAnswerIndex() >= 0) {
                        correct = (idx == q.getAnswerIndex());
                    } else if (q.getOptions() != null && idx >= 0 && idx < q.getOptions().size()) {
                        String optText = q.getOptions().get(idx);
                        String correctText = Optional.ofNullable(q.getAnswer()).orElse("").trim();
                        if (!correctText.isEmpty() && optText != null && optText.trim().equalsIgnoreCase(correctText)) {
                            correct = true;
                        }
                    }
                } catch (NumberFormatException nfe) {
                    // Not a numeric index — compare by answer text (case-insensitive, trimmed)
                    String correctText = Optional.ofNullable(q.getAnswer()).orElse("").trim();
                    if (!correctText.isEmpty() && correctText.equalsIgnoreCase(user)) {
                        correct = true;
                    }
                }

                if (correct) score++;
            }
        }
        return score;
    }
}
