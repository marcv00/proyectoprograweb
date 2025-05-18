export default function NotFoundPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontFamily: "sans-serif",
                textAlign: "center",
            }}
        >
            <img
                src="/proyectoprograweb/favicon.svg"
                alt="favicon"
                style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "1.5rem",
                    filter: "drop-shadow(0 0 4px rgba(0,0,0,0.2))",
                }}
            />
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                Página no encontrada
            </h1>
            <p style={{ color: "#666" }}>
                Lo sentimos, la página que buscás no existe.
            </p>
        </div>
    );
}
