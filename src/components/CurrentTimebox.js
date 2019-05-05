import React from 'react';
import Clock from './Clock'
import ProgressBar from './ProgressBar'

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

export default CurrentTimebox