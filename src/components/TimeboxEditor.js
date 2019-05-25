import React from 'react';


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
                Zatwierdź zmiany i zacznij
            </button>
        </div>
    )
}

 


export default TimeboxEditor