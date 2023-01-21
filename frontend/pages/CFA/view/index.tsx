import ViewStream from "../../../components/Superfluid/CFA/ViewStream";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import styles from "../../../styles/ViewCfa.module.css";

const CFAView = () => {
  const [outgoingStreams, setOutgoingStreams] = useState<Array<any>>([]);
  const [incomingStreams, setIncomingStreams] = useState<Array<any>>([]);
  const [type, setType] = useState<string>("outgoing");
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      (async function () {
        const id = address.toLowerCase();

        const data = await fetch(`https://simplefluid-server.onrender.com/streams/${id}`);

        const res = await data.json();

        let sortedArray = sortArray(res.outgoing);
        setOutgoingStreams(sortedArray);
        let sortArrayIncoming = sortArray(res.incoming);
        setIncomingStreams(sortArrayIncoming);
      })();
    }
  }, [address]);

  function sortArray(arr: Array<any>) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].createdAtTimestamp < arr[j].createdAtTimestamp) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    }
    return arr;
  }

  return (
    <div className={styles.box}>
      <div className={styles.change}>
        <div
          style={{ cursor: "pointer" }}
          className={type === "outgoing" ? styles.active : ""}
          onClick={() => {
            setType("outgoing");
          }}
        >
          <h1>Outgoing</h1>
        </div>
        <div
          style={{ cursor: "pointer" }}
          className={type === "incoming" ? styles.active : ""}
          onClick={() => {
            setType("incoming");
          }}
        >
          <h1>Incoming</h1>
        </div>
      </div>
      <div className={styles.view}>
        <div>
          <h1>Sender/Receiver</h1>
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
      {type === "outgoing" ? outgoingStreams.map((stream, index) => {
        return (
            <>
          <ViewStream
            key={stream.createdAtTimestamp + Math.random()}
            flowRate={stream?.currentFlowRate}
            address={stream.receiver?.id}
            totalFlow={
              stream.receiver?.accountTokenSnapshots[0]
                .totalAmountStreamedInUntilUpdatedAt
            }
            time={stream.createdAtTimestamp}
            type="outgoing"
          />
            </>
        );
      })
      :
      incomingStreams.map((stream, index) => {
        return (
            <>
          <ViewStream
            key={stream.createdAtTimestamp + Math.random()}
            flowRate={stream?.currentFlowRate}
            address={stream.sender?.id}
            totalFlow={
              stream.receiver?.accountTokenSnapshots[0]
                .totalAmountStreamedInUntilUpdatedAt
            }
            time={stream.receiver.createdAtTimestamp}
            type="incoming"
          />
            </>
        );
      })
    }
    </div>
  );
};

export default CFAView;
