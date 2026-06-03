import { useEffect, useReducer } from "react"
import Header from "./Header"
import Main from "./main"

// const initialState = {
//   questions: [],
//   status: "",
// }

// function reducer(state, action) {
//   switch(action.type) {
//     case "dataFetched":
//       return {...state, payLoad: }
//   }
// }

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect(function () {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({type}))
  // }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Questions?</p>
      </Main>
    </div>
  )
}

export default App
