// CSS
import './GameOver.css';

const GameOver = ({ resetGame }) => {
    return (
        <div className='GameOver'>
            <h1>Fim de Jogo</h1>
            <h2>Sua pontuação foi: <span>XXX</span></h2>
            <button className='btn' onClick={resetGame}>Reiniciar Jogo</button>
        </div>
    )
}

export default GameOver