import { ActionDispatch } from "react"
import { ReducerAction } from "../App"

type StartScreenProps = {
  numQuestion: number
  dispatch: ActionDispatch<[action: ReducerAction]>
}

function StartScreen({ numQuestion, dispatch }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to React</h2>
      <h3>{numQuestion} questions to test your react</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  )
}

export default StartScreen
