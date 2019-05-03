import React from 'react';

function Clock({className="", minutes = 0, seconds = 0 }) {

  
    const zeroM = minutes < 10 ? "0":"";
    const zeroS = seconds < 10 ? "0":"";
    return <h2 className={`Clock ${className}`}>Pozostało {`${zeroM}${Math.abs(minutes)}:${zeroS}${Math.abs(seconds)}`} </h2>
}

export default Clock
