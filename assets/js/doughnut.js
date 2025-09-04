// Datos iniciales (simulan un DataFrame)
const initialData = [
  { category: "A", value: 120 },
  { category: "B", value: 80  },
  { category: "C", value: 150 },
  { category: "D", value: 100 }
];

// Paleta por defecto (se aplica cíclicamente)
const defaultColors = [
  "#2563eb", "#16a34a", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4"
];

let chart = null;

function createLegend(labels, colors, values) {
  const legendEl = document.getElementById("legend");
  legendEl.innerHTML = "";
  labels.forEach((label, i) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    const sw = document.createElement("span");
    sw.className = "sw";
    sw.style.background = colors[i];
    item.appendChild(sw);

    const text = document.createElement("div");
    text.innerHTML = `<strong>${label}</strong> — ${values[i]}`;
    item.appendChild(text);
    legendEl.appendChild(item);
  });
}

function drawDoughnut(dataArray) {
  const labels = dataArray.map(d => d.category);
  const values = dataArray.map(d => d.value);
  const colors = labels.map((_, i) => defaultColors[i % defaultColors.length]);

  createLegend(labels, colors, values);

  const ctx = document.getElementById("doughnutCanvas").getContext("2d");

  if (chart) {
    // actualizar datos si ya existe
    chart.data.labels = labels;
    chart.data.datasets[0].data = values;
    chart.data.datasets[0].backgroundColor = colors;
    chart.update();
    return;
  }

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 2
      }]
    },
    options: {
      maintainAspectRatio: false,
      cutout: "45%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      }
    }
  });
}

// funciones UI
document.addEventListener("DOMContentLoaded", () => {
  // dibuja gráfico con datos iniciales
  drawDoughnut(initialData);

  // precarga el textarea con JSON inicial
  document.getElementById("dataInput").value = JSON.stringify(initialData, null, 2);

  // actualizar con contenido del textarea
  document.getElementById("updateBtn").addEventListener("click", () => {
    const raw = document.getElementById("dataInput").value;
    try {
      const parsed = JSON.parse(raw);
      // validación simple
      if (!Array.isArray(parsed)) throw new Error("Debe ser un array de objetos");
      parsed.forEach(obj => {
        if (typeof obj.category === "undefined" || typeof obj.value === "undefined") {
          throw new Error("Cada objeto debe tener 'category' y 'value'");
        }
      });
      drawDoughnut(parsed);
    } catch (err) {
      alert("JSON inválido: " + err.message);
    }
  });

  // generar valores aleatorios para pruebas
  document.getElementById("randomBtn").addEventListener("click", () => {
    const categories = ["X"];
    const rand = categories.map(c => ({ category: c, value: Math.floor(Math.random()*200)+10 }));
    document.getElementById("dataInput").value = JSON.stringify(rand, null, 2);
    drawDoughnut(rand);
  });
});
