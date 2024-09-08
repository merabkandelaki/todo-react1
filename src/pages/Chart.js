import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseInitial";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
// import "./chart.css";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Chart = () => {
  const [todoStats, setTodoStats] = useState({
    total: 0,
    important: 0,
    complate: 0,
  });

  useEffect(() => {
    fetchTodoStats();
  }, []);

  async function fetchTodoStats() {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("important, complate");

      if (error) {
        throw error;
      }

      const stats = {
        total: data.length,
        important: data.filter((todo) => todo.important).length,
        complate: data.filter((todo) => todo.complate).length,
      };
      setTodoStats(stats);
    } catch (error) {
      console.error("Error fetching todo stats:", error.message);
    }
  }

  const calculatePercentage = (value) => {
    return todoStats.total > 0
      ? Math.round((value / todoStats.total) * 100)
      : 0;
  };

  const importantPercentage = calculatePercentage(todoStats.important);
  const complatePercentage = calculatePercentage(todoStats.complate);
  const otherPercentage = 100 - importantPercentage - complatePercentage;

  const chartData = {
    labels: ["Important", "Complate", "Other"],
    datasets: [
      {
        data: [importantPercentage, complatePercentage, otherPercentage],
        backgroundColor: ["#FFA400", "#00A9D7", "#80BC00"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: true,
        position: "right",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 16,
        },
        formatter: (value) => {
          return value > 0 ? value + "%" : "";
        },
      },
    },
  };

  return (
    <div className="flex lg:flex-row flex-col h-screen">
      <div className="lg:w-64 w-full lg:flex-shrink-0 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="lg:flex-grow flex flex-col lg:overflow-y-auto p-4">
        <Header />
        <div className="flex flex-col items-center lg:mr-10 lg:mt-4 mt-0">
          <div className="flex flex-wrap gap-6 mb-6">
            <div className="flex flex-col justify-between bg-white border border-gray-300 p-3 rounded-lg w-full sm:w-[calc(50%-12px)] lg:w-60 h-[191px] max-w-xs">
              <span className="text-lg font-medium text-gray-900">
                All Tasks
              </span>
              <span className="text-2xl font-medium text-gray-900">
                {todoStats.total}
              </span>
            </div>
            <div className="flex flex-col justify-between bg-white border border-gray-300 p-3 rounded-lg w-full sm:w-[calc(50%-12px)] lg:w-60 h-[191px] max-w-xs">
              <span className="text-lg font-medium text-gray-900">
                Important Tasks
              </span>
              <span className="text-2xl font-medium text-gray-900">
                {todoStats.important}
              </span>
            </div>
            <div className="flex flex-col justify-between bg-white border border-gray-300 p-3 rounded-lg w-full sm:w-[calc(50%-12px)] lg:w-60 h-[191px] max-w-xs">
              <span className="text-lg font-medium text-gray-900">
                Completed Tasks
              </span>
              <span className="text-2xl font-medium text-gray-900">
                {todoStats.complate}
              </span>
            </div>
            <div className="flex flex-col justify-between bg-white border border-gray-300 p-3 rounded-lg w-full sm:w-[calc(50%-12px)] lg:w-60 h-[191px] max-w-xs">
              <span className="text-lg font-medium text-gray-900">
                Other Tasks
              </span>
              <span className="text-2xl font-medium text-gray-900">
                {todoStats.total - todoStats.important - todoStats.complate}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center w-full max-w-md">
            <p className="text-lg font-medium text-gray-900 mb-4">
              Task by Status
            </p>
            <Pie data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
