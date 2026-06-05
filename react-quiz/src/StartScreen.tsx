type StartScreenProps = {
  numQuestion: number
}

function StartScreen({ numQuestion }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to React</h2>
      <h3>{numQuestion} questions to test your react</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  )
}

export default StartScreen
