import { GameBoard } from './components/Game/GameBoard'
import { Header } from './components/Layout/Header'
import { Container } from './components/Layout/Container'
import { Footer } from './components/Layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header />
      <Container>
        <GameBoard />
      </Container>
      <Footer />
    </div>
  )
}

export default App
