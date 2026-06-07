import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import Main from "./components/main"
import StartScreen from "./components/StartScreen"
import Loader from "./components/Loader"
import Error from "./components/Error"
import Question from "./components/Question"
import NextButton from "./components/NextButton"
import Progress from "./components/Progress"
import FinishScreen from "./components/FinishScreen"
import Footer from "./components/Footer"
import Timer from "./components/Timer"

export type QuestionProps = {
  correctOption: number
  id: string
  options: string[]
  points: number
  question: string
}

export type ReducerStateProps = {
  questions: QuestionProps[]
  status: "loading" | "ready" | "error" | "active" | "finished"
  index: number
  answer: number | null
  points: number
  highScore: number
  secondsRemaining: number | null
}

export type ReducerAction =
  | { type: "dataFetched"; payload: QuestionProps[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "timer" }

const initialState: ReducerStateProps = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
}

function reducer(
  state: ReducerStateProps,
  action: ReducerAction,
): ReducerStateProps {
  switch (action.type) {
    case "dataFetched":
      return {
        ...state,
        questions: action.payload!,
        status: "ready",
      }

    case "dataFailed":
      return {
        ...state,
        status: "error",
      }
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      }
    case "newAnswer":
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      }
    case "timer":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      }
    default:
      return state
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state
  const totalPoints = questions.reduce((prev, cur) => {
    return prev + cur.points
  }, 0)

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
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestion={questions?.length} />
        )}
        {status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              points={points}
              totalQuestions={questions?.length}
              currentQuestion={index}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining!} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestion={questions?.length}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
