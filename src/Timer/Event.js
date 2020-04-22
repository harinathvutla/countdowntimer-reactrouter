import React, { Component } from 'react';

class Event extends Component {
    state={
        datetime: new Date(),
        monthDays:[{'1': 31},{'2': 28},{'3': 31},{'4': 30},{'5': 31},{'6': 30},{'7': 31},{'8': 31},{'9': 30},{'10': 31},{'11': 30},{'12': 31}],
        eventname: '',
        dateCDNSet: '',
        timeCDNSet: '' 
    }

    // Today Date and Time display logic
    componentDidMount=()=>{
        this.timerID= setInterval(()=>this.setTime(),1000);
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
       countDown=(countDownDate)=>{
       
        let timediff= countDownDate-this.state.datetime.getTime();
        console.log(countDownDate,this.state.datetime.getTime(),timediff);
        // Count down time calculations for days, hours, minutes and seconds
        if(timediff>=0)
        {
            let cdnDays = Math.floor(timediff / (1000 * 60 * 60 * 24));
            let cdnHours = Math.floor((timediff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let cdnMinutes = Math.floor((timediff % (1000 * 60 * 60)) / (1000 * 60));
            let cdnSeconds = Math.floor((timediff % (1000 * 60)) / 1000);

            console.log(cdnDays,cdnHours,cdnMinutes,cdnSeconds);
            this.setState({
            cdnDays:cdnDays,  
            cdnHours: cdnHours,
            cdnMinutes: cdnMinutes,
            cdnSeconds: cdnSeconds,
            timediff: timediff
            });
        }
        else{
            clearInterval(this.cdnTimer);
        }
    } 


    formSubmitHandler=e=>{
        e.preventDefault();
 
        let year= parseInt(this.state.dateCDNSet.split('-')[0]);
        let month= parseInt(this.state.dateCDNSet.split('-')[1]);
        let day= parseInt(this.state.dateCDNSet.split('-')[2]);
        let hours= parseInt((this.state.timeCDNSet!=='')?this.state.timeCDNSet.split(':')[0]:'0');
        let mins=parseInt((this.state.timeCDNSet!=='')?this.state.timeCDNSet.split(':')[1]:'0');

        console.log(year,month,day,hours,mins);
        let countDownDate=new Date(year,month-1,day,hours,mins,0).getTime();
        if((countDownDate-this.state.datetime.getTime())>=0)
        {
            if(this.state.eventname!=='')
            {
                this.cdnTimer=setInterval(()=>this.countDown(countDownDate),1000);
                this.setState({
                    warnMessage: ''
                  });
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
       // console.log(e.target, e.target.value);
         this.setState({
            [e.target.name]: e.target.value
          }); 
    }

    render() {
        console.log(this.state);
       // console.log(this.state.datetime.toLocaleTimeString());
        return (
            <div>
             {/*    <h2>{this.state.time.toLocaleTimeString('de-DE',{ hour: '2-digit', minute: '2-digit', second: '2-digit'})}</h2> */}
              {/*   <h2>{this.state.h}:{this.state.m}:{this.state.s}</h2> */}
        <h2>Today:   {this.state.datetime.toLocaleDateString()} &nbsp;&nbsp;  {this.state.datetime.toLocaleTimeString()}</h2>
                <form onSubmit={this.formSubmitHandler}>
                    <div>
                    <label>Event name: <input className="inputs" type="text" name="eventname" value ={this.state?.eventname??''} onChange={this.handleChange}></input></label>
                    <label>Date: <input className="inputs" type="date" name="dateCDNSet" value ={this.state?.dateCDNSet??''} onChange={this.handleChange}></input> </label>
                    <label>Time: <input className="inputs" type="time" name="timeCDNSet" value ={this.state?.timeCDNSet??''} onChange={this.handleChange}></input> </label>
                    </div>
                    <h4 style={{color:'red'}}>{this.state?.warnMessage??''}</h4>
                    <input type="submit" value="Start" className="button"/>
                </form>
                <div className='cntdwn-center'>
                <div className="cntdwn">
                    <h4>{this.state?.eventname??''} {this.state?.dateCDNSet??''} {this.state?.timeCDNSet??''}</h4>
                    <div>
                        <h3>Days</h3>
                        <p>{this.state?.cdnDays??'00'}</p>
                    </div>
                    <div>
                        <h3>Hours</h3>
                        <p>{this.state?.cdnHours??'00'}</p>
                    </div>
                    <div>
                        <h3>Minutes</h3>
                        <p>{this.state?.cdnMinutes??'00'}</p>
                    </div> 
                    <div>
                        <h3>Seconds</h3>
                        <p>{this.state?.cdnSeconds??'00'}</p>
                    </div>                    
                </div>
                </div>
            </div>
        );
    }
}

export default Event;