import { ethers } from "ethers";
import classes from "./ViewStream.module.css";

type Iprops = {
    flowRate: string;
    address: string;
    totalFlow: string;
    time: string;
}

const ViewStream = (props: Iprops) => {

    return (
        <div className={classes.view}>
            <div>
                <h1>{props.address.substring(0, 5) + "..." + props.address.substring(37,42)}</h1>
            </div>
            <div className={classes.flow}>
                <h1>{ethers.utils.formatEther(props.totalFlow)}</h1>
            </div>
            <div className={classes.flowRate}>
                <h1>{props.flowRate === "0" ? "--" : props.flowRate}</h1>
            </div>
            <div>
                <h1>{props.time}</h1>
            </div>
            <div>
                <h1>{props.flowRate !== "0" ? "Yes" : "No"}</h1>
            </div>
        </div>
    )
};

export default ViewStream;