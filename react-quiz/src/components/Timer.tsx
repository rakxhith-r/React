import { ActionDispatch, useEffect } from "react"
import { ReducerAction } from "../App"

export interface TimerProps {
  dispatch: ActionDispatch<[action: ReducerAction]>
  secondsRemaining: number
}

function Timer({ dispatch, secondsRemaining }: TimerProps) {
  const mins = Math.floor(secondsRemaining / 60)
  const secs = secondsRemaining % 60
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" })
      }, 1000)

      return function () {
        clearInterval(id)
      }
    },
    [dispatch],
  )
  return (
    <p className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </p>
  )
}
export default Timer
