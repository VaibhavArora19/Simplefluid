import DashboardOptions from "../../components/Dashboard/DashboardOptions";

const Dashboard = () => {
    return (
        <>
            <DashboardOptions />
            <button className="btn btn-warning btn-wide" style={{marginTop: "2%",color:"white", marginLeft:"22%", width:"500px"}}>
                Explore
            </button>
        </>
    )
};

export default Dashboard;