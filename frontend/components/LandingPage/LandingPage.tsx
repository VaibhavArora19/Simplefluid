import { useRouter } from "next/router";
import classes from "./LandingPage.module.css";

const LandingPage = (): JSX.Element => {
  const router = useRouter();

  const routeHandler = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <div className={classes.landingPage}>
        <div className={classes.details}>
          <h1>
            Easily manage your <br />
            <span>Superfluid</span> streams
          </h1>
          <h4>
            Easily Control all of your streams in one place <br /> and unlock
            the full potential of superfluid <br /> with simplefluid.
          </h4>
          <button className="btn btn-warning btn-wide" onClick={routeHandler}>
            Explore
          </button>
        </div>
        <div className={classes.video}>
          <video src="./superfluid.mp4" loop muted playsInline autoPlay />
        </div>
      </div>
      <div className={classes.description}>
      </div>
    </>
  );
};

export default LandingPage;
