import { Outlet, useLoaderData } from "react-router-dom";
import SpaceCard from "../SpaceCard";

export default function SpacesIndex() {
  const spaces = useLoaderData();

  return (
    <div className="index-page my-3">
      <h3>Spaces</h3>
      <div>
        <div className="row">
            {spaces.map((space) => {
            return <SpaceCard space={space} key={space.id} />;
            })}
        </div>
      </div>
      <Outlet />
    </div>
  );
}
