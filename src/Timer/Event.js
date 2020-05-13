import React, { Component } from 'react';
/* import Form from "./Form"; */
import EventsDisplay from './EventsDisplay';

class Event extends Component {
    state={
        events: [],
        cdnTime: {},
     //   flagStoredEventsDisplay: 0
    }

    // Today Date and Time display logic
    componentDidMount=()=>{
        this.setState({
            events: JSON.parse(localStorage.getItem('events'))??[]
          },()=>{
                this.loadEvents();
                this.props.eventsUpdate(this.state?.events);
          } );
    }

    loadEvents=()=>{
        for(let i=0;i < this.state.events.length;i++)
        {
            console.log("le:",this.state.events[i]);
          this.storedEventsDisplay(this.state.events[i],i);
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
        console.log(countDownDate,new Date().getTime(),new Date());
        if((countDownDate-new Date().getTime())>=0)
        {
            if(event.eventName!=='')
            {
                let cdnTimerID=setInterval(()=>this.props.countDown(countDownDate,event.eventName),200);
                console.log(event.eventName,cdnTimerID);
                
                  this.setState(
                    {
                    events:  this.state.events.map((obj,index)=>{
                        if(index===i)
                        console.log({...obj,cdnTimerID:cdnTimerID});
                   return  (index===i)? {...obj,cdnTimerID:cdnTimerID}:obj}
                   )                  
                  }, ()=>{this.props.eventsUpdate(this.state?.events);});     
                  
            }

        }
        else{

            this.setState(
                {
                cdnTime: {...this.state.cdnTime,[event.eventName]:{
                    timediff: -1
                    } }
                },()=>{this.props.cdnTimeUpdate(this.state?.cdnTime);});

        }
     
    }


    updateStateFromForm=(events)=>{
        this.setState({events});
    }


    render() {
    //    console.log(this.state);
        return (
            <div>
                {/* <Form countDown={this.countDown} events={this.state.events} updateStateFromForm={this.updateStateFromForm}/> */}
                 <EventsDisplay events={this.state?.events} cdnTime={this.props?.cdnTime}/> 
            </div>
        );
    }
}

export default Event;