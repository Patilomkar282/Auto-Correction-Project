import React from "react";
import { FaChartLine, FaTachometerAlt, FaCheckCircle } from "react-icons/fa"; // Icons

const StatsCards = () => {
  const stats = [
    {
      title: "Availability",
      value: "92.5%", // Dummy value
      icon: <FaTachometerAlt className="text-primary" />,
      bgColor: "bg-primary", 
      textColor: "text-dark",
    },
    {
      title: "Performance",
      value: "87.8%", // Dummy value
      icon: <FaChartLine className="text-success" />,
      bgColor: "bg-success", 
      textColor: "text-dark",
    },
    {
      title: "Quality",
      value: "95.3%", // Dummy value
      icon: <FaCheckCircle className="text-info" />,
      bgColor: "bg-info", 
      textColor: "text-dark",
    },
  ];

  return (
    <div className="d-flex justify-content-between gap-4 p-4" style={{marginTop:'-100px'}}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`card ${stat.bgColor} ${stat.textColor} w-25 p-4 shadow-sm transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
        >
          <div className="card-body d-flex align-items-center">
            <div className="me-3">{stat.icon}</div>
            <div>
              <h5 className="card-title">{stat.title}</h5>
              <p className="card-text fs-2 fw-bold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
