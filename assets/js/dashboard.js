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
            { id: 8, destino: "Barranquilla", destinatario: "Sofía Ramírez", fecha: "2023-09-04", emprendedor: "Emprendedor 3", entregado: true, registro: "#" },
            { id: 8, destino: "Barranquilla", destinatario: "Sofía Ramírez", fecha: "2023-09-04", emprendedor: "Emprendedor 3", entregado: true, registro: "#" },
            { id: 9, destino: "Cartagena", destinatario: "Diego González", fecha: "2023-09-03", emprendedor: "Emprendedor 2", entregado: false, registro: "#" },
            { id: 10, destino: "Cali", destinatario: "Mónica Herrera", fecha: "2023-09-03", emprendedor: "Emprendedor 1", entregado: true, registro: "#" }
        ];

        // Funcion agrupar numero de entregas por ciudad
        function agrupacion(deliveries){

            const agrupacion = deliveries.reduce((acc, entrega) => {
            const ciudad = entrega.destino;

            if (!acc[ciudad]) {
                acc[ciudad] = { ciudad, entregasTrue: 0, entregasFalse: 0 };
            }

            if (entrega.entregado) {
                acc[ciudad].entregasTrue++;
            } else {
                acc[ciudad].entregasFalse++;
            }

            return acc;
            }, {});

            const resultado = Object.values(agrupacion);
            return resultado
        }

        // Función para formatear fecha
        function formatDate(dateString) {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('es-ES', options);
        }

        //Funcion resumen de entregas 
        function numEntregas(data){ 

            const resultado = agrupacion(data)

            const inicial = { totales: 0, exitosas: 0, pendientes: 0 };
            resultado.forEach(element => {
                inicial.totales += element.entregasTrue + element.entregasFalse
                inicial.exitosas+= element.entregasTrue 
                inicial.pendientes += element.entregasFalse
            });
            console.log(inicial.totales)
            // Reemplazar en los h3
            document.getElementById("totales").textContent = inicial.totales;
            document.getElementById("exitossas").textContent = inicial.exitosas;
            document.getElementById("pendientes").textContent = inicial.pendientes;
                    
        }

        function listCiudades(data){
            const ul = document.getElementById("listaCiudades");
            data.forEach(item => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `
                    ${item.ciudad}
                    <span class="badge bg-primary rounded-pill">${item.entregasTrue}</span>
                `;
                ul.appendChild(li);
            });
        }

        // Función para renderizar la tabla de entregas
        function renderDeliveryTable(data) {
            const tableBody = document.getElementById('deliveryTable');
            tableBody.innerHTML = '';
            
            data.forEach(delivery => {
                const row = document.createElement('tr');
                const estadoTexto = delivery.entregado ? "entregado" : "pendiente";
                row.innerHTML = `
                    <td>${delivery.destino}</td>
                    <td>${delivery.destinatario}</td>
                    <td>${formatDate(delivery.fecha)}</td>
                    <td>${delivery.emprendedor}</td>
                    <td><span class="badge badge-${estadoTexto}">${estadoTexto}</span></td>
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
        function initChart(data) {
            const ctx = document.getElementById('deliveryChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels:  data.map(item => item.ciudad),
                    datasets: [{
                        label: 'Entregas por destino',
                        data: data.map(item => item.entregasTrue),
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
    const destinoFilter = document.getElementById('destinoFilter').value;
    const destinatarioFilter = document.getElementById('destinatarioFilter').value;
    const estadoFilter = document.getElementById('estadoFilter').value;

    // Filtrar base
    let filteredData = deliveriesData;

    // Emprendedor
    if (emprendedorFilter !== 'all') {
        filteredData = filteredData.filter(delivery => delivery.emprendedor === `Emprendedor ${emprendedorFilter}`);
    }

    // Fecha
    if (dateFilter) {
        filteredData = filteredData.filter(delivery => delivery.fecha === dateFilter);
    }

    // Destino
    if (destinoFilter !== 'all') {
        filteredData = filteredData.filter(delivery => delivery.destino === destinoFilter);
    }

    // Destinatario
    if (destinatarioFilter.trim() !== '') {
        filteredData = filteredData.filter(delivery =>
            delivery.destinatario.toLowerCase().includes(destinatarioFilter.toLowerCase())
        );
    }

        // Estado
    if (estadoFilter !== 'all') {
        filteredData = filteredData.filter(delivery => {
            if (estadoFilter === "Entregado") {
                return delivery.entregado === true;
            } else if (estadoFilter === "Pendiente") {
                return delivery.entregado === false;
            }
        });
    }

    // Renderizar
    renderDeliveryTable(filteredData);
}

// Asociar evento al botón
document.getElementById('applyFilter').addEventListener('click', filterData);


        // Inicializar
        document.addEventListener('DOMContentLoaded', function() {
            const entregasXCidudad = agrupacion(deliveriesData)
            
            numEntregas(deliveriesData)
            initChart(entregasXCidudad);
            listCiudades(entregasXCidudad)
            renderDeliveryTable(deliveriesData);
            
            document.getElementById('applyFilter').addEventListener('click', filterData);
        });enderDeliveryTable(filteredData);