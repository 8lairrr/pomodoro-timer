import React, {useState, useEffect, useRef} from 'react';
import './Timer.css'

function Timer( { workDuration = 25 * 60 * 1000, breakDuration = 5 * 60 * 1000, onHome}) { //default props are 25 and 5 mins

    const [isRunning, setIsRunning] = useState(false); //timer is not currently running
    const [isBreak, setIsBreak] = useState(false); //currently in "work mode"
    const [timeLeft, setTimeLeft] = useState(workDuration); // time left starts as minutes of work duration

    const intervalIdRef = useRef(null); //clear interval if new mode begins
    const endTimeRef = useRef(0);

    //runs when isBreak changes
    useEffect(() => {

        if (isRunning) {
            //calculate time when timer should finish
            endTimeRef.current = Date.now() + timeLeft;

            intervalIdRef.current = setInterval(() => {
                const newTimeLeft = endTimeRef.current - Date.now();

            //handle when timer runs out
            if (newTimeLeft <= 0) {
                //switch mode
                setIsBreak(prevIsBreak => {
                    const nextIsBreak = !prevIsBreak;
                    //set new session time depending on nextIsBreak check
                    const nextDuration = nextIsBreak ? breakDuration : workDuration;

                    //update for next round of time
                    endTimeRef.current = Date.now() + nextDuration;
                    setTimeLeft(nextDuration);

                    return nextIsBreak;
                });
            } else {
                setTimeLeft(newTimeLeft);
            }
            }, 1000);
        }

        //clean up
        return () => clearInterval(intervalIdRef.current);

    }, [isRunning, workDuration, breakDuration]);

    function formatTime() {
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60)

        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");

        return `${minutes}:${seconds}`;
    }

    return (
        <div className='timer'>
            <div className="mode-label">
                <p className={isBreak ? "mode-break" : "mode-work"}>WORK</p>
                <p className={isBreak ? "mode-work" : "mode-break"}>BREAK</p>
            </div>
            <div className='time-display'>{formatTime()}</div>
            <div className='controls'>
                <button onClick={() => setIsRunning(prev => !prev)}>
                    {isRunning ? 'pause timer' : 'start timer'}
                </button>
                <button onClick={onHome}>
                    back to home
                </button>
            </div>
        </div>

    );
    
}

export default Timer
