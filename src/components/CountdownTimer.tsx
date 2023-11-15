import { useEffect, useState } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState({
    minutes: 5,
    seconds: 0,
  });

  useEffect(() => {
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
  }, [time]);

  return (
    <div>
      <h1>CountDown Timer</h1>
      <div>
        {time.minutes} : {time.seconds}
      </div>
    </div>
  );
};

export default CountdownTimer;
