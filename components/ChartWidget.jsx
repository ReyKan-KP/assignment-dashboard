import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

export default function ChartWidget({
  data,
  chartType,
  dataKeyX,
  dataKeyY,
  title,
}) {
  // Sort the data by date in ascending order (if it's a line or bar chart)
  const sortedData = [...data].sort(
    (a, b) => new Date(a[dataKeyX]).getTime() - new Date(b[dataKeyX]).getTime()
  );

  // Define a function to format the date
  const formatDate = (tick) => dayjs(tick).format("D MMM YY");

  return (
    <div className="card p-4">
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" && (
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis
              dataKey={dataKeyX}
              stroke="var(--text-primary)"
              tickFormatter={formatDate} // Apply the date formatter
            />
            <YAxis stroke="var(--text-primary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                color: "var(--chart-tooltip-text)",
                border: "none",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKeyY}
              stroke="var(--primary-color)"
            />
          </LineChart>
        )}
        {chartType === "bar" && (
          <BarChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis
              dataKey={dataKeyX}
              stroke="var(--text-primary)"
              tickFormatter={formatDate} // Apply the date formatter
            />
            <YAxis stroke="var(--text-primary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                color: "var(--chart-tooltip-text)",
                border: "none",
              }}
            />
            <Legend />
            <Bar dataKey={dataKeyY} fill="var(--primary-color)" />
          </BarChart>
        )}
        {chartType === "pie" && (
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKeyY}
              nameKey={dataKeyX}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="var(--primary-color)"
              label
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--chart-tooltip-bg)",
                color: "var(--chart-tooltip-text)",
                border: "none",
              }}
            />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
