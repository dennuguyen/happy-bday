import { useEffect, useState } from 'react'
import { useWindowSize } from '@react-hook/window-size'
import { useTimer } from 'react-timer-hook';
import MyConfetti from './MyConfetti';
import './App.css'
import Countdown from 'react-countdown';


function App() {
  const [width, height] = useWindowSize();
  const [count, setCount] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [gif, setGif] = useState('box-idle.gif');

  const openingTimer = new Date();
  openingTimer.setSeconds(1);
  const { pause: stopOpening, start: startOpening } = useTimer({
    expiryTimestamp: openingTimer,
    onExpire: () => setGif('box-idle.gif'),
    autoStart: false
  });

  const openedTimer = new Date();
  openedTimer.setSeconds(1.5);
  const { start: startOpened } = useTimer({
    expiryTimestamp: openedTimer,
    onExpire: () => {
      setGif('');
      setConfetti(true);
      audio.play();
    },
    autoStart: false
  });

  const [audio] = useState(new Audio('recorder.mp3'));

  useEffect(() => {
    if (count >= 2) {
      stopOpening();
      setGif('box-opened.gif');
      startOpened();
    }
  }, [count]);

  return (
    <Countdown date={new Date('00:00:00 24 Aug 2024')}>
      <div>
        {confetti && <h1>Happy Birthday Khánh 🥳</h1>}
        <img src={gif} />
        {!confetti ?
          <>
            <button
              className='gift'
              onClick={() => {
                setGif('box-opening.gif');
                setCount(count => count + 1);
                startOpening();
              }}
            >
            </button>
          </>
          :
          <>
            <MyConfetti width={width} height={height} confettiSource={{ x: 0, y: height, w: 0, h: 0 }} />
            <MyConfetti width={width} height={height} confettiSource={{ x: width, y: height, w: 0, h: 0 }} />
          </>
        }
      </div>
    </Countdown>
  )
}

export default App
