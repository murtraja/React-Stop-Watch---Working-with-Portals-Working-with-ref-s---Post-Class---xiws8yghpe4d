"use client";
import React, { useRef, useState, useEffect } from "react";

function Home() {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const onStartClick = () => {
    startTime.current = Date.now();
    intervalRef.current = setInterval(
      () => setCurrentTime(Date.now() - startTime.current),
      10
    );
  };

  const onStopClick = () => {
    clearInterval(intervalRef.current);
  };

  const onLapClick = () => {
    const newLaps = [...laps];
    newLaps.push(currentTime);
    setLaps(newLaps);
  };

  const onResetClick = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    setLaps([]);
  };

  const showTime = (t) => (t / 1000).toFixed(3);

  return (
    <div id="main">
      <section>
        <h1 className="seconds-elapsed">{showTime(currentTime)}</h1>
        <section className="buttons">
          <button onClick={onStartClick} className="start-btn">
            START
          </button>
          <button onClick={onStopClick} className="stop-btn">
            STOP
          </button>
          <button onClick={onLapClick} className="lap-btn">
            LAP
          </button>
          <button onClick={onResetClick} className="reset-btn">
            RESET
          </button>
        </section>
      </section>
      {laps.length === 0 ? null : (
        <section className="lap-section">
          <h2>Laps</h2>
          <section className="laps">
            {laps.map((lap) => (
              <p>{showTime(lap)}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  );
}

export default Home;
