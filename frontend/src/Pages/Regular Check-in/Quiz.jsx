import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";
import questions from "./Questions.json";
import Navbar from "../Home/HomeComponents/Navbar/Navbar";

const Quiz = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const scenario = params.get("scenario");
  const place = params.get("location");

  useEffect(() => {
    if (!scenario || !place) navigate("/check-in", { replace: true });
  }, [scenario, place, navigate]);

  const filteredQuestions = questions.filter(
    (q) => q.scenario === scenario && q.location === place
  );

  const [answers, setAnswers] = useState({});
  const [textAnswer, setTextAnswer] = useState("");

  const mcqQuestions = filteredQuestions
    .filter((q) => q.type === "mcq")
    .slice(0, 10);
  const textQuestion = filteredQuestions.find((q) => q.type === "text");

  const handleSelect = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = () => {
    let score = 0;
    mcqQuestions.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });

    navigate("/result", {
      state: {
        score,
        total: mcqQuestions.length,
        answers,
        textAnswer,
        scenario,
        location: place,
      },
    });
  };

  return (
    <div>
        <Navbar/>
      <div className="quiz-container">
        <h1>
          Quiz: {scenario?.toUpperCase()} at {place?.toUpperCase()}
        </h1>

        {mcqQuestions.length === 0 ? (
          <p>No questions found 🚫</p>
        ) : (
          <>
            {mcqQuestions.map((q, i) => (
              <div key={q.id} className="quiz-question">
                <h3>
                  Q{i + 1}: {q.question}
                </h3>
                <ul>
                  {q.options.map((opt, idx) => (
                    <li
                      key={idx}
                      className={`quiz-option ${
                        answers[q.id] === opt ? "selected" : ""
                      }`}
                      onClick={() => handleSelect(q.id, opt)}
                    >
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {textQuestion && (
              <div className="quiz-question">
                <h3>
                  Q{mcqQuestions.length + 1}: {textQuestion.question}
                </h3>
                <textarea
                  className="text-answer"
                  rows="4"
                  placeholder="Write your survival strategy..."
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                />
              </div>
            )}

            <button className="submit-quiz" onClick={handleSubmit}>
              Submit Quiz ✅
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
