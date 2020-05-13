import React, { Component } from 'react';
import './App.css';
import Event from "./Timer/Event";
import Headline from "./Timer/Headline";
import Form from "./Timer/Form";
import NavBar from "./NavBar";
import Clock  from "./Timer/Clock"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";



class App extends Component {

  state={
    events: [],
    cdnTime: {},
  }
      // count down timer logic
      countDown=(countDownDate, eName)=>{
       
        // console.log("eName:",eName);
         let timediff= countDownDate-new Date().getTime();
         // Count down time calculations for days, hours, minutes and seconds
         if(timediff>=0)
         {
             let cdnDays = Math.floor(timediff / (1000 * 60 * 60 * 24));
             let cdnHours = Math.floor((timediff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
             let cdnMinutes = Math.floor((timediff % (1000 * 60 * 60)) / (1000 * 60));
             let cdnSeconds = Math.floor((timediff % (1000 * 60)) / 1000);
        //     console.log(cdnDays,cdnHours,cdnMinutes,cdnSeconds);
             this.setState(prevState =>
                 ({
                 cdnTime: {...prevState.cdnTime,[eName]:{
                     cdnDays:cdnDays,  
                     cdnHours: cdnHours,
                     cdnMinutes: cdnMinutes,
                     cdnSeconds: cdnSeconds,
                     } }
                 }));
         }
         else{
             clearInterval(this.state.events.filter(x=>x.eventName===eName)[0].cdnTimerID);
             this.setState(prevState =>
                 ({
                 cdnTime: {...prevState.cdnTime,[eName]:{
                     ...prevState.cdnTime[eName],timediff: timediff
                     } }
                 }));
         }
     } 

   eventsUpdate = e => {
    console.log('e',e);
    this.setState({events:e});
  }

   cdnTimeUpdate=(c)=>{
    console.log('c',c);
    this.setState({cdnTime:c});
   
  }

  render() {
    return (
      <div className="App"> 
        <Headline/>
        <Clock/>
        <NavBar></NavBar>

        <Switch>
          <Route path="/" exact render={(props) => <Event {...props} cdnTime={this.state.cdnTime} countDown={this.countDown} eventsUpdate={this.eventsUpdate} cdnTimeUpdate={this.cdnTimeUpdate} />} />
          <Route path="/setTimer" exact render={(props) => <Form {...props} countDown={this.countDown} events={this.state?.events} eventsUpdate={this.eventsUpdate} />} />
        </Switch>

      </div>
    );
  }
}

export default App;

