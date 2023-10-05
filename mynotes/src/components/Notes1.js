import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import noteContext from '../contex/notes/noteContex';
import Noteitem from './Noteitem';



function Notes1() {
  const navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(!!token);
    console.log(token);
    if (localStorage.getItem('token')) {
      console.log('get notes');
      getNotes();
    } else {
      console.log('log in');
      navigate('/login')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

  const updateNote = (currentnote) => {

    setNote({ id: currentnote._id, etitle: currentnote.Title, edescription: currentnote.Description, etag: currentnote.Tag })

    ref.current.click();

  }


  const ref = useRef(null)
  const refclose = useRef(null)


  const handleClick = async (e) => {

    document.getElementById("updatebtn").innerHTML = `<div class="spinner-border mt-1" style="height:25px; width:25px;" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`


    console.log("updating note " + note.etitle);
    await editNote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click();
    document.getElementById("updatebtn").innerText = "Update Note"

  }

  const onChange = (e) => {

    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ marginTop: "18vh",backgroundColor:" #63819693" }} className='container border border-primary'>
      {/* <!-- Button trigger modal --> */}
      <button type="button" style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">

      </button>


      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="row mb-3">
                  <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="title" name='etitle' value={note.etitle} onChange={onChange} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="des" className="col-sm-2 col-form-label">Description</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="des" name='edescription' value={note.edescription} onChange={onChange} />
                  </div>
                </div>

                <div className="row mb-3">
                  <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="tag" name='etag' value={note.etag} onChange={onChange} />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" id='updatebtn' onClick={handleClick} disabled={(note.edescription.length <= 5) || (note.etitle.length <= 3)} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row   my-3' >
        <h2>Your Notes</h2>

        <div className='container'>

          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          // return note.Title;
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </div>
  );
}

export default Notes1;
