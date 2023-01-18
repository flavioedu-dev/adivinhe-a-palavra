// CSS
import './Start.css';

const Start = ({ startGame }) => {

    return (
        <div className='Start'>
            <h1>Adivinhe a Palavra</h1>
            <h3>Clique no botão abaixo para iniciar o jogo!</h3>
            <button onClick={startGame} className='btn'>Iniciar Jogo</button>
        </div>
    )
}

export default Start