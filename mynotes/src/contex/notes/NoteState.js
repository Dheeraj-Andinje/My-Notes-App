
import { useState } from "react";
import NoteContext from "./noteContex";


function NoteState(props) {

  const host = "http://localhost:5000/";
  const [notes, setNotes] = useState([]);
  const [alert, setAlert] = useState({});

  const set_Alert = async (con, type) => {
    setAlert({
      "type": type,
      "content": con,
      "showalert": true
    })
    setTimeout(() => {
      setAlert({
        "type": "",
        "content": "",
        "showalert": ""
      })
    }, 5000);

  }

  const getNotes = async () => {

    //api call
    try {
      const url = `${host}api/notes/getnotes`
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          //  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRiNDE5YTE4MjMxYTFiYTc1OTc5ZjMxIn0sImlhdCI6MTY4OTUyNDg2NH0.mSL5x0zgtPO7hMsGlfMTElFKT30MzsBL-Og5EtydT78"

        },

      });
      const json = await response.json();

      setNotes(json)

    } catch (error) {
      set_Alert(`${error}`, "danger")
    }

  }







  //add note
  const addNote = async (Title, Description, Tag) => {
    //api call
    try {
      const url = `${host}api/notes/addnotes`
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")

        },
        body: JSON.stringify({ Title, Description, Tag })
        // body data type must match "Content-Type" header

      });
      const addnote = await response.json();

      console.log(response.status);
      console.log(response);
      console.log(addnote);
      if (response.status === 200) {
        setNotes([...notes].concat(addnote))
        set_Alert("Note Added", "success")
      }
      else {
        set_Alert("Some error occured ", "danger")
      }
    } catch (error) {
      set_Alert(error, "danger")
    }



  }
  // edit notes
  const editNote = async (Id, Title, Description, Tag) => {
    console.log(Title,Description);
    //api call
    const url = `${host}api/notes/updatenotes/${Id}`
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem("token")

      },
      body: JSON.stringify({Title, Description, Tag }) // body data type must match "Content-Type" header
    });
    const enote = await response.json();


    if (response.status === 200) {
      const newnotes = notes.map((v) => {
        if (v._id === Id) { v = enote }
        return v
      })
      console.log(newnotes);
      setNotes([...newnotes])
      set_Alert("Note Updated Successfuly", "success")
    }
    else {
      console.log(enote);
      set_Alert("Some error occured ", "danger")
    }

  }
  //delete note
  const deleteNote = async (id) => {
    const url = `${host}api/notes/deletenote/${id}`

    //Api call
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
       "auth-token":localStorage.getItem("token")

      },

    });
    // const jsond = await response.json(); 
    if (response.status === 200) {
      const newnote = notes.filter((note) => { return note._id !== id });
      setNotes(newnote);
      set_Alert("Note Deleted Successfuly", "success")
    }
    else {
      set_Alert("Some error occured ", "danger")
    }


  }


  return (
    <NoteContext.Provider value={{ notes, addNote, getNotes, deleteNote, alert, set_Alert, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;