import { Link, NavLink } from "react-router-dom";

export default function SpaceCard(props) {
  return (
    <div className="col-sm-3">
        {/* {props.conf == "0" ? "" : ""} */}
    <NavLink to={`/teams/${props.space.teamId}/spaces/${props.space.id}`} style={({ isActive }) =>
    isActive
      ? {
          color: `#0d6efd`, textDecoration: "none"
        }
      : { color: '#adb5bd', textDecoration: "none"}
  }>
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{props.space.name}</h5>
    
      </div>
    </div>
    </NavLink>
    </div>
  );
}
