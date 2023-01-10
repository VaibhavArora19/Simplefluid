import Idapage from "../../components/Superfluid/IdaIndex";
import { createIndex, updateSubscription, distribute } from "../../components/Superfluid/SuperfluidIDA";
import styles from "../../styles/IDA.module.css";

const createIndexHandler = () => {

    createIndex("1");
};

const updateSubscriptionHandler = () => {
    updateSubscription('1', '', '');
};

const distributeFundsHandler = () => {
    distribute('1', '10')
};

const IDA = () => {
    return (
        <div className={styles.ida}>
            <Idapage />
        </div>
    )
};

export default IDA;