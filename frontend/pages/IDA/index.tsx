import IdaIndex from "../../components/Superfluid/IDA/IdaIndex";
import Link from "next/link";
import styles from "../../styles/IDA.module.css";

const IDA = () => {

    return (
        <div className={styles.ida}>
            <IdaIndex />
            <div className={styles.link}>
                <Link href="/IDA/view" className="link link-warning">View the created IDA</Link>
            </div>
        </div>
    )
};

export default IDA;