import { Form, Link, useLoaderData } from "react-router-dom";
import "../Modal.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export default function CreateSpaceModal() {
  const team = useLoaderData();
  const [spaceName, setSpaceName] = useState("");
  const [spacePassword, setSpacePassword] = useState("");
  // console.log(team);
    function handleSubmit(){
      if(spaceName.length == 0){
          document.querySelector("#space-name-input").classList.add("is-invalid")
      } else {
          document.querySelector("#space-name-input").classList.remove("is-invalid")
      }

      if(spacePassword.length == 0){
          document.querySelector("#space-pass-input").classList.add("is-invalid")
      } else {
          document.querySelector("#space-pass-input").classList.remove("is-invalid")
      }
  }
  useEffect(()=>{
    document.title = "Create Space";
  })

  return createPortal(
    <div className="CreateSpaceModal">
    <Link to={`/teams/${team.id}`} style={{ textDecoration: 'none' }}><div className="custom-modal-backdrop"></div></Link>
    <Form method="post" className="custom-modal" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between" id="modal-header">
        <h3>Start a new Space</h3>
        <Link to={`/teams/${team.id}`} style={{ textDecoration: 'none' }} className="close"><h3>&#10005;</h3></Link>
      </div>
      
      <div className="form-floating mb-3" id="modal-body">
        <input type="text" className="form-control" id="space-name-input" name="space-name" placeholder="space name" onChange={(event) => {setSpaceName(event.target.value);}}/>
        <label htmlFor="space-name-input">Space name</label>
      </div>
      <div className="form-floating mb-3" id="modal-body">
        <input type="password" className="form-control" id="space-pass-input" name="space-pass" placeholder="space pass" onChange={(event) => {setSpacePassword(event.target.value);}}/>
        <label htmlFor="space-pass-input">Set Space Password</label>
      </div>
      <div id="submitbtn">
        <button type="submit" className="btn btn-primary">
        Create Space
      </button>
      </div>
    </Form>
    </div>, document.getElementById("createSpaces-modal-container")
  );
}
