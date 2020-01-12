// import React from 'react';

// function ProgressBar ( props) {
//     // const TrackRemaining = trackRemaining ? "TrackRemaining": "";
//     const TrackRemaining = "trackRemaining";
//     const percent = 100 - ((props.remaining / props.total) * 100);
   
    
//     return (
//         <div className={`ProgressBar  ${TrackRemaining}` }>
//                  <div className="percent">{percent > 0 ? `${Math.floor(percent)}%` : ""}</div> 
//                 <div className ="bar" style={{ width: `${percent}%` }}></div>
//         </div>
//     )
// }

// export default ProgressBar

import React from "react";
import classNames from "classnames";

function ProgressBar({ className = "", percent = 33, big=false, color = null }) {
    let progressClassName = classNames(
        "progress",
        className,
        {
            "progress--big": big,
            "progress--color-red": color === "red"
        }
    );
    return (
        <div className={progressClassName}>
            <div className="progress__bar" style={{width: `${percent}%`}}></div>
        </div>
    );
}

export default ProgressBar;