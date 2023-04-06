import React, { useState } from 'react'

export const Form = () => {

    const [text, setText] = useState('')
    const [file, setFile] = useState('')

    const handleText = (event) => {
        setText(event.target.value);
    }

    const handleFile = (event) => {
        setFile(event.target.files[0].name);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('submitted values: ' + text + " & " + file);
    }


    return (
        <form onSubmit={handleSubmit} style={{ paddingTop: '50px' }}>
            <div>
                <label >Text input: </label>

                <input type="text" onChange={(e) => { handleText(e) }} />

            </div>
            <br></br>

            <div>
                <label >File input: </label>

                <input type="file" onChange={(e) => { handleFile(e) }} />

            </div>
            <br></br>

            <input type="submit" value="Submit" />
        </form >
    );
}
