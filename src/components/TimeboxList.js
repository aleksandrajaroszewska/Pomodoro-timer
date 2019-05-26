import React from 'react';
import TimeboxCreator from './TimeboxCreator'
import Timebox from './Timebox'
import uuid from "uuid";
import Error from './Error';


class TimeboxList extends React.Component {
    state = {
        timeboxes: [
            { id: uuid.v4(), title: "Uczę się list", totalTimeInMinutes: 25 },
            { id: uuid.v4(), title: "Uczę się formularzy", totalTimeInMinutes: 15 },
            { id: uuid.v4(), title: "Uczę się komponentów niekontrolowanych", totalTimeInMinutes: 5 }
        ],
        hasError:false
    }
   
   

    addTimebox = (timebox) => {
        this.setState(prevState => {
            const timeboxes = [timebox, ...prevState.timeboxes];
            return { timeboxes };
        })
    }
    removeTimebox = (indexToRemove) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
    }
    updateTimebox = (indexToUpdate, updatedTimebox) => {
        this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) => 
                index === indexToUpdate ? updatedTimebox : timebox
            );
            return { timeboxes };
        })
    }
    handleCreate = (createdTimebox) => {
        this.addTimebox(createdTimebox);
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <TimeboxCreator onCreate={this.handleCreate} />
                <Error message ={"coś poszło nie tak :("}>
                {
                    
                this.state.timeboxes.map((timebox, index) => (
                    <Timebox 
                        key={timebox.id}
                        id={timebox.id}
                        title={timebox.title} 
                        totalTimeInMinutes={timebox.totalTimeInMinutes} 
                        onDelete={() => this.removeTimebox(index)}
                        onEdit={(updatedTimebox) => this.updateTimebox(index, updatedTimebox)}
                    />
                ))
                }
                </Error>
            </div>
        )
    }
}





export default TimeboxList