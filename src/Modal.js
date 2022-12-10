import { createPortal } from "react-dom";
import { Form } from "react-router-dom";
import "./Modal.css"

export default function Modal(props){
    return createPortal(
        <>
        <div className="custom-modal-backdrop" onClick={props.onClose} ></div>
        <Form method="post" action={`/spaces/${props.space.id}/${props.action}`} className="custom-modal" id="modal">
            <div className="d-flex justify-content-between" id="modal-header">
                <h3>{props.title}</h3>
                <h3 onClick={props.onClose} className="close">&#10005;</h3>
            </div>

            {props.children}

            <input type="hidden" id="verifyId" name="verifyPass" value={props.space.password} />
            <input type="hidden" id="teamId" name="teamId" value={props.space.teamId} />

            <div id="submitbtn">
                <button type="submit" className={`btn btn-${props.type}`} onSubmit={props.onClose}>
                {props.submitCaption}
            </button>
            </div>
        </Form>
        </>, document.getElementById("modal-container")
    )
}