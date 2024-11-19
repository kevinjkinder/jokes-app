import { useState, useEffect } from 'react'
import { JokeList } from './components/JokeList'
import { AddJokeModal } from './components/AddJokeModal'
import { jokeService } from './services/jokeService'
import type { Joke } from './types/joke'
import './App.css'

function App() {
  const [jokes, setJokes] = useState<Joke[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)

  const loadJokes = async () => {
    const { jokes: _jokes, totalPages: _totalPages } = await jokeService.getJokes(currentPage, 20)
    setJokes(_jokes)
    setTotalPages(_totalPages)
  }

  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    await loadJokes()
  }

  const handleJokeDeleted = (id: number) => {
    setJokes(jokes => jokes.filter(joke => joke._id !== id))
    loadJokes()
  }

  const handleJokeRated = (updatedJoke: Joke) => {
    setJokes(jokes => jokes.map(joke => 
      joke._id === updatedJoke._id ? { ...joke, ...updatedJoke } : joke
    ))
  }

  const handleJokeAdded = () => {
    loadJokes()
  }

  useEffect(() => {
    loadJokes()
  }, [currentPage])

  return (
    <div className="app">
      <h1>Joke Collection</h1>
      
      <JokeList
        jokes={jokes}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onJokeDeleted={handleJokeDeleted}
        onJokeRated={handleJokeRated}
      />
      
      <button className="add-joke-btn" onClick={() => setShowAddModal(true)}>
        Add New Joke
      </button>
      
      <AddJokeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onJokeAdded={handleJokeAdded}
      />
    </div>
  )
}

export default App
