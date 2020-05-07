import React, { Component } from 'react';

class Clock extends Component {

    // Today Date and Time display logic
    componentDidMount=()=>{
      this.timerID= setInterval(()=>this.setTime(),200);
  }

  setTime=()=> {
    this.datetime=new Date();
    this.props.datetime(this.datetime);
  }
    
 componentWillUnmount() {
  clearInterval(this.timerID);
  }

  render() {
    return (
          <div>
              <h2>Today:   {this.datetime?.toLocaleDateString?.()} &nbsp;&nbsp;  {this.datetime?.toLocaleTimeString?.()}</h2>
          </div>
          );
        }
}

export default Clock;



  