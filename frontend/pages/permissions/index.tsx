import PermissionForm from "../../components/SuperfluidPermissions/PermissonForm";

import styles from "../../styles/Permissions.module.css";

const Permissions = () => {

    return (
        <div className={styles.permissions}>
            <PermissionForm />
        </div>
    )
};

export default Permissions;