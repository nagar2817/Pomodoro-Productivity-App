import {useContext, memo,useEffect} from 'react';
import ButtonComponent from './Button';
import CountdownAnimation from './CountdownAnimation';
import { PomoContext } from '../../context/PomodoroContext';
const Clock = ( )=>{
    const {
        pomodoro,
        executing,
        startAnimate,
        Clock_children,
        startTimer,
        pauseTimer,
        updateExecute,
        setCurrentTimer,
         } = useContext(PomoContext)
    
        useEffect(() => {updateExecute(executing)}, [executing, startAnimate])

    return (
        <div className="container">
        <ul className="labels">
          <li>
            <ButtonComponent 
              title="Work" 
              activeClass={executing.active === 'work' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('work')} 
            />
          </li>
          <li>
            <ButtonComponent 
              title="Short Break" 
              activeClass={executing.active === 'short' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('short')} 
            />
          </li>
          <li>
            <ButtonComponent 
              title="Long Break" 
              activeClass={executing.active === 'long' ? 'active-label' : undefined} 
              _callback={() => setCurrentTimer('long')} 
            />
          </li>
        </ul>
        <div className="timer-container">
          <div className="time-wrapper">
              <CountdownAnimation
                key={pomodoro} 
                timer={pomodoro} 
                animate={startAnimate} 
              >
                {Clock_children}
              </CountdownAnimation>
          </div>
        </div>
        <div className="button-wrapper">
          <ButtonComponent title="Start" activeClass={!startAnimate ? 'active' : undefined} _callback={startTimer} />
          <ButtonComponent title="Pause" activeClass={startAnimate ? 'active' : undefined} _callback={pauseTimer} />
        </div> 
    </div>
    )
    
}

export default memo(Clock);