import React from 'react';

 const EventsDisplay=({events,cdnTime})=> {

     const eventsDisplay=()=>{
       return  events?.map(x=>{
           
            return( 
                 <div className='cntdwn-wrapper' key={x.eventName}>
                     <h4>{x?.eventName??''}&nbsp;&nbsp; {x?.date??''}&nbsp;&nbsp; {x?.time===''?'00:00':x.time}</h4>
                     <div className="cntdwn">
                         <div>
                             <h3>Days</h3>
                             <p>{cdnTime[x.eventName]?.cdnDays??'00'}</p>
                         </div>
                         <div>
                             <h3>Hours</h3>
                             <p>{cdnTime[x.eventName]?.cdnHours??'00'}</p>
                         </div>
                         <div>
                             <h3>Minutes</h3>
                             <p>{cdnTime[x.eventName]?.cdnMinutes??'00'}</p>
                         </div> 
                         <div>
                             <h3>Seconds</h3>
                             <p>{cdnTime[x.eventName]?.cdnSeconds??'00'}</p>
                         </div>                    
                     </div>
                     <p className='timer-expired'>{cdnTime[x.eventName]?.timediff<0?'Timer Expired':''}</p>
                 </div>);
           }
         )
     }  

    return (
        <div>
            {eventsDisplay()}
        </div>
    );
}

export default EventsDisplay;