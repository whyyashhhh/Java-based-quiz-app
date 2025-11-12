package com.intelliquiz.model;

import java.util.List;
import java.util.Objects;

public class Question {
    // Legacy/functional fields (used by existing service)
    private int id;
    private String text;
    private List<String> options;
    private int answerIndex = -1;

    // Optional metadata fields (new schema)
    private String category;
    private String answer; // textual answer (optional)
    private String explanation;

    public Question() {}

    // Legacy constructor used by QuizService when hiding answers
    public Question(int id, String text, List<String> options, int answerIndex) {
        this.id = id;
        this.text = text;
        this.options = options;
        this.answerIndex = answerIndex;
    }

    // New-style constructor
    public Question(String category, String question, List<String> options, String answer, String explanation) {
        this.category = category;
        this.text = question;
        this.options = options;
        this.answer = answer;
        this.explanation = explanation;
    }

    // Full constructor
    public Question(int id, String text, List<String> options, int answerIndex, String category, String answer, String explanation) {
        this(id, text, options, answerIndex);
        this.category = category;
        this.answer = answer;
        this.explanation = explanation;
    }

    // Legacy getters/setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getText() { return text; }
    public void setText(String text) { this.text = text; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }

    public int getAnswerIndex() { return answerIndex; }
    public void setAnswerIndex(int answerIndex) { this.answerIndex = answerIndex; }

    // New-style accessors (aliases to legacy fields where applicable)
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    // question is an alias for text to support new schema names
    public String getQuestion() { return text; }
    public void setQuestion(String question) { this.text = question; }

    /**
     * Returns textual answer if provided; otherwise resolves from answerIndex and options.
     */
    public String getAnswer() {
        if (answer != null) return answer;
        if (options != null && answerIndex >= 0 && answerIndex < options.size()) return options.get(answerIndex);
        return null;
    }

    public void setAnswer(String answer) { this.answer = answer; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question1 = (Question) o;
        return id == question1.id && answerIndex == question1.answerIndex && Objects.equals(text, question1.text) && Objects.equals(options, question1.options) && Objects.equals(category, question1.category) && Objects.equals(answer, question1.answer) && Objects.equals(explanation, question1.explanation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, options, answerIndex, category, answer, explanation);
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", options=" + options +
                ", answerIndex=" + answerIndex +
                ", category='" + category + '\'' +
                ", answer='" + answer + '\'' +
                ", explanation='" + explanation + '\'' +
                '}';
    }
}
