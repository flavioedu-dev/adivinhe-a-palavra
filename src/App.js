// CSS
import './App.css';

// Data
import { wordsList } from './data/words'

// Hooks
import { useState, useRef, useEffect, useCallback } from 'react';

// Components
import Start from './components/Start'
import Game from './components/Game'
import GameOver from './components/GameOver'

// Game stages
const stages = [
  {id: 0, name: 'start'},
  {id: 1, name: 'game'},
  {id: 2, name: 'end'},
]

function App() {
  const chances = 3

  

  const [gameStage, setGameStage] = useState("start")
  const [words] = useState(wordsList)
  
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  const [attempts, setAttempts] = useState(chances)
  const [score, setScore] = useState(0)

  const inputRef = useRef(null)

  // Picking category and word
  const categoryAndWord = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * categories.length)]

    const word = words[category][Math.floor(Math.random() * words[category].length)]

    /* console.log(categories)
    console.log(category)
    console.log(word) */

    return [category, word]
  }, [words])

  categoryAndWord()

  // Starting game
  const startGame = useCallback(() => {

    clearStates()

    const [ category, word ] = categoryAndWord()

    console.log(word)

    const letters = word.split("").map((letter) => letter.toLowerCase())
    console.log(letters)

    setPickedCategory(category)
    setLetters(letters)
    setGameStage(stages[1].name)
  }, [categoryAndWord])

  // Trying to hit the letters
  const trying = (letter) => {

    console.log(letter.length)
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter) || letter === "" || letter === " "){
      return
    }

    if(letters.includes(letter)){
      setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, letter])
    }else{
      setWrongLetters((prevWrongLetters) => [...prevWrongLetters, letter])

      setAttempts(prevAttempts => prevAttempts - 1)
    }

    inputRef.current.focus()
    //setGameStage(stages[2].name)
  }

  console.log(guessedLetters)
  console.log(wrongLetters)

  // Clearing states for reset the game
  const clearStates = () => {
    setAttempts(chances)
    setGuessedLetters([])
    setWrongLetters([])
  }

  // Defeat condition
  useEffect(() => {
    if(attempts <= 0){
      clearStates()

      setGameStage(stages[2].name)
    }
  },[attempts])

  // Win condition
  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length && gameStage === 'game'){
      setScore((prevScore) => prevScore += 100)

      startGame()
    }
  },[guessedLetters, gameStage, startGame, letters])

  // Reset game
  const resetGame = () => {
    setScore(0)

    setGameStage(stages[0].name)
  }

  
  return (
    <div className="App">
      {gameStage === stages[0].name && <Start startGame={startGame} />}
      {gameStage === stages[1].name &&
        <Game
          trying={trying}
          category={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          attempts={attempts}
          score={score}
          inputRef={inputRef}
        />}
      {gameStage === stages[2].name && <GameOver resetGame={resetGame} score={score}/>}

      <p className='copy'>Created by <span>&copy;xFlax00</span></p>
    </div>
  );
}

export default App;
