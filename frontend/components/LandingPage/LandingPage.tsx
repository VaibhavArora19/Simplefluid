import classes from "./LandingPage.module.css";

const LandingPage = ():JSX.Element => {
    return (
        <div className={classes.landingPage}>
            <div className={classes.details}>
                <h1>Easily manage your <br /><span>Superfluid</span> streams</h1>
                <h4>Easily Control all of your superfluid streams in one place <br /> without any technincal knowledge and experience <br /> the power of web3.</h4>
                <button className="btn btn-warning btn-wide">Explore</button>
            </div>
            <div className={classes.video}>
                <video  src="./superfluid.mp4" loop muted playsInline autoPlay/>
            </div>
        </div>
    )
};

export default LandingPage;