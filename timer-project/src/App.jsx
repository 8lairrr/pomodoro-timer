import Timer from './Timer'

function App() {
  return (
    // 1 min as work and 30 sec as break for testing purposes
    <Timer workDuration={1 * 60 * 1000} breakDuration={1 * 30 * 1000} />
  )
}

export default App
