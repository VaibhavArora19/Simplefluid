import DashboardOptions from "../../components/Dashboard/DashboardOptions";
import { useRouter } from "next/router";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
    const router = useRouter();
    return (
        <>
            <DashboardOptions />
            <button className={`btn btn-warning btn-wide ${classes.button}`} onClick={() => {router.push('/CFA')}}>
                Start streaming
            </button>
        </>
    )
};

export default Dashboard;