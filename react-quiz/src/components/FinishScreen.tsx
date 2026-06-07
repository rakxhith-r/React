import { ActionDispatch } from "react"
import { ReducerAction } from "../App"

export interface FinishScreenProps {
  dispatch: ActionDispatch<[action: ReducerAction]>
  points: number
  totalPoints: number
  highScore: number
}

function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}: FinishScreenProps) {
  const percentage = (points / totalPoints) * 100
  return (
    <>
      <p className="result">
        You scored {points} out of {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(HighScore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  )
}

export default FinishScreen
