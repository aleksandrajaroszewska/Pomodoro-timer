import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import TimeboxList from './components/TimeboxList'

import EditableTimebox from './components/EditableTimebox'



function App () {
    return (
      <div className="App">
         <TimeboxList/>
         <EditableTimebox/>
      </div>
    )
}


const rootElement = document.getElementById("root");


ReactDOM.render(<App/>, rootElement);
