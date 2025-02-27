import React from "react";
import { FaChartLine, FaTachometerAlt, FaCheckCircle } from "react-icons/fa"; // Icons

const StatsCards = () => {
  const stats = [
    {
      title: "Availability",
      value: "92.5%", // Dummy value
      icon: <FaTachometerAlt className="text-primary" style={{ fontSize: "16px" }} />,
      bgColor: "bg-primary",
      textColor: "text-dark",
    },
    {
      title: "Performance",
      value: "87.8%", // Dummy value
      icon: <FaChartLine className="text-success" style={{ fontSize: "16px" }} />,
      bgColor: "bg-success",
      textColor: "text-dark",
    },
    {
      title: "Quality",
      value: "95.3%", // Dummy value
      icon: <FaCheckCircle className="text-info" style={{ fontSize: "16px" }} />,
      bgColor: "bg-info",
      textColor: "text-dark",
    },
  ];

  return (
    <div className="d-flex flex-row gap-3 p-2" style={{ width: "100", height: "auto", display:"flex",marginTop:"-40px" }}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`card ${stat.bgColor} ${stat.textColor} p-2 shadow-sm`}
          style={{ fontSize: "24px", padding: "10px",justifyContent:"center", minWidth: "120px", minHeight: "80px" }}
        >
          <div className="card-body d-flex align-items-center" >
            <div className="me-2">{stat.icon}</div>
            <div>
              <h6 className="card-title fw-bold" style={{ fontSize: "16px" }}>{stat.title}</h6>
              <p className="card-text fw-bold" style={{ fontSize: "20px" }}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
