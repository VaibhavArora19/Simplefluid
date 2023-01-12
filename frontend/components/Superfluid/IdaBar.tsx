import classes from "./IdaBar.module.css";

type IProps = {
    indexId: string;
    units: string;
    isDistributed: boolean
};

const IdaBar = (props: IProps) => {
    return (
        <div className={classes.bar}>
            <div>
                <h2>{props.indexId}</h2>
            </div>
            <div>
                <h2>{props.units ? props.units : "-"}</h2>
            </div>
            <div className={`${props.isDistributed ? classes.deposited : classes.pending}`}>
                <h1>{props.isDistributed ? "Approved" : "Pending"}</h1>
            </div>
        </div>
    )
};

export default IdaBar;