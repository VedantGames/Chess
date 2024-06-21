import Reac, { useContext, useEffect, useState } from 'react'
import { Socket } from '../context/Socket.context';
import { useNavigate } from 'react-router-dom';
import { User } from '../context/User.context';

function LandingPage() {
  const { socket } = useContext(Socket);
  const { setUser } = useContext(User);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);

  const startGame = () => { 
    socket.send(JSON.stringify({
      type: "init_game",
      payload: {
        name,
        rating
      }
    }))
    setUser({ name, rating });
  };

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = ev => {
      const message = JSON.parse(ev.data);

      if (message.type === "waiting") navigate('/wait');
      if (message.type === "init_game") {
        socket.playerData = message.payload.playerData;
        navigate('/play/' + message.payload.color)
      };;
    }
  }, [socket]);

  return (
    <div className='px-32 mt-20'>
      <div className='flex px-32 gap-10'>
        <div className='flex flex-col gap-2'>
          <input
            type="text" 
            placeholder='Name'
            className='bg-stone-900 rounded-xl px-2 py-2'
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <input
            type="number" 
            placeholder='Rating'
            className='bg-stone-900 rounded-xl px-2 py-2'
            value={rating}
            onChange={ev => setRating(ev.target.value)}
          />
        </div>
        <button onClick={startGame} className='bg-[#81b64c] border-b-4 border-[#45753c] w-48 h-12 rounded-xl font-bold text-2xl'>Play</button>
      </div>
    </div>
  )
}

export default LandingPage
