import React, { useContext,useState, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes(); 
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    
    const handleClick=(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
        props.showAlert("NOTE UPDATED SUCCESSFULLY!","success");
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value}) //{"...note",title:"Title"} means that while changing title, (description and tag ) will remain the same and so on.
    }
    
    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={1} required/>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={1} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                                </div>

                            
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<1 || note.edescription.length<1} className="btn btn-primary" onClick={handleClick}>Save & Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container col-md-9 my-3">
                <Addnote mode={props.mode} showAlert={props.showAlert}/>
                <div className="row my-3">
                    <h2 style={{color:props.mode==='light'?'black':'yellow'}}>All Notes</h2>
                    <div className='container'>
                    {notes.length === 0 && "No Notes Available Yet!"}
                    </div>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} mode={props.mode} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                    })}

                </div>
            </div>
        </>
    )
}

export default Notes