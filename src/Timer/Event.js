import React, { Component } from 'react';

class Event extends Component {
    state={
        datetime: new Date(),
        monthDays:[{'1': 31},{'2': 28},{'3': 31},{'4': 30},{'5': 31},{'6': 30},{'7': 31},{'8': 31},{'9': 30},{'10': 31},{'11': 30},{'12': 31}],
        eventname: '',
        dateCDNSet: '',
        timeCDNSet: '' ,
        events: [],
        cdnTime: []
    }

    // Today Date and Time display logic
    componentDidMount=()=>{
        this.timerID= setInterval(()=>this.setTime(),1000);
        this.setState({
            events: JSON.parse(localStorage.getItem('events'))??[]
          },()=>{
              for(let i=0;i < this.state.events.length;i++)
              {
                  console.log("le:",this.state.events[i]);
                this.storedEventsDisplay(this.state.events[i],i);
              }
          } );
    }

    setTime=()=> {
        this.setState({
         datetime: new Date() ,
          h : this.state.datetime.getHours(),
         m : this.state.datetime.getMinutes(),
         s : this.state.datetime.getSeconds()   
       });
     }

    componentWillUnmount() {
        clearInterval(this.timerID);
      }


    // count down timer logic
       countDown=(countDownDate, eName)=>{
       
        console.log("eName:",eName);
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

        console.log(year,month,day,hours,mins);
        let countDownDate=new Date(year,month-1,day,hours,mins,0).getTime();
        if((countDownDate-this.state.datetime.getTime())>=0)
        {
            if(event.eventName!=='')
            {
                let cdnTimerID=setInterval(()=>this.countDown(countDownDate,event.eventName),200);

                this.setState(prevState=>({
                    events: [...prevState.events, {...prevState.events[i], cdnTimerID}]
                  },()=> console.log(this.state.events)));    
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

       // console.log(year,month,day,hours,mins);
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
                    <h4>{x?.eventName??''}&nbsp;&nbsp; {x?.date??''}&nbsp;&nbsp; {x?.time??''}</h4>
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
     //   console.log(this.state);
       // console.log(this.state.datetime.toLocaleTimeString());
        return (
            <div>
                <h2>Today:   {this.state.datetime.toLocaleDateString()} &nbsp;&nbsp;  {this.state.datetime.toLocaleTimeString()}</h2>
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