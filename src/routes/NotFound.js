import { useEffect } from "react";


export default function NotFound() {
    useEffect(() => {
        document.title = "Page not found";
    }, [])

  return (
    <div className="404-page">
      <h1>ERROR 404: Page not found</h1>
    </div>
  );
}
