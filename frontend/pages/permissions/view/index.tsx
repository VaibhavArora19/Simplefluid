import PermissionBar from "../../../components/SuperfluidPermissions/PermissionBar";

import styles from "../../../styles/Permissions.module.css";

const ViewPermissions = () => {
    return (
        <div className={styles.view}>
            <div className={styles.info}>
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
            <PermissionBar />
            <PermissionBar />
            <PermissionBar />
            </div>
        </div>
    )
};

export default ViewPermissions;