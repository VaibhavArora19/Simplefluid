import { ChangeEvent, FormEvent, useState } from "react";
import { permissions } from "../../constants";
import { createOrRevokePermission, authorizeFullControl, revokeFullControl } from "./index";
import Link from "next/link";
import classes from "./PermissionForm.module.css";

const PermissionForm = () => {
  const [operatorAddress, setOperatorAddress] = useState<string>("");
  const [permission, setPermission] = useState<string>("");
  const [flowRate, setFlowRate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const permissionHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setPermission(event.target.value);
  };

  const setPermissionHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (permission === "") return;

    if (operatorAddress.length !== 42) return;
    setLoading(true);

    if (permission !== "Grant Full Control" && permission !== "Revoke Full Control") {
      // @ts-ignore
      const permissionValue = permissions[permission];
      await createOrRevokePermission(flowRate, operatorAddress, Number(permissionValue));
    } else if (permission === "Grant Full Control") {
      await authorizeFullControl(operatorAddress);
    } else if (permission === "Revoke Full Control") {
      await revokeFullControl(operatorAddress);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className={`${classes.form}`}>
        <div>
          <h1>Set Permission</h1>
        </div>
        <form onSubmit={setPermissionHandler}>
          <label>Operator Address</label>
          <input
            type="text"
            className={classes.operator}
            placeholder="Flow Operator Address"
            onChange={(event) => setOperatorAddress(event.target.value)}
            required
          />
          <label>Permissions</label>
          <select className={`select select-ghost max-w-xxl ${classes.select}`} onChange={permissionHandler} required>
            <option disabled selected>
              Choose Permission
            </option>
            <option>Create</option>
            <option>Update</option>
            <option>Delete</option>
            <option>Create or Update</option>
            <option>Create or Delete</option>
            <option>Delete or Update</option>
            <option>Create Update or Delete</option>
            <option>Grant Full Control</option>
            <option>Revoke Full Control</option>
          </select>
          <div className={classes.single}>
            {permission !== "Grant Full Control" && permission !== "Revoke Full Control" && (
              <div className={classes.flowRate}>
                <label>Flow Rate</label>
                <input
                  type="text"
                  className={classes.operator}
                  placeholder="Flow Rate/second"
                  onChange={(event) => setFlowRate(event.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label>Super Token</label>
              <input type="text" placeholder="ETHx" className={`input input-bordered w-full max-w-xs ${classes.token}`} disabled />
            </div>
          </div>
          <button className={`btn btn-warning btn-wide ${loading ? "loading" : ""}`}>{loading ? "Setting Permission" : "Set Permission"}</button>
        </form>
      </div>
      <div style={{ marginTop: "5%", marginLeft: "27%" }}>
        <Link href="/permissions/view" className="link link-warning">
          View permissions
        </Link>
      </div>
    </div>
  );
};

export default PermissionForm;
