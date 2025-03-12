import React, { useEffect, useState } from "react";

const holePositions = [
  { top: "10%", left: "45%" },
  { top: "30%", left: "20%" },
  { top: "30%", left: "70%" },
  { top: "50%", left: "45%" },
  { top: "70%", left: "20%" },
  { top: "70%", left: "70%" },
  { top: "90%", left: "45%" },
];

function Game({ setPantalla }) {
  const [score, setScore] = useState(0);
  const [activeMole, setActiveMole] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    if (timeLeft > 0 && lives > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameOver(true);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!gameOver) {
      const moleInterval = setInterval(() => {
        setActiveMole(Math.floor(Math.random() * 9));

        // setTimeout(() => {
        //   if (activeMole === null) {
        //     setLives((prevState) => (prevState > 0 ? prevState - 1 : 0));
        //   }
        // }, 800);
      }, 800);
      return () => clearInterval(moleInterval);
    }
  }, [gameOver, activeMole]);

  const hitMole = (index) => {
    if (index === activeMole && !gameOver) {
      if (score < 10) {
        setScore(score + 1);
        setActiveMole(null);
      } else {
        setGameOver(true);
      }
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimeLeft(30);
    setLives(3);
    setGameOver(false);
    setActiveMole(null);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#BFA07A] to-[#D9C791]">
      <div className="relative w-[900px] h-[800px] flex flex-col items-center p-6 ">
        <div className="flex gap-7 ">
          <p className="text-xl">Tiempo restante: {timeLeft}s</p>
          <p className="text-xl font-semibold">Puntaje: {score}</p>
        </div>
        {/* <p className="text-xl font-semibold text-red-500">Vidas: {lives}</p> */}
        <div className="relative w-full h-full">
          {holePositions.map((position, index) => (
            <div
              className="absolute w-52 h-52 flex items-center justify-center gap-20 "
              style={{
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -50%",
              }}
              onClick={() => hitMole(index)}
            >
              {activeMole === index ? (
                <img
                  src="/sobreTierra.png"
                  alt="Agujero"
                  className="w-64 h-72 absolute"
                />
              ) : (
                <img
                  src="/bajoTierra.png"
                  alt="Topo"
                  className="w-64 h-72 absolute"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {gameOver && (
        <div className=" absolute mt-4 text-center shadow-sm  h-52 p-8 rounded-md bg-slate-400">
          <h2 className="text-3xl text-red-600">¡Juego terminado!</h2>
          <div className="flex gap-6 mt-4">
            <button
              onClick={() => setPantalla("home")}
              className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-700"
            >
              Inicio
            </button>
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
            >
              Reiniciar Juego
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
