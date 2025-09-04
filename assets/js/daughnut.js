// Esperamos a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/data")
    .then(response => response.json())
    .then(data => {
      console.log("Datos recibidos:", data);

      // Extraer categorías y valores
      const labels = data.map(item => item.Categoria);
      const values = data.map(item => item.Ventas);

      // Crear el gráfico
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [{
            label: "Ventas",
            data: values,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            borderWidth: 1
          }]
        }
      });
    })
    .catch(error => console.error("Error al cargar datos:", error));
});
