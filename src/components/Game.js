// CSS
import './Game.css';

// Hooks
import { useState } from 'react';

const Game = ({ trying, category, letters, guessedLetters, wrongLetters, attempts, score, inputRef }) => {

    const [letter, setLetter] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        setLetter("")
    }

    return (
        <div>
            <div className='box-tips'>
                <p>Pontuação: <span>{score}</span></p>
                <h1>Adivinhe a palavra</h1>
                <h3>Dica: <span>{category}</span></h3>
                <p>Você ainda tem <span>{attempts}</span> tentativa(s).</p>
            </div>
            <div className='letters-container'>
                {letters && letters.map((l, i) => (

                    guessedLetters.includes(l) ? (
                        <span key={i}>{l}</span>
                    ) : (
                        <span key={i}></span>
                    )
                    
                ))}
            </div>
            <div className='input-letter'>
                <p>Qual letra você deseja tentar?</p>

                <form className='input-container' onSubmit={handleSubmit}>
                    <input type='text' className='box-letter' maxLength={1} value={letter} onChange={(e) => setLetter(e.target.value)} required ref={inputRef}/>
                    <button onClick={(e) => trying(letter)}>Tentar</button>
                </form>
                
                <div className='wrong-letters'>
                    <p>Letras já utilizadas:</p>
                    {wrongLetters && wrongLetters.map((l, i) => (
                        <span key={i}>{l}, </span>
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default Game