import React from 'react';
import './App.css';
import Event from "./Timer/Event"
/* import Clock from "./Timer/Clock" */

function App() {
  return (
    <div className="App">
      <div className="heading">
        <h1>Countdown&nbsp;&nbsp;</h1>
        <h1 className="t-rotate">T</h1>
        <h1>&nbsp;imer</h1>
    </div>
      
         <Event/> 
       {/*  <Clock></Clock> */}
    </div>
  );
}

export default App;
