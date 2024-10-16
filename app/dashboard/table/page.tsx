"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
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
export default function EditableTableWithLayout() {
  const [data, setData] = useState<DashboardData[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [newRow, setNewRow] = useState({ category: "", value: "" });
  const [editedRow, setEditedRow] = useState({ category: "", value: "" });
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
      const response = await supabase
        .from("dashboard_data")
        .select("*")
        .order("created_at", { ascending: false });
      if (response.error) throw response.error;
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { category, value } = newRow;
      const response = await supabase
        .from("dashboard_data")
        .insert({ category, value: parseFloat(value) });
      if (response.error) throw response.error;
      setNewRow({ category: "", value: "" });
      fetchData();
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const { category, value } = editedRow;
      const response = await supabase
        .from("dashboard_data")
        .update({ category, value: parseFloat(value) })
        .eq("id", id);
      if (response.error) throw response.error;
      setEditingRowId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await supabase
        .from("dashboard_data")
        .delete()
        .eq("id", id);
      if (response.error) throw response.error;
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
          <div className="card p-4">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Add New Data
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Category
                </label>
                <select
                  className="input"
                  value={newRow.category}
                  onChange={(e) =>
                    setNewRow({ ...newRow, category: e.target.value })
                  }
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
                  value={newRow.value}
                  onChange={(e) =>
                    setNewRow({ ...newRow, value: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                Add Data
              </button>
            </form>
          </div>

          {/* Data Table */}
          <div className="card p-4 mt-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              <center>Table</center>
            </h3>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">Category</th>
                  <th className="p-2">Value</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.id} className="border-b">
                    <td className="p-2">
                      {editingRowId === row.id ? (
                        <select
                          className="input"
                          value={editedRow.category}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="line">Line</option>
                          <option value="bar">Bar</option>
                          <option value="pie">Pie</option>
                        </select>
                      ) : (
                        row.category
                      )}
                    </td>
                    <td className="p-2">
                      {editingRowId === row.id ? (
                        <input
                          className="input"
                          type="number"
                          value={editedRow.value}
                          onChange={(e) =>
                            setEditedRow({
                              ...editedRow,
                              value: e.target.value,
                            })
                          }
                        />
                      ) : (
                        row.value
                      )}
                    </td>
                    <td className="p-2">
                      {editingRowId === row.id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(row.id)}
                            className="btn-secondary mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingRowId(null)}
                            className="btn-secondary"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingRowId(row.id);
                              setEditedRow({
                                category: row.category,
                                value: String(row.value),
                              });
                            }}
                            className="btn-secondary mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="btn-danger"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
