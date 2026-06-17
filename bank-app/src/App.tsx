import { useReducer } from "react"

export interface InitialStateProps {
  balance: number
  loanStatus?: string
  accstatus?: string
  loan?: number
}

export interface ReducerStateProps {
  balance: number
  loanStatus?: string
  accstatus?: string
  loan?: number
}

export type ReducerActionProps =
  | { type: "" }
  | { type: "openAcc" }
  | { type: "deposit" }
  | { type: "withdraw" }
  | { type: "requestLoan" }
  | { type: "payLoan" }
  | { type: "closeAccount" }

const initialState: InitialStateProps = {
  balance: 0,
  accstatus: "",
  loan: 0,
  loanStatus: "",
}

function reducer(
  state: ReducerStateProps,
  action: ReducerActionProps,
): ReducerStateProps {
  switch (action.type) {
    case "openAcc":
      return { ...state, balance: 500, accstatus: "accountOpen" }
    case "deposit":
      return { ...state, balance: state.balance + 150 }
    case "withdraw":
      return { ...state, balance: state.balance - 50 }
    case "requestLoan":
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan! + 5000,
        loanStatus: "loanApproved",
      }
    case "payLoan":
      return {
        ...state,
        loan: 0,
        loanStatus: "loanCleared",
        balance: state.balance - state.loan!,
      }
    case "closeAccount":
      if (state.loan! > 0 || state.balance !== 0) return state
      return initialState
    default:
      throw new Error("Unknown ACtion")
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  console.log(state)
  return (
    <>
      <h1>useReducer Bank Account</h1>
      <div>
        <p>Balance: {state.balance}</p>
        <p>Loan:{state.loan}</p>
        <button
          onClick={() => {
            dispatch({ type: "openAcc" })
          }}
          disabled={state.accstatus === "accountOpen"}
        >
          Open Account
        </button>
        <button
          onClick={() => {
            dispatch({ type: "deposit" })
          }}
          disabled={state.accstatus !== "accountOpen"}
        >
          Deposit 150
        </button>
        <button
          onClick={() => {
            state.balance >= 50
              ? dispatch({ type: "withdraw" })
              : alert("No money to withdraw")
          }}
          disabled={state.accstatus !== "accountOpen"}
        >
          Withdraw 50
        </button>
        <button
          onClick={() => {
            state.loanStatus !== "loanApproved"
              ? dispatch({ type: "requestLoan" })
              : alert("Loan Already approved")
          }}
          disabled={state.accstatus !== "accountOpen"}
        >
          Request a Loan of 5000
        </button>
        <button
          onClick={() =>
            state.balance > state.loan!
              ? dispatch({ type: "payLoan" })
              : alert("Low balance to pay loan")
          }
          disabled={
            state.accstatus !== "accountOpen" ||
            state.loanStatus !== "loanApproved"
          }
        >
          Pay Loan
        </button>
        <button
          disabled={state.accstatus !== "accountOpen"}
          onClick={() =>
            state.balance === 0
              ? dispatch({ type: "closeAccount" })
              : alert("Withdraw your money")
          }
        >
          Close Account
        </button>
      </div>
    </>
  )
}

export default App
