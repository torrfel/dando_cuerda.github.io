// Datos de ejemplo
const nivelEntrega = 90; // porcentaje total

// Texto de porcentaje en el centro
document.getElementById("percentage").textContent = nivelEntrega + "%";

// Círculo Doughnut Chart.js
const ctx = document.getElementById("deliveryChart").getContext("2d");
new Chart(ctx, {
  type: "doughnut",
  data: {
    datasets: [{
      data: [nivelEntrega, 100 - nivelEntrega],
      backgroundColor: ["#22c55e", "#e5e7eb"], // verde y gris claro
      borderWidth: 0
    }]
  },
  options: {
    cutout: "80%",
    plugins: { legend: { display: false }, tooltip: { enabled: false } }
  }
});

// Fecha de hoy arriba
const hoy = new Date().toISOString().split("T")[0];
document.getElementById("fecha").textContent = hoy;
