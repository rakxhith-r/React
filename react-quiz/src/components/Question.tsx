import { ActionDispatch } from "react"
import { QuestionProps, ReducerAction } from "../App"

type QuestionComponentProps = {
  question: QuestionProps
  dispatch: ActionDispatch<[action: ReducerAction]>
  answer: number | null
}

function Question({ question, dispatch, answer }: QuestionComponentProps) {
  const { correctOption } = question
  const hasAnswered = answer !== null

  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""}`}
            onClick={() => {
              dispatch({ type: "newAnswer", payload: index })
            }}
            disabled={hasAnswered}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question
