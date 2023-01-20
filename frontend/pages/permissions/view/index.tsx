import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import PermissionBar from "../../../components/SuperfluidPermissions/PermissionBar";
import styles from "../../../styles/Permissions.module.css";

const permissionQuery = `
query ($id: ID = "") {
    account(id: $id) {
      createdAtTimestamp
      createdAtBlockNumber
      isSuperApp
      updatedAtBlockNumber
      updatedAtTimestamp
    }
  }
`;

const ViewPermissions = () => {
  const [permission, setPermission] = useState<Array<object>>([]);
  const { address } = useAccount();

  useEffect(() => {
    (async function () {
      if(address) {
      let sender: string = "";
      if (address !== undefined) sender = address.toLowerCase();

      const res = await fetch(`https://simplefluid-server.onrender.com/permissions/${sender}`);

      const data = await res.json();
      setPermission([...data]);
      }
    })();
  }, [address]);
  
  return (
    <div className={styles.view}>
      {permission.length > 0 ? (
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
              return ( singlePermission.permissions !== 0 && <PermissionBar key={index} operatorAddress={singlePermission?.flowOperator} permissions={singlePermission?.permissions} />
              );
            })}
          </>
        </div>
      ) : (
        <div>
          <h1>Loading....</h1>
        </div>
      )}
    </div>
  );
};

export default ViewPermissions;
