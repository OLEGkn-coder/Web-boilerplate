import React, { useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function StatisticsChart({ data }) {
const [chartType, setChartType] = useState("gender");

const chartData = useMemo(() => {
if (!data || data.length === 0) {
return { labels: [], datasets: [] };
}

let labels = [];
let values = [];
let colors = [];

if (chartType === "gender") {
 const male = data.filter((t) => t.gender === "male").length;
 const female = data.filter((t) => t.gender === "female").length;
 const other = data.length - male - female;
 labels = ["Male", "Female", "Other"];
 values = [male, female, other];
colors = [
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 99, 132, 0.7)",
  "rgba(255, 206, 86, 0.7)",
];
} 

else if (chartType === "country") {
const countries = {};
data.forEach((t) => {
  countries[t.country] = (countries[t.country] || 0) + 1;
});
labels = Object.keys(countries);
values = Object.values(countries);
colors = labels.map((_, i) => `hsl(${(i * 40) % 360}, 70%, 60%)`);
} 

else if (chartType === "discipline") {
const disciplines = {};
data.forEach((t) => {
  disciplines[t.discipline] = (disciplines[t.discipline] || 0) + 1;
});
labels = Object.keys(disciplines);
values = Object.values(disciplines);
colors = labels.map((_, i) => `hsl(${(i * 60) % 360}, 70%, 60%)`);
}

return {
labels,
datasets: [
  {
    label: `Statistics by ${chartType}`,
    data: values,
    backgroundColor: colors,
    borderColor: "white",
    borderWidth: 2,
  },
],
};
}, [data, chartType]);

const options = {
plugins: {
legend: { position: "bottom" },
tooltip: {
  callbacks: {
    label: (context) => {
      const total = context.dataset.data.reduce((a, b) => a + b, 0);
      const percent = ((context.raw / total) * 100).toFixed(1);
      return `${context.label}: ${context.raw} (${percent}%)`;
    },
  },
},
},
};

return (
<div
className="chart-section"
style={{
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
}}
>
<div className="chart-buttons" style={{ display: "flex", gap: "10px" }}>
  {["gender", "country", "discipline"].map((type) => (
    <button
      key={type}
      onClick={() => setChartType(type)}
      style={{
background: chartType === type ?  "#f68258" : "transparent",
border: `2px solid #f68258`,
color:  chartType === type ? "white" : "#f68258",
padding: "6px 12px",
borderRadius: "6px",
cursor: "pointer",
fontWeight: "bold",
transition: "0.25s ease",

}}>
{type.charAt(0).toUpperCase() + type.slice(1)}
</button>
))}
</div>

<div style={{ width: "400px", height: "400px" }}>
<Pie data={chartData} options={options} />
</div>
</div>
);
}

export default StatisticsChart;
