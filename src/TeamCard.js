import { Link } from "react-router-dom";

export default function TeamCard(props) {
  return (
    <div className="col-sm-3">
        {/* {props.conf == "0" ? "" : ""} */}
    <Link to={`/teams/${props.team.id}`} style={{ textDecoration: 'none' }} className="">
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.team.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
            Conference: {props.team.conference == "0" ? "Eastern" : "Western"}
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">
            Division: {props.team.division}
        </h6>
        {/* <Link to={`/posts/${props.post.id}`} className="card-link">
          Read
        </Link> */}
        {/* <Link to={`/posts/${props.post.id}/edit`}>Edit</Link> */}
      </div>
    </div>
    </Link>
    </div>
  );
}
