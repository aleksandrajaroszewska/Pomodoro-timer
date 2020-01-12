import React, {Fragment} from "react";

import Timebox from "./Timebox";
import TimeboxCreator from "./TimeboxCreator";
import uuid from "uuid";
import TimeboxesAPI from "../API/FetchTimeboxesApi"





class TimeboxList extends React.Component {
    state = {
        "timeboxes": [],
        loading: true,
        error: null
    }

    componentDidMount() {
        console.log(uuid.v4());
        
        TimeboxesAPI.getAllTimeboxes().then(
            (timeboxes) => this.setState({timeboxes})
        ).catch(
            (error) => Promise.reject(this.setState({error}))
        ).finally (
            () => this.setState({loading:false})
        )
    }
    
    addTimebox = (timebox) => {
        TimeboxesAPI.addTimebox(timebox).then(
            (addedTimebox) =>  this.setState(prevState => {
            const timeboxes = [ ...prevState.timeboxes, addedTimebox];
            return { timeboxes };
        })
        )

    }
    removeTimebox = (indexToRemove) => {
        TimeboxesAPI.removeTimebox(this.state.timeboxes[indexToRemove])
        .then (
        () => this.setState(prevState => {
            const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
            return { timeboxes };
        })
        )
        
    }
    updateTimebox = (indexToUpdate, timeboxToUpdate) => {
        TimeboxesAPI.replaceTimebox(timeboxToUpdate)
        .then(
        (updatedTimebox) => this.setState(prevState => {
            const timeboxes = prevState.timeboxes.map((timebox, index) =>
                index === indexToUpdate ? updatedTimebox : timebox
            )
            return { timeboxes };
        })
        )
    }

    handleCreate = (createdTimebox) => {
        try {
            this.addTimebox(createdTimebox);
        } catch (error) {
            console.log("Jest błąd przy tworzeniu timeboxa:", error)
        }
        
    }
    render() {
        return (
            <Fragment>
                <TimeboxCreator onCreate={this.handleCreate} />
                {this.state.loading ? "timeboxy się ładują" : null}
                {this.state.error ? "nie udało się załadować " : null}
                {
                    this.state.timeboxes.map((timebox, index) => (
                        <Timebox 
                            key={timebox.id} 
                            title={timebox.title} 
                            totalTimeInMinutes={timebox.totalTimeInMinutes}
                            onDelete={() => this.removeTimebox(index)}
                            onEdit={() => this.updateTimebox(index, {...timebox, title: "Updated timebox"})}
                        />
                    ))
                }
            </Fragment>
        )
    }
}

export default TimeboxList;
