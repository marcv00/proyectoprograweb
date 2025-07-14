import { useEffect, useState } from "react";
import "./AdminStats.css";
import ReactECharts from "echarts-for-react";

// Tipado de respuesta del backend
interface DatosMensuales {
    mes: string;
    total: number;
}

interface VentasResponse {
    total: number;
    promedioMensual: number;
    mesConMasVentas: string;
    datosMensuales: DatosMensuales[];
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export default function AdminStats() {
    const [sidebarWidth, setSidebarWidth] = useState(220);
    const [ventasData, setVentasData] = useState<VentasResponse | null>(null);

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/juegos/ventas-mensuales`, {
                    credentials: "include",
                });
                const data = await response.json();
                setVentasData(data);
            } catch (error) {
                console.error("Error al cargar datos de ventas:", error);
            }
        };

        fetchVentas();

        const updateSidebarWidth = () => {
            const sidebar = document.querySelector(".sidebar");
            if (sidebar) {
                const width = sidebar.classList.contains("collapsed") ? 60 : 220;
                setSidebarWidth(width);
            }
        };

        const observer = new MutationObserver(updateSidebarWidth);
        const target = document.querySelector(".sidebar");
        if (target) {
            observer.observe(target, {
                attributes: true,
                attributeFilter: ["class"],
            });
        }

        updateSidebarWidth();
        return () => observer.disconnect();
    }, []);

    // Configuración del gráfico con datos reales
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
            data: ventasData?.datosMensuales.map((d) => d.mes) || [],
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
                type: "line",
                data: ventasData?.datosMensuales.map((d) => d.total) || [],
                smooth: true,
                lineStyle: {
                    color: "rgba(154, 150, 156, 0.842)",
                    width: 3,
                },
                areaStyle: {
                    color: "rgba(144, 20, 202, 0.662)",
                },
            },
        ],
        backgroundColor: "#1e1e1e",
    };

    return (
        <div
            className="admin-stats-wrapper"
            style={{
                marginLeft: `${sidebarWidth}px`,
                transition: "margin-left 0.3s ease",
            }}
        >
            <div className="admin-stats">
                <h1>Estadísticas</h1>
                <p className="grafico_subtitulo">Gráfico de ventas mensuales</p>

                <div className="grafico-layout">
                    <div className="stats-resumen">
                        <div className="card">
                            <h4>Total ventas</h4>
                            <p>
                                {ventasData
                                    ? `S/. ${ventasData.total.toFixed(2)}`
                                    : "Cargando..."}
                            </p>
                        </div>
                        <div className="card">
                            <h4>Mes con más ventas</h4>
                            <p>
                                {ventasData
                                    ? ventasData.mesConMasVentas
                                    : "Cargando..."}
                            </p>
                        </div>
                        <div className="card">
                            <h4>Promedio mensual</h4>
                            <p>
                                {ventasData
                                    ? `S/. ${ventasData.promedioMensual.toFixed(2)}`
                                    : "Cargando..."}
                            </p>
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
