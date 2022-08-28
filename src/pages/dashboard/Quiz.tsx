import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { selectModuleData } from "../../redux/module/selectors";
import { TWord } from "../../redux/module/types";
import { Line } from "rc-progress";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useAppSelector } from "../../redux/store";
import { Endpoints } from "../../models/routes";

export type TQuestion = {
  question: string;
  incorrectAnswers: string[];
  correctAnswer: [];
};

type TMakeShotOptions = {
  spread?: number;
  decay?: number;
  scalar?: number;
  startVelocity?: number;
};

const Quiz: React.FC = () => {
  const { module } = useAppSelector(selectModuleData);
  const allTerms: string[] = [];
  const allTranslates: string[] = [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any>([]);
  const [selected, setSelected] = useState<string>();
  const [score, setScore] = useState(0);
  const [isResult, setIsResult] = useState(false);

  const refAnimationInstance = useRef<any>(null);

  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback(
    (particleRatio: number, opts: TMakeShotOptions) => {
      refAnimationInstance.current &&
        refAnimationInstance.current({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio),
        });
    },
    []
  );

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const createQuestions = () => {
    if (module) {
      const moduleWords = [...module.words];
      setQuestions(
        moduleWords
          .sort(() => 0.5 - Math.random())
          .map((item: TWord) => {
            const result = {
              question: item.translate,
              correctAnswer: item.word,
              allOptions: [
                ...allTerms
                  .sort(() => 0.5 - Math.random())
                  .filter((i) => i !== item.word)
                  .slice(0, 3),
                item.word,
              ],
            };
            result.allOptions.sort(() => 0.5 - Math.random());
            return result;
          })
      );
    } else {
      console.log("no module");
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 === questions.length) {
      setIsResult(true);
      if (score === questions.length) fire();
      setCurrentQuestion(currentQuestion + 1);
    } else if (selected) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected("");
    }
  };

  const handleSelect = (item: string) => {
    if (
      selected === item &&
      selected === questions[currentQuestion].correctAnswer
    ) {
      return "correct";
    } else if (
      selected === item &&
      selected !== questions[currentQuestion].correctAnswer
    ) {
      return "incorrect";
    } else if (item === questions[currentQuestion].correctAnswer) {
      return "correct";
    }
  };

  const checkAnswer = (answer: string) => {
    setSelected(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prevValue) => prevValue + 1);
    }
  };

  const resetQuiz = () => {
    setIsResult(false);
    createQuestions();
    setScore(0);
    setSelected("");
    setCurrentQuestion(0);
  };

  useEffect(() => {}, [selected]);

  useEffect(() => {
    if (module) {
      module.words.map((word: TWord) => allTerms.push(word.word));
      module.words.map((word: TWord) => allTranslates.push(word.translate));
      createQuestions();
    } else {
      console.log("no module");
    }
  }, [isResult]);

  return (
    <>
      <section className="quizContainer">
        <Line
          percent={Math.ceil((currentQuestion / questions.length) * 100)}
          strokeWidth={1}
          strokeColor="#1983ff"
          trailColor="#F0F4F8"
        />
        <div className="quizContainer__question">
          <h5>{questions[currentQuestion]?.question}</h5>
        </div>
        {!isResult && <h1>Choose correct definition</h1>}
        <div className="quizContainer__answers">
          {questions[currentQuestion]?.allOptions?.map(
            (item: any, index: number) => {
              return (
                <button
                  disabled={selected ? true : false}
                  key={index}
                  onClick={() => checkAnswer(item)}
                  className={`quizContainer__option ${
                    selected && handleSelect(item)
                  }`}
                >
                  <span>{index + 1}</span>
                  <h4>{item}</h4>
                </button>
              );
            }
          )}
        </div>
        {isResult && (
          <div className="quizContainer__result">
            <h1>
              {score === questions.length
                ? "You are doing fantastic!"
                : "Good job! Keep learning!"}
            </h1>
            <div>
              <div style={{ width: 200, height: 200, marginBottom: 50 }}>
                <CircularProgressbar
                  value={score}
                  maxValue={questions.length}
                  text={`${score} / ${questions.length}`}
                  styles={buildStyles({
                    pathColor: "#1983ff",
                    textColor: "#646f90",
                    trailColor: "#f0f4f8",
                  })}
                />
              </div>
            </div>
          </div>
        )}
        <ReactCanvasConfetti refConfetti={getInstance} className="confetti" />
      </section>
      <div className="quizNextButtons">
        {selected && !isResult && (
          <button
            onClick={handleNext}
            className="button button--createFormBtnBottom button--nextQuestionBtn"
          >
            Next question
          </button>
        )}
      </div>
      {isResult && (
        <div className="quizResultButtons">
          <Link to={`${Endpoints.SingleModule}/${module._id}`}>
            <button className="button  button--resultButtons">
              Back to module
            </button>
          </Link>
          <button
            onClick={resetQuiz}
            className="button  button--resultButtons "
          >
            Try more
          </button>
        </div>
      )}
    </>
  );
};

export default Quiz;
