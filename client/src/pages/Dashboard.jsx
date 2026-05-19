import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboardService";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();

        setDashboardData(data.dashboardData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    //polling
    const interval = setInterval(() => {
      console.log("Polling...");
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-7">
      <h1 className="text-4xl font-extrabold mb-10">📊Providers Dashboard</h1>

      {dashboardData.map((provider) => (
        <div
          key={provider.providerId}
          className="flex flex-col gap-3 p-5 items-center justify-center  my-5 w-2/3 rounded-lg shadow-sm bg-gray-900 border border-gray-700"
        >
          <h2 className="font-extrabold text-xl text-center text-yellow-500 w-full bg-gray-900 rounded-md p-2">
            Provider Name : {provider.providerName}
          </h2>
          <h4 className="font-bold font-mono text-xl text-gray-300">
            Remaining Quota : {provider.remainingQuota}
          </h4>
          <h4 className="font-bold font-mono text-xl text-gray-300">
            Total Lead Assigned : {provider.leadsReceived}
          </h4>
          <h3 className="font-bold font-mono text-xl text-gray-300">
            Assigned Leads History:🔻
          </h3>
          <div className="flex gap-4 overflow-x-auto max-w-full scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
            {provider.assignedLeads.map((lead) => (
              <div
                key={lead.leadId}
                className="flex flex-col items-center justify-center p-3  bg-gray-800 rounded min-w-[150px] flex-shrink-0"
              >
                <p className="font-mono text-xs font-semibold">
                  {lead.customerName}
                </p>
                <p className="font-mono text-xs font-semibold">{lead.phone}</p>
                <p className="font-mono text-xs font-semibold">
                  {lead.serviceType}
                </p>
              </div>
            ))}
          </div>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
