import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"

const initialState = {
  questions: [],
  //loading, error, ready, active,finished
  status: "loading",
}

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payLoad, status: "ready" }
    case "DataFailed":
      return { ...state, status: "error" }
    default:
      throw new Error("Unmatched Action Type")
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payLoad: data }))
      .catch((err) => dispatch({ type: "DataFailed" }))
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={questions?.length} />}
      </Main>
    </div>
  )
}

export default App
