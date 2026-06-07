import { ActionDispatch } from "react"
import { ReducerAction } from "../App"

export interface NextButtonProps {
  dispatch: ActionDispatch<[action: ReducerAction]>
  answer: number | null
  numQuestion: number
  index: number
}

function NextButton({ dispatch, answer, numQuestion, index }: NextButtonProps) {
  if (answer === null) return null
  console.log(numQuestion, index)
  return index === numQuestion - 1 ? (
    <>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        FINISH
      </button>
    </>
  ) : (
    <>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        NEXT
      </button>
    </>
  )
}
export default NextButton
