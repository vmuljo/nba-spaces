import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import TeamCard from "../TeamCard";

export default function Index() {
  const teams = useLoaderData();

  useEffect(() => {
    document.title = "NBA Spaces"
  }, [])

  return (
    <div className="index-page">
      <h1>Teams</h1>
      <div>
        <div className="row">
            {teams.map((team) => {
            return <TeamCard team={team} key={team.id} />;
            })}
        </div>
      </div>
    </div>
  );
}
