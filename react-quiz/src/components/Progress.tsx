export interface ProgressProps {
  totalPoints: number
  points: number
  totalQuestions: number
  currentQuestion: number
}

function Progress({
  totalPoints,
  points,
  totalQuestions,
  currentQuestion,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress max={totalQuestions} value={currentQuestion} />
      <p>
        Question: <strong>{currentQuestion + 1}</strong> /{totalQuestions}
      </p>
      <p>
        Points: <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  )
}

export default Progress
