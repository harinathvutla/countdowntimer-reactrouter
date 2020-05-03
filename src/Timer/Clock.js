import React, { Component } from 'react';

class Clock extends Component {

  state={
    datetime: new Date(),
}

    // Today Date and Time display logic
    componentDidMount=()=>{
      this.timerID= setInterval(()=>this.setTime(),1000);
  }

  setTime=()=> {
    this.setState({
     datetime: new Date() ,
   });

   this.props.datetime(this.state.datetime);
 }
    
 componentWillUnmount() {
  clearInterval(this.timerID);
}

      render() {
        return (
          <div>
              <h2>Today:   {this.state.datetime.toLocaleDateString()} &nbsp;&nbsp;  {this.state.datetime.toLocaleTimeString()}</h2>
          </div>
        );
      }
}

export default Clock;



  