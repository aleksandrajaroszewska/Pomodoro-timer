import React from 'react'



  
class Timebox extends React.Component {
    
    state = {
        titleInput: this.props.title,
        totalTimeInMinutesInput: this.props.totalTimeInMinutes,
        isEditable: false
    }
   


    handleTimeboxEdit = (event) => {
        this.setState({ isEditable: true});
    }
    handleTitleInputChange = (event) => {
        this.setState({ titleInput: event.target.value });
    }
    handleTotalTimeInMinutesInputChange = (event) => {
        this.setState({ totalTimeInMinutesInput: event.target.value });
    }
    
    handleChangesConfirm = (event) => {
        this.props.onEdit({
            id: this.props.id,
            title: (this.state.titleInput === "") ? this.props.title : this.state.titleInput,
            totalTimeInMinutes: (this.state.totalTimeInMinutesInput === "") ? this.props.totalTimeInMinutes : this.state.totalTimeInMinutesInput
        });
       
        this.setState({ isEditable: false });
    }
    handleChangesCancel = (event) => {
       
        this.setState({ 
            titleInput: this.props.title, 
            totalTimeInMinutesInput: this.props.totalTimeInMinutes, 
            isEditable: false 
        });
    }
    render() {
        const { title, totalTimeInMinutes, onDelete } = this.props;
        const { titleInput, totalTimeInMinutesInput, isEditable} = this.state;
        console.log(totalTimeInMinutes);
        if (totalTimeInMinutes <= 0) {
            throw new Error ("całkowity czas musi być większy ni zero");
        }
        return (
            <div className="Timebox">
                <h3>{title} - {totalTimeInMinutes} min.</h3>
                <button onClick={onDelete}>Usuń</button>
                <button onClick={this.handleTimeboxEdit}>Zmień</button>
                <div className={`hiddenTimeboxEditor ${isEditable ? "" : "hidden"}`}>
                    <label>
                        zadanie
                        <input
                            value={titleInput}
                            onChange={this.handleTitleInputChange}
                            type="text"
                        />
                    </label><br />
                    <label>
                         minuty
                        <input 
                            value={totalTimeInMinutesInput}
                            onChange={this.handleTotalTimeInMinutesInputChange}
                            type="number"
                        />
                    </label>
                    <br />
                    <button onClick={this.handleChangesConfirm}>Zatwierdź</button>
                    <button onClick={this.handleChangesCancel}>Anuluj</button>
                </div>
            </div>
        )
    }


}

export default Timebox