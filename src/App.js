// CSS
import './App.css';

// Data
import { wordsList } from './data/words'

// Hooks
import { useState, useRef } from 'react';

// Components
import Start from './components/Start'
import Game from './components/Game'
import GameOver from './components/GameOver'

function App() {

  const [gameStage, setGameStage] = useState("start")
  const [pickedCategory, setPickedCategory] = useState("")
  //const [pickedWord, setPickedWord] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])

  const inputRef = useRef(null)

  // Picking category and word
  const categoryAndWord = () => {
    const categories = Object.keys(wordsList)
    const category = categories[Math.floor(Math.random() * categories.length)]

    const word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)]

    /* console.log(categories)
    console.log(category)
    console.log(word) */

    return [category, word]
  }

  categoryAndWord()

  // Starting game
  const startGame = () => {

    const [ category, word ] = categoryAndWord()

    console.log(word)

    const letters = word.split("").map((letter) => letter.toLowerCase())

    console.log(letters)

    setPickedCategory(category)
    setLetters(letters)
    setGameStage(stages[1].name)
  }

  // Trying to hit the letters
  const trying = (letter) => {

    console.log(letter)
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter) || letter === ""){
      return
    }

    if(letters.includes(letter)){
      setGuessedLetters((prevGuessedLetters) => [...prevGuessedLetters, letter])
    }else{
      setWrongLetters((prevWrongLetters) => [...prevWrongLetters, letter])
    }

    inputRef.current.focus()
    //setGameStage(stages[2].name)
  }

  console.log(guessedLetters)
  console.log(wrongLetters)

  // Reset game
  const resetGame = () => {
    setGameStage(stages[0].name)
  }

  // Game stages
  const stages = [
    {id: 0, name: 'start'},
    {id: 1, name: 'game'},
    {id: 2, name: 'end'},
  ]
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
          inputRef={inputRef}
        />}
      {gameStage === stages[2].name && <GameOver resetGame={resetGame} />}
    </div>
  );
}

export default App;
