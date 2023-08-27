import { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("NOTE ADDED SUCCESSFULLY!",'success');

    }
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value}) //{"...note",title:"Title"} means that while changing title, (description and tag ) will remain the same and so on.
    }
    const input_background={
        background:props.mode==='light'?'white':'#35344f',
        color:props.mode==='light'?'black':'yellow',

    }
    return (
        <>
                <h2 style={{color:props.mode==='light'?'black':'yellow'}}>Add a note</h2>
                <form style={{color:props.mode==='light'?'black':'white'}}>
                    <div className="mb-3" >
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" value={note.title}className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={1} required style={input_background}/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={note.description}className="form-control" id="description" name="description" onChange={onChange} minLength={1} required style={input_background}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" value={note.tag}className="form-control" id="tag" name="tag" onChange={onChange} style={input_background}/>
                    </div>
                    
                    <button disabled={note.title.length<1 || note.description.length<1} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                   
                </form>
                <hr />
        
        </>
    )
}

export default Addnote