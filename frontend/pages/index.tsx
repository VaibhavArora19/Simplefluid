import LandingPage from "../components/LandingPage/LandingPage";

import "../styles/Home.module.css";

export default function Home() {

  return (
    <>
     <LandingPage />
     <button className="btn btn-info" data-set-theme="halloween">Dark mode</button>
     <button className="btn btn-info" data-set-theme="emerald">light mode</button>
    </>
  )
}
