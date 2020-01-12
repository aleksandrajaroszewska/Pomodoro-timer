// import React from 'react';

// const Clock = ({ remainingTime }) => {
//     const rjust = (val, placesCount) => {
//         let str = String(val)
//         if(str.length < placesCount) {
//             str = `${(placesCount - str.length) * '0'}${str}`
//         }
//         return str;
//     }
//     const limitRemainingTime = (remainingTime) => {
//         const maxTime = (24 * 60 * 60 * 1000) - 1
//         return Math.min(Math.max(remainingTime, 0), maxTime);
//     }
//     const formatMilliseconds = (remaining) => rjust(Math.floor(remaining % 1000), 3)
//     const formatSeconds = (remaining) => rjust((Math.floor(remaining / 1000) % 60), 2)
//     const formatMinutes = (remaining) => rjust((Math.floor(remaining / (60 * 1000)) % 60), 2)
//     const formatHours = (remaining) => rjust((Math.floor(remaining / (60 * 60 * 1000)) % 24), 2)
//     const remaining = limitRemainingTime(remainingTime)
//     const hours = formatHours(remaining)
//     const minutes = formatMinutes(remaining)
//     const seconds = formatSeconds(remaining)
//     const milliseconds = formatMilliseconds(remaining)
//     return (
//         <h2>{ `Pozostało ${hours}:${minutes}:${seconds}:${milliseconds}` }</h2>
//     )
// }

// export default Clock

import React from "react";
import PropTypes from "prop-types";

function Clock({ className, minutes, seconds }) {
    return <h2 style={{}} className={"Clock  " + className}>Pozostało {minutes}:{seconds}</h2>
}
Clock.defaultProps = {
    className: ""
}
const NumberOrStringType = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
Clock.propTypes = {
    className: PropTypes.string.isRequired,
    minutes: NumberOrStringType.isRequired,
    seconds: NumberOrStringType.isRequired
}

export default Clock;
