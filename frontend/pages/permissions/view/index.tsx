import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import PermissionBar from "../../../components/SuperfluidPermissions/PermissionBar";
import styles from "../../../styles/Permissions.module.css";


const ViewPermissions = () => {
    const [permission, setPermission] = useState<Array<object>>([])
    const {address} = useAccount();

    useEffect(() => {

        (async function(){

            const res = await fetch(`http://localhost:8080/viewPermissions/${address}`);

            const data = await res.json();
            console.log(data);
            setPermission([...data]);
        })();

    }, []);
    return (
        <div className={styles.view}>
            {permission.length > 0 ?
            <div className={styles.info}>
                <>
                <h1>View permissions</h1>
            <div className={styles.top}>
                <div>
                    <h3>Address</h3>
                </div>
                <div>
                    <h3>Permission</h3>
                </div>
                <div>
                    <h4>Revoke</h4>
                </div>
            </div>
            {permission.map((singlePermission, index) => {
                //@ts-ignore
                return <PermissionBar key={index} operatorAddress={singlePermission?.operatorAddress} permissions={singlePermission?.permissions} />
            })}
            </>
            </div>
            :
            <div>
                <h1>Loading....</h1>
            </div>   
            }
        </div>
    )
};

export default ViewPermissions;