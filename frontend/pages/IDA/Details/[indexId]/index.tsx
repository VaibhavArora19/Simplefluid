import Details from "../../../../components/Superfluid/IDA/Details";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import styles from "../../../../styles/IdaDetails.module.css";
import Link from "next/link";

type idaData = {
  indexId: string;
  totalUnits: string;
  totalUnitsApproved: string;
  totalUnitsPending: string;
};

const IDADetails = () => {
  const [idaDetails, setIdaDetails] = useState<idaData>();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const router = useRouter();
  const { address } = useAccount();

  useEffect(() => {
    const id =
      address?.toLowerCase() +
      "-" +
      "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f" +
      "-" +
      router.query.indexId;

    (async function () {
      const res = await fetch(`https://simplefluid-server.onrender.com/index/${id}`);

      const data = await res.json();
      setIdaDetails(data.index);
      setSubscribers(data.index.subscriptions);
      
    })();
  }, [address]);

  return (
    <>
      {idaDetails !== null && (
        <div style={{marginBottom:'5%'}}>
          <Details
            indexId={idaDetails?.indexId}
            totalUnits={idaDetails?.totalUnits}
            approvedUnits={idaDetails?.totalUnitsApproved}
            pendingUnits={idaDetails?.totalUnitsPending}
          />
          <div className={styles.IdaDetails}>
            <div className={styles.heading}>
              <h1>Subscriptions</h1>
            </div>
            <div className={`overflow-x-auto ${styles.table}`}>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Address</th>
                    <th>Units</th>
                    <th>Approved</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber, index) => {
                    return (
                      <tr key={index + 1}>
                        <th>{index + 1}</th>
                        <td>{subscriber?.subscriber?.id}</td>
                        <td>{subscriber?.subscriber?.subscriptions[0].units}</td>
                        <td>{subscriber?.subscriber?.subscriptions[0].approved ? 
                        <div className={styles.true}>
                            <h1><i className="fa-light fa-circle-check"></i></h1>
                        </div>
                        :
                        <div className={styles.false}>
                            <h1><i className="fa-light fa-circle-xmark"></i></h1>
                        </div>
                        }
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <Link href={`/IDA/${router.query.indexId}`} className={`link link-warning ${styles.btn}`}>Update Index</Link>
    </>
  );
};

export default IDADetails;
