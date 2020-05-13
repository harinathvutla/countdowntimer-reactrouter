import React, { Component } from 'react';

class Form extends Component {

    state={
        eventname: '',
        dateCDNSet: '',
        timeCDNSet: '' ,
        events: [],
    }

     componentDidMount=()=>{
        this.setState({
            events:JSON.parse(localStorage.getItem('events'))??[]
        })
    } 

    handleChange=e=>{
        this.setState({
           [e.target.name]: e.target.value
         }); 
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
        if((countDownDate-new Date().getTime())>=0)
        {
            if(this.state.eventname!=='')
            {
                let temp=this.state.eventname;
                let cdnTimerID=setInterval(()=>this.props.countDown(countDownDate,temp),200);

                this.setState({
                    warnMessage: '',
                    events: [...this.state?.events, {eventName: this.state.eventname, date :this.state.dateCDNSet,time:this.state?.timeCDNSet??'00', cdnTimerID}],
                     eventname: '',
                    dateCDNSet: '',
                    timeCDNSet: ''  
                  }, ()=>{
                      console.log(this.state.events);
                  localStorage.setItem('events',JSON.stringify(this.state.events));
                  this.props.eventsUpdate(this.state.events);
                  }
                  );
               
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

    render() {
       // console.log(this.state.events,this.props.events);
        return (
            <div>
                <form onSubmit={this.formSubmitHandler}>
                    <div>
                    <label>Event name: <input className="inputs" type="text" name="eventname" value ={this.state?.eventname??''} onChange={this.handleChange} ></input></label>
                    <label>Date: <input className="inputs" type="date" name="dateCDNSet" value ={this.state?.dateCDNSet??''} onChange={this.handleChange} ></input> </label>
                    <label>Time: <input className="inputs" type="time" name="timeCDNSet" value ={this.state?.timeCDNSet??''} onChange={this.handleChange}></input> </label>
                    </div>
                    <h4 style={{color:'red'}}>{this.state?.warnMessage??''}</h4>
                    <input type="submit" value="Start" className="button"/>
                </form>
            </div>
        );
    }
}

export default Form;