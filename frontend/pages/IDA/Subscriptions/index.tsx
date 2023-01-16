import ViewSubscriptions from "../../../components/Superfluid/IDA/ViewSubscriptions";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import styles from "../../../styles/Subscriptions.module.css";

const Subscriptions = () => {
    const [subscriptionDetails, setSubscriptionDetails] = useState<Array<any>>();
    const {address} = useAccount();

    useEffect(() => {
        
        (async function() {
            if (address) {
                const id = address.toLowerCase();

                const data = await fetch(`http://localhost:8080/subscriptions/${id}`)
                
                const res = await data.json();
                setSubscriptionDetails(res);
            }
        })();

    }, [address]);

    return (
        <div className={styles.subscriptions}>
            <>
                <div>
                    <h2>Subscriptions</h2>
                </div>
            <div className={styles.subscribe}>
                <div>
                    <h1>Publisher</h1>
                </div>
                <div>
                    <h1>Units</h1>
                </div>
                <div>
                    <h1>Approved</h1>
                </div>
                <div>
                    <h1>Approve/Revoke</h1>
                </div>
            </div>
            {subscriptionDetails && subscriptionDetails.map((subscription) => {
                return <ViewSubscriptions key = {subscription.id} isApproved={subscription.approved} publisher={subscription.index.publisher.id} units={subscription.units} index={subscription.index.indexId}/>
            })
            }
            </>
        </div>
    )
};

export default Subscriptions;