import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState({
    minutes: 5,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (time.minutes === 0 && time.seconds === 0) {
        clearInterval(timer);
      } else {
        setTime((prev) => {
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

    return () => clearInterval(timer);
  }, [time, isRunning]);

  return (
    <div>
      <div>
        {time.minutes} : {time.seconds}
      </div>
      <button type="button" onClick={() => setIsRunning((prev) => !prev)}>
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default CountdownTimer;
