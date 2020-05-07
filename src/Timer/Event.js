import React, { Component } from 'react';
import Clock from "./Clock"; 
import Form from "./Form";
import EventsDisplay from './EventsDisplay';

class Event extends Component {
    state={
        events: [],
        cdnTime: {},
        flagStoredEventsDisplay: 0
    }

    // Today Date and Time display logic
    componentDidMount=()=>{
        this.setState({
            events: JSON.parse(localStorage.getItem('events'))??[]
          },()=>{
             if(this.state?.datetime?.getTime()!==undefined){
                this.loadEvents();
            } 
          } );
    }

    datetime=(dt)=>{
        this.setState({
            datetime:dt
        })
    }

    loadEvents=()=>{
        for(let i=0;i < this.state.events.length;i++)
        {
            console.log("le:",this.state.events[i]);
          this.storedEventsDisplay(this.state.events[i],i);
        }
    }

    componentDidUpdate=()=>{
        if(this.state?.datetime!==undefined && this.state.flagStoredEventsDisplay===0)
        {
            this.setState({
                flagStoredEventsDisplay:1
            });
            this.loadEvents();
        }
    } 

    // count down timer logic
       countDown=(countDownDate, eName)=>{
       
       // console.log("eName:",eName);
        let timediff= countDownDate-this.state.datetime.getTime();
       // console.log(countDownDate,this.state.datetime.getTime(),timediff);
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

    storedEventsDisplay=(event,i)=>{
        console.log("sev:",event);
        let year= parseInt(event.date.split('-')[0]);
        let month= parseInt(event.date.split('-')[1]);
        let day= parseInt(event.date.split('-')[2]);
        let hours= parseInt((event.time!=='')?event.time.split(':')[0]:'0');
        let mins=parseInt((event.time!=='')?event.time.split(':')[1]:'0');

      //  console.log(year,month,day,hours,mins);
        let countDownDate=new Date(year,month-1,day,hours,mins,0).getTime();
        console.log(countDownDate,this.state?.datetime?.getTime(),this.state?.datetime);
        if((countDownDate-this.state?.datetime?.getTime())>=0)
        {
            if(event.eventName!=='')
            {
                let cdnTimerID=setInterval(()=>this.countDown(countDownDate,event.eventName),200);
                console.log(event.eventName,cdnTimerID);
                
                  this.setState(
                    {
                    events:  this.state.events.map((obj,index)=>{
                        if(index===i)
                        console.log({...obj,cdnTimerID:cdnTimerID});
                   return  (index===i)? {...obj,cdnTimerID:cdnTimerID}:obj}
                   )                  
                  });               
            }

        }
        else{

            this.setState(prevState =>
                ({
                cdnTime: {...prevState.cdnTime,[event.eventName]:{
                    timediff: -1
                    } }
                }));

        }
     
    }


    updateStateFromForm=(events)=>{
        this.setState({events});
    }


    render() {
    //    console.log(this.state);
        return (
            <div>
               <Clock datetime={this.datetime}/>
                <Form countDown={this.countDown} events={this.state.events} updateStateFromForm={this.updateStateFromForm}/>
                <EventsDisplay events={this.state?.events} cdnTime={this.state?.cdnTime}/>
            </div>
        );
    }
}

export default Event;