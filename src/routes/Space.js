import { useEffect, useState } from "react";
import { Outlet, useLoaderData, Link, Form, useParams } from "react-router-dom";
import { fetchCommentsForSpace } from "../api";
import Modal from "../Modal";
import "../Space.css";
import "../Modal.css";
import Comments from "../Comments";

export default function Space() {
    const space = useLoaderData();
    const params = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    // useEffect(() => {
    //     document.title = space.team.name + " - " + space.name;
    // }, [])

    function handleSubmit(){
        if(username.length == 0){
            document.querySelector("#space-chat-name").classList.add("is-invalid")
        } else {
            document.querySelector("#space-chat-name").classList.remove("is-invalid")
        }

        if(message.length == 0){
            document.querySelector("#space-chat-msg").classList.add("is-invalid")
        } else {
            document.querySelector("#space-chat-msg").classList.remove("is-invalid")
        }
    }

    useEffect(() => {
        fetchCommentsForSpace(params.spaceId).
        then((response) => {setComments(response);}, error => {
            console.log("error")
          });
    }, [comments])

    return (
        <div className="team-page card">
            <div className="card-header p-4" id="space-header">
                <div className="d-flex">
                    <h4>Space: {space.name}</h4>
                    <button type="button" className="btn btn-outline-warning mx-3" onClick={() => {setIsEditModalOpen(!isEditModalOpen);}}>Edit Space</button>
                </div>
                
                <div className="d-flex">
                    <button type="button" className="btn btn-outline-danger mx-3" onClick={() => {setIsModalOpen(!isModalOpen);}}>Delete Space</button>
                    <Link to={`/teams/${space.teamId}`} style={{ textDecoration: 'none' }} className="close mx-2"><h5>&#10005;</h5></Link>
                </div>
            </div>
            <div className="card-body" >
                <Form method="post" className="d-flex" onSubmit={handleSubmit}> 
                    <div className="form-floating mb-3 me-3" id="modal-body">
                        <input type="text" className="form-control" id="space-chat-name" name="username" placeholder="space chat name" onChange={(event) => {setUsername(event.target.value);}}/>
                        <label htmlFor="space-chat-name">Username</label>
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="space-chat-msg" placeholder="Message" name="chat-message" onChange={(event) => {setMessage(event.target.value);}}/>
                        <button className="btn btn-outline-secondary" type="submit" style={{zIndex:0}}>Send Message</button>
                    </div>
                </Form>

                <Comments comments={comments}/>

            </div>
            
           {isModalOpen && 
           (<Modal 
            space={space} 
            title="Delete this space?"
            submitCaption="Delete Space" 
            onClose={() => {setIsModalOpen(false);}}
            type="danger"
            action="destroy"
            >
                <div className="form-floating mb-3" id="modal-body">
                    <input type="password" className="form-control" id="space-pass-input" name="space-pass" placeholder="space pass"/>
                    <label htmlFor="space-pass-input">Enter Space password to confirm</label>
                </div>
           </Modal>)}

           {isEditModalOpen && 
           (<Modal 
            space={space} 
            type="warning"
            title="Edit space name" 
            submitCaption="Update Space" 
            onClose={() => {setIsEditModalOpen(false);}}
            action="edit"
            >
                <>
                <div className="form-floating mb-3" id="modal-body">
                    <input type="text" className="form-control" id="space-name-input" name="updated-space-name" placeholder="space name"/>
                    <label htmlFor="space-pass-input">Enter new space name</label>
                </div>

                <div className="form-floating mb-3" id="modal-body">
                    <input type="password" className="form-control" id="space-pass-input" name="space-pass" placeholder="space pass"/>
                    <label htmlFor="space-pass-input">Space password to verify</label>
                </div>
                </>
           </Modal>)}

        
        </div>
    );
}
