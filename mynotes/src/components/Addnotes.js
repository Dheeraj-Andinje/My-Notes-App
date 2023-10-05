
import React, { useContext, useState } from 'react';
import noteContext from '../contex/notes/noteContex';


function Addnotes() {

  const context = useContext(noteContext);
  const { addNote  } = context;
  const [note, setNote] = useState({ Title: "", Description: "", Tag: "" })


  const handleClick = (e) => {
    e.preventDefault();
    
    addNote(note.Title, note.Description, note.Tag);
    setNote({ Title: "", Description: "", Tag: "" })
  }

  const onChange = (e) => {

    setNote({...note, [e.target.name]: e.target.value })

  }

  return (
    <div  className='container border border-primary my-4'style={{backgroundColor:" #63819693"}}>
      <h2>Add a note</h2>

      <form className='my-3'>
        <div className="row mb-3">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="title" name='Title' onChange={onChange} value={note.Title}/>
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="des" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="des" name='Description' onChange={onChange} value={note.Description} />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="tag" name='Tag' onChange={onChange}  value={note.Tag}/>
          </div>
        </div>

        <button type="submit" disabled={(note.Description.length<=5) ||(note.Title.length<=3)} className="btn btn-primary" onClick={handleClick} >ADD</button>


        <div>

        </div>
      </form>

    </div>
  );
}

export default Addnotes;
