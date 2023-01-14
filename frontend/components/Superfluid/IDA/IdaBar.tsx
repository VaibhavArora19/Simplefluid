import { useRouter } from "next/router";
import classes from "./IdaBar.module.css";

type IProps = {
    indexId: string;
    units: string;
    isDistributed: boolean
};

const IdaBar = (props: IProps) => {
    const router = useRouter();

    return (
        <div className={classes.bar} onClick={() => {router.push(`/IDA/Details/${props.indexId}`)}}>
            <div className={classes.index}>
                <h2>{props.indexId}</h2>
            </div>
            <div  className={classes.units}>
                <h2>{props.units ? props.units : "-"}</h2>
            </div>
            <div className={classes.deposited}>
                <h1>{"Approved"}</h1>
            </div>
        </div>
    )
};

export default IdaBar;