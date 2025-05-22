// http://localhost:5173/proyectoprograweb/#/admin/stats
import "./AdminStats.css";

import ReactECharts from "echarts-for-react";

const options = {
  title: {
    text: "Ventas Mensuales",
    textStyle: { color: "white" },
    left: "center",
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    axisLabel: { color: "white" },
    axisLine: { lineStyle: { color: "white" } },
  },
  yAxis: {
    type: "value",
    axisLabel: { color: "white" },
    axisLine: { lineStyle: { color: "white" } },
    splitLine: { lineStyle: { color: "#444" } },
  },
  series: [
    {
      name: "Ventas",
      type: "line", // Cambia a 'bar' si quieres gráfico de barras
      data: [3200, 200, 1400, 2300, 4200],
      smooth: true,
      lineStyle: {
        color: "#00bcd4",
        width: 3,
      },
      areaStyle: {
        color: "rgba(0, 188, 212, 0.2)",
      },
    },
  ],
  backgroundColor: "#1e1e1e",
};

export default function AdminStats() {
    return (
    <div className="admin-stats-wrapper">
        <div className="admin-stats">
            <h1>Estadísticas</h1>
            <p className="grafico_subtitulo">Gráfico de ventas mensuales</p>

            <div className="grafico-layout">

                <div className="stats-resumen">
                <div className="card">
                    <h4>Total ventas</h4>
                    <p>S/. 8,000</p>
                </div>
                <div className="card">
                    <h4>Mes con más ventas</h4>
                    <p>Mayo</p>
                </div>
                <div className="card">
                    <h4>Promedio mensual</h4>
                    <p>S/. 1,600</p>
                </div>
                </div>

                <div className="grafico-container">
                <ReactECharts option={options} style={{ height: 400 }} />
                </div>
            </div>
            
        </div>
    </div>
    );



}
