import React, {useState, useEffect, useRef} from 'react';

function Timer() {

    const [isRunning, setIsRunning] = useState(false); //timer is not currently running
    const [isBreak, setIsBreak] = useState(false); //currently in "work mode"
    const [timeLeft, setTimeLeft] = useState(5 * 60 * 1000); // time left is 5 min (change this soon)

    const intervalIdRef = useRef(null); //clear interval if new mode begins
    const endTimeRef = useRef(0);

    //runs when isBreak changes
    useEffect(() => {

        if (isRunning) {
            //calculate time when timer should finish
            endTimeRef.current = Date.now() + timeLeft;

            intervalIdRef.current = setInterval(() => {
                const newTimeLeft = endTimeRef.current - Date.now();
                setTimeLeft(prev => {
                    if (newTimeLeft <= 0) {
                        clearInterval(intervalIdRef.current);
                        return 0;
                    }
                    return newTimeLeft;
                });
            }, 1000);
        } else {
            clearInterval(intervalIdRef.current);
        }

        //if is break, break label should be highlighted and amt of break time should be passed in to timer

        //if is not break, work label should be highlighted and amt of break time should be passed in to timer

        //if isRunning, update time using setTimeLeft


        //clean up
        return () => clearInterval(intervalIdRef.current);

    }, [isRunning])

    function formatTime() {
        let hours = Math.floor(timeLeft / (1000 * 60 * 60));
        let minutes = Math.floor(timeLeft / (1000 * 60) % 60);
        let seconds = Math.floor(timeLeft / (1000) % 60)

        hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");

        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className='timer'>
            <div className='time-display'>{formatTime()}</div>
            {/* button for temporary purposes */}
            <button onClick={() => setIsRunning(prev => !prev)}>
                {isRunning ? 'Pause' : 'Start'}
            </button>
        </div>

    );
    
}

export default Timer