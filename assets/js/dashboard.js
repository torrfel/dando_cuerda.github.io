// Datos de ejemplo (simulando la base de datos)
const deliveriesData = [
    { id: 1, destino: "Cali", destinatario: "Juan Pérez", fecha: "2023-09-07", emprendedor: "Emprendedor 1", entregado: true, registro: "#" },
    { id: 2, destino: "Cali", destinatario: "María García", fecha: "2023-09-07", emprendedor: "Emprendedor 1", entregado: true, registro: "#" },
    { id: 3, destino: "Cali", destinatario: "Carlos López", fecha: "2023-09-06", emprendedor: "Emprendedor 2", entregado: true, registro: "#" },
    { id: 4, destino: "Bogotá", destinatario: "Ana Rodríguez", fecha: "2023-09-06", emprendedor: "Emprendedor 1", entregado: true, registro: "#" },
    { id: 5, destino: "Bogotá", destinatario: "Pedro Martínez", fecha: "2023-09-05", emprendedor: "Emprendedor 3", entregado: true, registro: "#" },
    { id: 6, destino: "Medellín", destinatario: "Laura Sánchez", fecha: "2023-09-05", emprendedor: "Emprendedor 2", entregado: true, registro: "#" },
    { id: 7, destino: "Medellín", destinatario: "Jorge Díaz", fecha: "2023-09-04", emprendedor: "Emprendedor 1", entregado: true, registro: "#" },
    { id: 8, destino: "Barranquilla", destinatario: "Sofía Ramírez", fecha: "2023-09-04", emprendedor: "Emprendedor 3", entregado: true, registro: "#" },
    { id: 9, destino: "Cartagena", destinatario: "Diego González", fecha: "2023-09-03", emprendedor: "Emprendedor 2", entregado: true, registro: "#" },
    { id: 10, destino: "Cali", destinatario: "Mónica Herrera", fecha: "2023-09-03", emprendedor: "Emprendedor 1", entregado: true, registro: "#" }
];

// Función para formatear fecha
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}

// Función para renderizar las tarjetas de destino

function renderDestinationCards(data) {
    const container = document.getElementById('destinationCards');
    container.innerHTML = '';
    
    // Agrupar por destino
    const groupedByDestination = {};
    data.forEach(delivery => {
        if (!groupedByDestination[delivery.destino]) {
            groupedByDestination[delivery.destino] = [];
        }
        groupedByDestination[delivery.destino].push(delivery);
    });
    
    // Crear tarjetas para cada destino
    for (const destination in groupedByDestination) {
        const deliveries = groupedByDestination[destination];
        const destinatarios = deliveries.map(d => d.destinatario);
        const firstDelivery = deliveries[0];
        
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-3';
        card.innerHTML = `
            <div class="card destination-card h-100">
                <div class="card-body">
                    <h5 class="card-title">${destination}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Destinatarios:</h6>
                    <div class="destinatario-list mb-2">
                        ${destinatarios.map(dest => `<span class="badge bg-light text-dark me-1 mb-1">${dest}</span>`).join('')}
                    </div>
                    <p class="card-text"><strong>Fecha:</strong> ${formatDate(firstDelivery.fecha)}</p>
                    <p class="card-text"><strong>Total entregas:</strong> ${deliveries.length}</p>
                    <a href="#" class="btn btn-sm btn-primary">Ver registros</a>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    }
}

// Función para renderizar la tabla de entregas
function renderDeliveryTable(data) {
    const tableBody = document.getElementById('deliveryTable');
    tableBody.innerHTML = '';
    
    data.forEach(delivery => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${delivery.destino}</td>
            <td>${delivery.destinatario}</td>
            <td>${formatDate(delivery.fecha)}</td>
            <td>${delivery.emprendedor}</td>
            <td><span class="badge badge-delivered">Entregado</span></td>
            <td>
                <a href="${delivery.registro}" class="btn btn-sm btn-outline-primary">
                    <i class="fas fa-eye"></i> Ver registro
                </a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Inicializar gráfico
function initChart() {
    const ctx = document.getElementById('deliveryChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Cali','Bogotá','Medellín','Barranquilla','Cartagena','Bucaramanga','Santa Marta','Manizales','Pereira','Armenia','Cúcuta','Ibagué'],
            datasets: [{
                label: 'Entregas por destino',
                data: [42, 35, 28, 15, 8, 20, 12, 18, 25, 10, 14, 22],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(230, 126, 34, 0.7)'
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(230, 126, 34, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Filtrar datos
function filterData() {
    const emprendedorFilter = document.getElementById('emprendedorFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    let filteredData = deliveriesData.filter(delivery => delivery.entregado === true);
    
    if (emprendedorFilter !== 'all') {
        filteredData = filteredData.filter(delivery => delivery.emprendedor === `Emprendedor ${emprendedorFilter}`);
    }
    
    if (dateFilter) {
        filteredData = filteredData.filter(delivery => delivery.fecha === dateFilter);
    }
    
    renderDestinationCards(filteredData);
    renderDeliveryTable(filteredData);
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    initChart();
    renderDestinationCards(deliveriesData);
    renderDeliveryTable(deliveriesData);
    
    document.getElementById('applyFilter').addEventListener('click', filterData);
});