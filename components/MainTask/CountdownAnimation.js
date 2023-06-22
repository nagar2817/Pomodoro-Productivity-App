import { useContext,memo } from 'react'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import { PomoContext } from '../../context/PomodoroContext'
const CountdownAnimation = ({key, timer, animate, children}) => {

  const { stopAimate } = useContext(PomoContext)
  const get_colors  = (timer)=>{
    if(timer===25){
      return [1500,1350,900,450,0] 
    }
    else if(timer === 10){
         return [600,540,360,180,0]
    }
    else if(timer===5){
      return [300,270,180,90,0]

    }
return [1,0.5,0.4,,0.3,0];
  }
    return (
      <CountdownCircleTimer
        key={key}
        isPlaying={animate}
        duration={timer*60}
        colors={["#004777", "#F7B801", "#A30000",,"004777", "#A30000"]}
        colorsTime={get_colors()}
        strokeWidth={10}
        size={240}
        trailColor="#151932"
        onComplete={ () => {
          stopAimate()
        }}
      >
        {children}
      </CountdownCircleTimer>
    )
}

export default memo(CountdownAnimation);