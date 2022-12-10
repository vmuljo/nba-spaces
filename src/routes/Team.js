import { useEffect, useState } from "react";
import { Outlet, useLoaderData, Link } from "react-router-dom";
import CreateSpaceModal from "./CreateSpaceModal";

export default function Team() {
    const team = useLoaderData();
    // console.log(team);

    useEffect(() => {
        document.title = team.name;
    })

    return (
        <div className="team-page">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h1>{team.name}</h1>
                    <h4>{team.conference == "0" ? "Eastern" : "Western"} Conference : {team.division} Division</h4>
                    <h5></h5>
                </div>

                <div className="buttons">
                <Link to={`/teams/${team.id}/createspaces`} className="">
                    <button type="button" className="btn btn-outline-primary" >Create Space</button>
                </Link>
                </div>
            </div>
            

        {/* //   {modalOpen && (<CreateSpaceModal onClose={() => {setModalOpen(false);}}/>)} */}

        <Outlet />
        </div>
    );
}
