import DashboardOptions from "../../components/Dashboard/DashboardOptions";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
    const { isConnected} = useAccount();
    const router = useRouter();
    return (
        <>
            <DashboardOptions />
            {isConnected && <button className={`btn btn-warning btn-wide ${classes.button}`} onClick={() => {router.push('/CFA')}}>
                Start streaming
            </button>}
        </>
    )
};

export default Dashboard;