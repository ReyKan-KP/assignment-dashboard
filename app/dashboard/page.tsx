"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ChartWidget from "@/components/ChartWidget";
import { Database } from "@/types/supabase";

type DashboardData = Database["public"]["Tables"]["dashboard_data"]["Row"];
const convertToCSV = (data: DashboardData[]) => {
  const headers = ["Category", "Value", "Created At"];
  const rows = data.map((row) => [row.category, row.value, row.created_at]);
  let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";

  rows.forEach((rowArray) => {
    const row = rowArray.join(",");
    csvContent += row + "\n";
  });

  return encodeURI(csvContent);
};
export default function Dashboard() {
  const [data, setData] = useState<DashboardData[]>([]);
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
    const subscription = supabase
      .channel("dashboard_data_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dashboard_data" },
        fetchData
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/dashboard-data");
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error details:", errorData);
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const newData = await response.json();
      if (Array.isArray(newData)) {
        setData(newData);
      } else {
        console.error("Fetched data is not an array:", newData);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/dashboard-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, value: parseFloat(value) }),
      });
      if (!response.ok) {
        throw new Error("Failed to add data");
      }
      setCategory("");
      setValue("");
      fetchData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const lineData = data.filter((item) => item.category === "line");
  const barData = data.filter((item) => item.category === "bar");
  const pieData = data.filter((item) => item.category === "pie");
const handleCSVExport = () => {
  const csvData = convertToCSV(data);
  const link = document.createElement("a");
  link.setAttribute("href", csvData);
  link.setAttribute("download", "dashboard_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: "var(--background-end)" }}
    >
      <Navbar toggleMenu={toggleMenu} />
      <button onClick={handleCSVExport} className="btn-primary">
        Download CSV
      </button>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isMenuOpen} />

        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWidget
              data={lineData}
              chartType="line"
              dataKeyX="created_at"
              dataKeyY="value"
              title="Line Chart"
            />
            <ChartWidget
              data={barData}
              chartType="bar"
              dataKeyX="created_at"
              dataKeyY="value"
              title="Bar Chart"
            />
            <ChartWidget
              data={pieData}
              chartType="pie"
              dataKeyX="category"
              dataKeyY="value"
              title="Pie Chart"
            />
            <div className="card p-4">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Add New Data
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Category
                  </label>
                  <select
                    className="input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="line">Line</option>
                    <option value="bar">Bar</option>
                    <option value="pie">Pie</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Value
                  </label>
                  <input
                    type="number"
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Add Data
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
