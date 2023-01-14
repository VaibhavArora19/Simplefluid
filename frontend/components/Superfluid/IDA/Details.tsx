import classes from "./Details.module.css";

type IProps = {
    indexId: string | undefined;
    totalUnits: string | undefined;
    approvedUnits: string | undefined;
    pendingUnits: string | undefined;

}

const Details = (props: IProps) => {
    return (
        <div className={classes.details}>
            <div>
                <h1>Index ID</h1>
                <h3>{props.indexId}</h3>
            </div>
            <div>
                <h1>Total Units</h1>
                <h3>{props.totalUnits}</h3>
            </div>
            <div>
                <h1>Units Approved</h1>
                <h3>{props.approvedUnits}</h3>
            </div>
            <div>
                <h1>Units Pending</h1>
                <h3>{props.pendingUnits}</h3>
            </div>
        </div>
    )
};

export default Details;