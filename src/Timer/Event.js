import React, { Component } from 'react';

class Event extends Component {
    state={
        datetime: new Date(),
        monthDays:[{'1': 31},{'2': 28},{'3': 31},{'4': 30},{'5': 31},{'6': 30},{'7': 31},{'8': 31},{'9': 30},{'10': 31},{'11': 30},{'12': 31}]
    }

    componentDidMount=()=>{
        this.timerID= setInterval(()=>this.setTime(),1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
      }

    setTime=()=> {
         this.setState({
          datetime: new Date() ,
           h : this.state.datetime.getHours(),
          m : this.state.datetime.getMinutes(),
          s : this.state.datetime.getSeconds()   
        });
      }

       countDown=()=>{
         let totalCDNDays=0,firstdayCDNHrs=0,lastdayCDNHrs=0;
        for(let i= this.state.datetime.getMonth()+1; i<= parseInt(this.state.dateCDNSet.split('-')[1]);i++ )
        {
            if(i===this.state.datetime.getMonth()+1)
            {
                totalCDNDays+=Object.values(this.state.monthDays[i-1])[0] - this.state.datetime.getDate();
            }
            else if(i===parseInt(this.state.dateCDNSet.split('-')[1]))
            {
                totalCDNDays+=parseInt(this.state.dateCDNSet.split('-')[2])
            }
            else
            {
                totalCDNDays+=Object.values(this.state.monthDays[i-1])[0];
            }
        } 
       
        
 /*        this.setState({
            days: this.state.dateCDN.split
        }) */

       // console.log(totalCDNDays);

       let cdnHours=parseInt(this.state.timeCDNSet.split(':')[0])-this.state.h;
       let cdnMinutes=parseInt(this.state.timeCDNSet.split(':')[1])-this.state.m-1;   
       let cdnSeconds = 59-this.state.s;
      
       console.log(cdnMinutes,parseInt(this.state.timeCDNSet.split(':')[1]),this.state.m,this.state.timeCDNSet);

       this.setState({
        cdnHours: cdnHours,
        cdnMinutes: cdnMinutes,
        cdnSeconds: cdnSeconds
    });

      } 

 
   componentDidUpdate=()=>{
       if(this.state.cdnHours===0 && this.state.cdnMinutes===0 && this.state.cdnSeconds===0  )
       clearInterval(this.cdnTimer);
   }

    formSubmitHandler=e=>{
        e.preventDefault();
      //  console.log(e);
      this.cdnTimer=setInterval(()=>this.countDown(),1000);
      //this.countDown();
     
    }

    handleChange=e=>{
       // console.log(e.target, e.target.value);
         this.setState({
            [e.target.name]: e.target.value
          }); 
    }

    render() {
      //  console.log(this.state);
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
                    <input type="submit" value="Start" className="button"/>
                </form>
                <div className="cntdwn">
                    <div>
                        <h5>Days</h5>
                        <h2>TBD</h2>
                    </div>
                    <div>
                        <h5>Hours</h5>
                        <h2>{this.state?.cdnHours??'00'}</h2>
                    </div>
                    <div>
                        <h5>Minutes</h5>
                        <h2>{this.state?.cdnMinutes??'00'}</h2>
                    </div> 
                    <div>
                        <h5>Seconds</h5>
                        <h2>{this.state?.cdnSeconds??'00'}</h2>
                    </div>                    
                </div>
            </div>
        );
    }
}

export default Event;