import classes from "./PermissionForm.module.css";

const PermissionForm = () => {
  return (
    <div className={`${classes.form}`}>
     <div className={classes.heading}>
      <h1>Set Permission</h1>
     </div>
      <label>Operator Address</label>
      <input
        type="text"
        className={classes.operator}
        placeholder="Flow Operator Address"
      />
      <label>Permissions</label>
      <select className={`select select-ghost max-w-xxl ${classes.select}`}>
        <option disabled selected>Choose Permission</option>
        <option>Create</option>
        <option>Update</option>
        <option>Delete</option>
        <option>Create and Update</option>
        <option>Create and Delete</option>
        <option>Update and Delete</option>
        <option>Create Update and Delete</option>
        <option>Grant Full Access</option>
        <option>Revoke Full Access</option>
        </select>
        <div className={classes.single}>
        <div className={classes.flowRate}>
        <label>Flow Rate</label>
        <input
        type="text"
        className={classes.operator}
        placeholder="Flow Rate/second"
        />
        </div>
        <div>
        <label>Super Token</label>
        <input type="text" placeholder="fDAIx" className={`input input-bordered w-full max-w-xs ${classes.token}`} disabled />      
        </div>
        </div>
        <button className="btn btn-warning btn-wide">Set Permission</button>
    </div>
  );
};

export default PermissionForm;
