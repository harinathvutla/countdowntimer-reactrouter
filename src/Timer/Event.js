import React, { Component } from 'react';
import Clock from "./Clock"; 

class Event extends Component {
    state={
  
        eventname: '',
        dateCDNSet: '',
        timeCDNSet: '' ,
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

  // handle submit
    formSubmitHandler=e=>{
        e.preventDefault();
 
        let year= parseInt(this.state.dateCDNSet.split('-')[0]);
        let month= parseInt(this.state.dateCDNSet.split('-')[1]);
        let day= parseInt(this.state.dateCDNSet.split('-')[2]);
        let hours= parseInt((this.state.timeCDNSet!=='')?this.state.timeCDNSet.split(':')[0]:'0');
        let mins=parseInt((this.state.timeCDNSet!=='')?this.state.timeCDNSet.split(':')[1]:'0');

        let countDownDate=new Date(year,month-1,day,hours,mins,0).getTime();
        if((countDownDate-this.state.datetime.getTime())>=0)
        {
            if(this.state.eventname!=='')
            {
                let temp=this.state.eventname;
                let cdnTimerID=setInterval(()=>this.countDown(countDownDate,temp),200);

                this.setState({
                    warnMessage: '',
                    events: [...this.state?.events, {eventName: this.state.eventname, date :this.state.dateCDNSet,time:this.state?.timeCDNSet??'00', cdnTimerID}],
                     eventname: '',
                    dateCDNSet: '',
                    timeCDNSet: ''  
                  }, ()=>localStorage.setItem('events',JSON.stringify(this.state.events)));
               
            }
            else
            {
                this.setState({
                    warnMessage: 'Event name cannot be blank!'
                  });               
            }

        }
        else
        {
            if(this.state.eventname!=='')
            {
                this.setState({
                    warnMessage: 'Please enter the date and time correctly! '
                });
            }
            else
            {
                this.setState({
                    warnMessage: 'Event name cannot be blank and Please enter the date and time correctly! '
                });
            }

        }
     
    }

    handleChange=e=>{
         this.setState({
            [e.target.name]: e.target.value
          }); 
    }


    eventsDisplay=()=>{
      return  this.state?.events?.map(x=>{
           return( 
                <div className='cntdwn-wrapper' key={x.eventName}>
                    <h4>{x?.eventName??''}&nbsp;&nbsp; {x?.date??''}&nbsp;&nbsp; {x?.time===''?'00:00':x.time}</h4>
                    <div className="cntdwn">
                        <div>
                            <h3>Days</h3>
                            <p>{this.state?.cdnTime[x.eventName]?.cdnDays??'00'}</p>
                        </div>
                        <div>
                            <h3>Hours</h3>
                            <p>{this.state?.cdnTime[x.eventName]?.cdnHours??'00'}</p>
                        </div>
                        <div>
                            <h3>Minutes</h3>
                            <p>{this.state?.cdnTime[x.eventName]?.cdnMinutes??'00'}</p>
                        </div> 
                        <div>
                            <h3>Seconds</h3>
                            <p>{this.state?.cdnTime[x.eventName]?.cdnSeconds??'00'}</p>
                        </div>                    
                    </div>
                    <p className='timer-expired'>{this.state?.cdnTime[x.eventName]?.timediff<0?'Timer Expired':''}</p>
                </div>);
        })
    } 


    render() {
    //    console.log(this.state);
        return (
            <div>
               <Clock datetime={this.datetime}/>
                <form onSubmit={this.formSubmitHandler}>
                    <div>
                    <label>Event name: <input className="inputs" type="text" name="eventname" value ={this.state?.eventname??''} onChange={this.handleChange} ></input></label>
                    <label>Date: <input className="inputs" type="date" name="dateCDNSet" value ={this.state?.dateCDNSet??''} onChange={this.handleChange} ></input> </label>
                    <label>Time: <input className="inputs" type="time" name="timeCDNSet" value ={this.state?.timeCDNSet??''} onChange={this.handleChange}></input> </label>
                    </div>
                    <h4 style={{color:'red'}}>{this.state?.warnMessage??''}</h4>
                    <input type="submit" value="Start" className="button"/>
                </form>
                 {this.eventsDisplay()} 
            </div>
        );
    }
}

export default Event;