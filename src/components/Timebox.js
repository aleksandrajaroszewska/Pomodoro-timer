import React from 'react'

function Timebox ({title, totalTimeInMinutes, onDelete, onEdit}) {
   
    return (
        <div className="Timebox">
           <h3> {title} - {totalTimeInMinutes} min. </h3>
           <button onClick={onDelete} > Usuń  </button>
           <button onClick={onEdit} > Edytuj </button>
         </div>
    )
}

export default Timebox