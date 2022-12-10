import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navigation from "../Navigation";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function Root() {

useEffect(() => {
    document.title = "NBA Spaces";
}, [])
  return (
    <>
        <Navigation />
        <div className="container">
        

        <Outlet />

        <ToastContainer />
        </div>
    </>
  );
}
