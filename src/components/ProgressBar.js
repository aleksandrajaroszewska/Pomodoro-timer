import React from 'react';

function ProgressBar ( props) {
    // const TrackRemaining = trackRemaining ? "TrackRemaining": "";
    const TrackRemaining = "trackRemaining";
    const percent = 100 - ((props.remaining / props.total) * 100);
   
    
    return (
        <div className={`ProgressBar  ${TrackRemaining}` }>
                 <div className="percent">{percent > 0 ? `${Math.floor(percent)}%` : ""}</div> 
                <div className ="bar" style={{ width: `${percent}%` }}></div>
        </div>
    )
}

export default ProgressBar