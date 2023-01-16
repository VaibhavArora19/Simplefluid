import ViewStream from "../../../components/Superfluid/CFA/ViewStream";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import styles from "../../../styles/ViewCfa.module.css";

const CFAView = () => {
    const [outgoingStreams, setOutgoingStreams] = useState<Array<any>>([]);
    const [incomingStreams, setIncomingStreams] = useState<Array<any>>([]);
    const { address } = useAccount();

    useEffect(() => {

        if(address) {
            (async function() {

                const id = address.toLowerCase();

                const data = await fetch(`http://localhost:8080/streams/${id}`);

                const res = await data.json();

                console.log('res is', res.outgoing);
                setOutgoingStreams(res.outgoing);
            })();
        }

    }, [address]);

    return (
        <div className={styles.box}>
            <div className={styles.change}>
                <div className={styles.active}>
                    <h1>Outgoing</h1>
                </div>
                <div>
                    <h1>Incoming</h1>
                </div>
            </div>
            <div className={styles.view}>
                <div>
                    <h1>Sender</h1>
                </div>
                <div>
                    <h1>All Time Flow</h1>
                </div>
                <div>
                    <h1>Flow Rate</h1>
                </div>
                <div>
                    <h1>Started At</h1>
                </div>
                <div>
                    <h1>Is Ongoing</h1>
                </div>
            </div>
            { outgoingStreams.map((stream, index) => {
               return <ViewStream key={stream.createdAtTimestamp + Math.random()} flowRate={stream?.currentFlowRate} address={stream.receiver?.id} totalFlow={stream.receiver?.accountTokenSnapshots[0].totalAmountStreamedInUntilUpdatedAt} time={stream.createdAtTimestamp}/>
            })
            }
        </div>
    )
};

export default CFAView;