import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const deleteOnClick=()=>{
        deleteNote(note._id);
        props.showAlert("Note Deleted!","danger")
    }
    return (
        <>  
            <div className="col-md-4 my-3">
            <div className="card" style={{background:props.mode==='light'?'white':'#35344f',color:props.mode==='light'?'black':'white'}}>
                    <div className="card-body">
                        <h6 className="card-title">{note.title}</h6>
                        <p className="card-text">{note.description}</p>                       
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={deleteOnClick}></i>                        
                    </div>
            </div>
            </div>
        </>
    )
}

export default Noteitem