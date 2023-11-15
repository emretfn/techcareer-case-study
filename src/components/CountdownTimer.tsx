import { useEffect, useState } from "react";
import styles from "../styles/CountdownTimer.module.css";

const CountdownTimer = () => {
  const [time, setTime] = useState({
    minutes: 5,
    seconds: 0,
  });
  const [inputMinute, setInputMinute] = useState(5);
  const [inputSecond, setInputSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // If the timer is not running, we don't need to do anything
    if (!isRunning) return;

    // If the timer is running, we want to decrease the seconds
    const timer = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(timer);
      } else {
        setTime((prev) => {
          // If the seconds are 0, we want to decrease the minutes
          if (prev.seconds === 0) {
            return {
              minutes: prev.minutes - 1,
              seconds: 59,
            };
          } else {
            return {
              ...prev,
              seconds: prev.seconds - 1,
            };
          }
        });
      }
    }, 1000);

    // clear time when component unmounts
    return () => clearInterval(timer);
  }, [time, isRunning]);

  const handleSetTimer = () => {
    setTime({
      minutes: inputMinute,
      seconds: inputSecond,
    });
  };

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className={styles.timerWrapper}>
      <div className={styles.inputWrapper}>
        <input
          type="number"
          name="minute"
          value={inputMinute}
          className={styles.input}
          onChange={(e) => setInputMinute(Number(e.target.value))}
        />
        <input
          type="number"
          name="second"
          value={inputSecond}
          className={styles.input}
          onChange={(e) => setInputSecond(Number(e.target.value))}
        />
        <button className="btn" onClick={handleSetTimer}>
          Set Timer
        </button>
      </div>
      <div className={styles.timer}>
        {formatTime(time.minutes)} : {formatTime(time.seconds)}
      </div>
      <button
        className="btn"
        type="button"
        onClick={() => setIsRunning((prev) => !prev)}
        style={{ backgroundColor: isRunning ? "#e74c3c" : "#2ecc71" }}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default CountdownTimer;
