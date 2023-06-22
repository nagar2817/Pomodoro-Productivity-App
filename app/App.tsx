"use client"

import {memo,useEffect,useContext} from 'react';
import Header from '../components/NavbarNew'
import Clock from '../components/MainTask/Clock';
import {PomoContext} from '../context/PomodoroContext';
import ButtonComponent from '../components/MainTask/Button'
import Todo from '../components/Todo';

const App = () => {
  
  return (
    <>
   <Header />
    <Clock  /> 
    <Todo/>
    </>
  )
}

export default memo(App);
