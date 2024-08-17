
import { useRef } from 'react'
import Confetti from 'react-confetti'

export default function MyConfetti(props) {
  const ref = useRef(null);
  return <Confetti
    {...props}
    ref={ref}
    gravity={0.09}
    numberOfPieces={600}
    initialVelocityY={30}
    initialVelocityX={6}
  />
}