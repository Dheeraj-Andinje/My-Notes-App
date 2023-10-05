import React,{useContext} from 'react';
import noteContext from '../contex/notes/noteContex';



function Noteitem(props) {
  const contex= useContext(noteContext);
  const {deleteNote}=contex;

  const { note, updateNote } = props;
  
  return (
    <div className='col-md-3'>
      <div className="card my-3" >
        <div className="card-body ">
          <div className="">
          <h5 className="card-title text-center">{note.Title}</h5>
          
         
          </div>
          <p className="card-text">{note.Description}</p>
          <div className="d-flex justify-content-end">
          <i onClick={()=>{deleteNote(note._id)}} className="fa-solid c-pointer translate-h-r-t fa-trash mx-3"></i> 
          <i onClick={()=>{updateNote(note)}} className="fa-solid c-pointer translate-h-r-t fa-pencil mx-2"></i>
          </div>
          
        </div>
      </div>

    </div>
  );
}

export default Noteitem;


