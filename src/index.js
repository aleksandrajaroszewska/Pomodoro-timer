import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import uuid from "uuid";
import Clock from './components/Clock'



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

function TimeboxEditor(props) {
    const {
        title,
        totalTimeInMinutes,
        onTitleChange,
        onTotalTimeInMinutesChange,
        isEditable,
        onConfirm
    } = props;
    return (
        <div className={`TimeboxEditor ${ isEditable ? "" : " inactive"}`}>
            <label>
                Co robisz?
                <input
                    disabled={!isEditable}
                    value={title}
                    onChange={onTitleChange}
                    type="text"
                />
            </label>
            <br />
            <label>
                Ile minut?
                <input
                    disabled={!isEditable}
                    value={totalTimeInMinutes}
                    onChange={onTotalTimeInMinutesChange}
                    type="number" />
            </label>
            <br />
            <button
                onClick={onConfirm}
                disabled={!isEditable}
            >
                Zatwierdź zmiany
            </button>
        </div>
    )
}

 
class CurrentTimebox extends React.Component {
    constructor(props) {
        super(props)
        this.milliseconds = Number(props.totalTimeInMinutes) * 60 * 1000
        this.state = {
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            remainingTime: this.milliseconds
        }
        this.handleStart = this.handleStart.bind(this)
        this.handlePause = this.handlePause.bind(this)
        this.handleStop = this.handleStop.bind(this)
    }
    handleStart(e) {
        this.setState({
            isRunning: true
        })
        this.startTimer()
    }
    handlePause(e) {
        this.setState((prevState) => {
            const { isPaused, pausesCount } = prevState;
            if(isPaused) {
                this.startTimer()
            } else {
                this.stopTimer()
            }
            return ({
                isPaused: !isPaused,
                pausesCount: isPaused ? pausesCount : pausesCount + 1
            })
        })
    }
    handleStop(e) {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            remainingTime: this.milliseconds
        })
       this.stopTimer()
    }
    startTimer() {
        this.lastTimestamp = Date.now()
        this.intervalId = window.setInterval(() => {
            if(this.state.remainingTime <= 0) {
                this.stopTimer()
            } else {
                const currentTimestamp = Date.now();
                const delta = currentTimestamp - this.lastTimestamp;
                this.lastTimestamp = currentTimestamp;
                this.setState((prevState) => {
                    return ({
                        remainingTime: prevState.remainingTime - delta
                    })
                })
            }
        }, 100);
    }
    stopTimer() {
        window.clearInterval(this.intervalId)
    }
    componentWillUnmount() {
        this.stopTimer()
    }
    render() {
        const { isRunning, isPaused, pausesCount, remainingTime } = this.state;
        const { isEditable, onEdit } = this.props;
        return (
            <div className={`CurrentTimebox ${isEditable ? "inactive" : ""}`}>
                <h1>{ this.props.title}</h1>
                <Clock remainingTime={remainingTime} />
                <ProgressBar remaining={remainingTime} total={this.milliseconds} className={isPaused ? "inactive" : ""} />
                <button disabled={isEditable} onClick={onEdit}>Edytuj</button>
                <button disabled={isEditable || isRunning} onClick={this.handleStart}>Start</button>
                <button disabled={isEditable || !isRunning} onClick={this.handleStop}>Stop</button>
                <button disabled={isEditable || !isRunning} onClick={this.handlePause}>{isPaused ? "Wznów" : "Pauzuj"}</button>
                Liczba przerw: {pausesCount}
            </div>
        );
    }
}


class EditableTimebox extends React.Component {
    state = {
        title: "Uczę się o kontrolowanych komponentach",
        totalTimeInMinutes: 15,
        isEditable: true
    }
    onTitleChange(e) {
        this.setState({title: e.target.value})
    }
    onTotalTimeInMinutesChange(e) {
        this.setState({totalTimeInMinutes: e.target.value})
    }
    handleConfirm() {
        this.setState({isEditable: false})
    }
    handleEdit() {
        this.setState({isEditable: true})
    }
    render() {
        const { title, totalTimeInMinutes, isEditable } = this.state;
        return (
            <React.Fragment>
                <TimeboxEditor
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onTitleChange={this.onTitleChange.bind(this)}
                    onTotalTimeInMinutesChange={this.onTotalTimeInMinutesChange.bind(this)}
                    isEditable={isEditable}
                    onConfirm={this.handleConfirm.bind(this)}
                />
                <CurrentTimebox
                    totalTimeInMinutes={totalTimeInMinutes}
                    title={title}
                    key={totalTimeInMinutes}
                    isEditable={isEditable}
                    onEdit={this.handleEdit.bind(this)}
                />
            </React.Fragment>
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
