import Sidebar from "../components/SideBar";
import ChatWindow from "../components/ChatWindow";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default Dashboard;
