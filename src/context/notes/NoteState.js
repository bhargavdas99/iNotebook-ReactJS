import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const userInitial = []
    const [notes, setNotes] = useState(notesInitial);
    const [user, setUser] = useState(userInitial);
    //GET ALL NOTES
    const getUser = async () => {
        // API CALL
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "auth-token": localStorage.getItem('token')
            },

        });

        const json = await response.json();
        //console.log(json);
        setUser(json);
    }
    

    const getNotes = async () => {
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });

        const json = await response.json();
        //console.log(json);
        setNotes(json);
    }

    //ADD A NOTE
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //DELETE A NOTE
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        //console.log(json);
        // console.log("delete kam kar rha h " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }


    //EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
        });
        // const json = await response.json(); // parses JSON response into native JavaScript objects
        //console.log(json);

        // Logic to edit client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, getUser, user }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState