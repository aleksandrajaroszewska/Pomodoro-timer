import React from 'react';
import uuid from "uuid";

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

export default TimeboxCreator