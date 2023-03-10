import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import IdaBar from "../../../components/Superfluid/IDA/IdaBar";
import styles from "../../../styles/IDA.module.css";

const ViewIda = () => {
  const [totalIda, setTotalIda] = useState<Array<object>>([]);
  const { address } = useAccount();

  useEffect(() => {
      if(address) {
        
        (async function () {
        let publisher = address?.toLowerCase();

        const idaArray = await fetch(`https://simplefluid-server.onrender.com/totalindex/${publisher}`);
        const response = await idaArray.json();

        setTotalIda([...response]);
    })();
  }
  }, [address]);

  return (
    <div className={styles.bar}>
      {totalIda.length > 0 ? (
        <>
          <div className={styles.info}>
            <>
              <h1 className={styles.logo}>Created IDA</h1>
            </>
            <div className={styles.top}>
              <div>
                <h3>Index ID</h3>
              </div>
              <div>
                <h3>Units</h3>
              </div>
              <div>
                <h4>Amt. Distributed</h4>
              </div>
            </div>
          </div>
          {totalIda.map(singleIda => {
                // @ts-ignore
              return <IdaBar key ={singleIda.indexId} indexId={singleIda.indexId} units={singleIda.totalUnits} distributed={singleIda.totalAmountDistributedUntilUpdatedAt}/>
          })
          }
        </>
      ) : (
        <>
            <h1 style={{fontSize:"1.4rem"}}>No IDA has been created yet!</h1>
        </>
      )}
    </div>
  );
};

export default ViewIda;
