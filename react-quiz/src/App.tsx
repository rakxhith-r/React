import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./main"
import StartScreen from "./StartScreen"
import Loader from "./Loader"
import Error from "./Error"

type QuestionProps = {
  correctOption: number
  id: string
  options: string[]
  points: number
  question: string
}

type ReducerStateProps = {
  questions: QuestionProps[]
  status: "loading" | "ready" | "error"
}

type ReducerAction =
  | {
      type: "dataFetched"
      payload: QuestionProps[]
    }
  | {
      type: "dataFailed"
    }

const initialState: ReducerStateProps = {
  questions: [],
  status: "loading",
}

function reducer(
  state: ReducerStateProps,
  action: ReducerAction,
): ReducerStateProps {
  switch (action.type) {
    case "dataFetched":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }

    case "dataFailed":
      return {
        ...state,
        status: "error",
      }

    default:
      return state
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { questions, status } = state
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataFetched", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }))
  }, [])
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {questions?.length && <StartScreen numQuestion={questions?.length} />}
      </Main>
    </div>
  )
}

export default App
