import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import TimeboxList from './components/TimeboxList'
import Error from './components/Error';

import EditableTimebox from './components/EditableTimebox'



function App () {
    return (
      <div className="App">
      <Error message={"nie działa cała aplikacja"}>
         <TimeboxList/>
         <EditableTimebox/>
      </Error>
      </div>
    )
}


const rootElement = document.getElementById("root");


ReactDOM.render(<App/>, rootElement);
