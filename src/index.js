import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import uuid from "uuid";
import Clock from './components/Clock'



function ProgressBar ({percent,  trackRemaining = false }) {
    const TrackRemaining = trackRemaining ? "TrackRemaining": "";
    
    return (
        <div className={`ProgressBar  ${TrackRemaining}` }>
                <div className="percent">{percent > 0 ? `${Math.floor(percent)}%` : ""}</div> 
                <div className ="bar" style={{width: `${percent}%`}}>   </div>
        </div>
    )
}

function TimeboxEditor (props)  {
    
    const {title, totalTimesInMinutes, onTitleChange, onTotalTimeInMinutesChange, isEditable} = props;
    return (
        <div className= {`TimeboxEditor${isEditable? "inactive" : ""}`}>
            <label>Co robisz? 
               <input  disabled ={false}  value={title} onChange={onTitleChange} type="text"
               />
            </label><br/>
            <label>
            Ile minut? 
              <input disabled ={false}  value = {totalTimesInMinutes} onChange={onTotalTimeInMinutesChange} type="number"/>
            </label><br/>
            <button disabled = {true}>Zacznij</button>
        </div>
        
     )
    
}


 
class CurrentTimebox extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0,
            
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.togglePause = this.togglePause.bind(this)
    }

    handleStart (event) {
        
        this.setState( {
            isRunning: true,
        })
       this.startTimer();
    }

    handleStop (event) { 
        this.setState( { 
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInSeconds: 0
        })
       this.stopTimer();
    }

    startTimer () {
        this.intervalId = window.setInterval(() => {
              this.setState (
                  (prevState) => ({
                    elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
                  })
              )
        }, 100);
    }

    stopTimer () {
        window.clearInterval(this.intervalId)
    }

    togglePause () {
       
        this.setState (
            function(prevState){
                const isPaused= !prevState.isPaused;
                if (isPaused) {
                    this.stopTimer()
                } else {
                    this.startTimer();
                }
                 return {
                     isPaused,
                     pausesCount: isPaused ? prevState.pausesCount +1 : prevState.pausesCount,

               }
            }
        )
    }

     render() {

        const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds} = this.state;
        const {title, totalTimeInMinutes, isEditable} = this.props;
        const totalTimeInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
        const minutesLeft = Math.floor((timeLeftInSeconds/60));
        const secondsLeft =  Math.floor(timeLeftInSeconds%60);
        const progressTime = (elapsedTimeInSeconds / totalTimeInSeconds) *100.0;

        return (
            <div className= {`CurrentTimebox${isEditable? "inactive" : ""}`}>
                <h1>{title}</h1>
                <Clock minutes = {minutesLeft} seconds = {secondsLeft}  className ={isPaused? "inactive" : ""} />
                <ProgressBar percent = {progressTime}  />
                <button onClick ={this.handleStart} disabled={isRunning}>Start</button>
                <button onClick ={this.handleStop} disabled={!isRunning}>Stop</button>
                <button onClick ={this.togglePause}  disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
        )
     
   }
}


class EditableTimebox extends React.Component {
    state = {
        title: "Wpisz co dziś bedziesz robiła",
        totalTimeInMinutes:5
    }
    handleTitleChange = (event) => {
        this.setState({title:event.target.value})
    }
    handleTotalTimeInMinutesChange = (event) => {
        this.setState ({totalTimeInMinutes:event.target.value})
    }
    render(){
        const {title, totalTimeInMinutes} = this.state;
        return (
            <div>
              <br/>
                <TimeboxEditor
                 title={this.state.title}
                 totalTimeInMinutes="5"
                 onTitleChange={this.handleTitleChange}
                 onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange } 
                 />
                <CurrentTimebox title = {title} totalTimeInMinutes={totalTimeInMinutes} isEditable/>
            </div>
        )
    }
}

class TimeboxCreator extends React.Component {

    constructor (props){
        super(props);
        this.titleInput = React.createRef();
        this.totalTimeInMinutesInput = React.createRef();
        this.formInput = React.createRef();
    }

    handleSubmit = (event) => {
       event.preventDefault();
        this.props.onCreate({
                 id:uuid.v4(),
                 title:this.titleInput.current.value,
                 totalTimeInMinutes:this.totalTimeInMinutesInput.current.value
                
            });
           console.log( this.titleInput.current,  this.totalTimeInMinutesInput.current, this.formInput.current.input)
    }
       
    render (){
    return (
        <form  ref = {this.formInput} onSubmit={this.handleSubmit} className="TimeboxCreator">
            <label>
                Co robisz?
                <input 
                     ref={this.totalTimeInMinutesInput}
                     type="text" 
                    
                />
            </label><br/>
            <label>
                Ile minut?
                <input 
                    ref={this.titleInput}
                    onChange={this.handleTotalTimeInMinutesChange}
                  
                />
            </label><br />
            <button 
           
            >Dodaj timebox</button>
        </form>
    )
    }
}

class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: "a", title: "Uczę się list", totalTimeInMinutes: 25 },
            { id: "b", title: "Uczę się formularzy", totalTimeInMinutes: 15 },
            { id: "c", title: "Uczę się komponentów niekontrolowanych", totalTimeInMinutes: 5 },
        ]
    }
    addTimebox = (timebox ) => {
        this.setState (prevState => {
           const timeboxes = [timebox, ...prevState.timeboxes ];
           return {timeboxes}
        })
    }
    removeTimebox = (indexToRemove ) => {
        this.setState (prevState => {
           const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
           return {timeboxes}
        })
    }

    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState (prevState => {
           const timeboxes = prevState.timeboxes.map((timebox, index ) =>
               index === indexToUpdate ? updatedTimebox : timebox
           )
           return {timeboxes}
        })
    }

    handleCreate = (createdTimebox) => {
       this.addTimebox (createdTimebox);
    }

    render() {
        return (
            <div>
                <TimeboxCreator  onCreate={this.handleCreate} />
                {this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                    key={index} 
                    title={timebox.title} 
                    totalTimeInMinutes={timebox.totalTimeInMinutes} 
                    onDelete={()=> this.removeTimebox(index)}
                    onEdit={()=> this.updateTimebox(index, {...timebox, title:"Updated timebox"})}
                   
                    />
                ))}
            </div>
        )
    }
}

function Timebox ({title, totalTimeInMinutes, onDelete, onEdit}) {
   
       return (
           <div className="Timebox">
              <h3> {title} - {totalTimeInMinutes} min. </h3>
              <button onClick={onDelete} > Usuń  </button>
              <button onClick={onEdit} > Edytuj </button>
            </div>
       )
}

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

