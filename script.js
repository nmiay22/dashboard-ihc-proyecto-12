document.addEventListener('DOMContentLoaded', () => {
    
    // Datos Simulados para el Dashboard de la Cafetería
    const datosPedidos = {
        dias: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        pedidosDiarios: [120, 155, 130, 185, 250, 280, 190], // Cantidad de pedidos
        productos: ['Latte', 'Capuccino', 'Americano', 'Té Chai', 'Moka'],
        ventasProductos: [35, 25, 15, 10, 15] // Porcentajes o cantidad relativa
    };

    // 1. Métrica Principal: Total de Pedidos (Requisito Línea Total - Tarjeta)
    function mostrarTotalPedidos() {
        const total = datosPedidos.pedidosDiarios.reduce((sum, current) => sum + current, 0);
        const elementoTotal = document.getElementById('total-pedidos');
        if (elementoTotal) {
            elementoTotal.textContent = total.toLocaleString(); 
        }
    }
    
    // 2. Gráfico de Barras: Ventas Diarias
    function crearGraficoBarras() {
        const ctxBar = document.getElementById('barChart');

        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: datosPedidos.dias,
                datasets: [{
                    label: 'Pedidos',
                    data: datosPedidos.pedidosDiarios,
                    backgroundColor: 'rgba(93, 64, 55, 0.7)', // Marrón de café
                    borderColor: 'rgba(93, 64, 55, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'N° de Pedidos'
                        }
                    }
                }
            }
        });
    }

    // 3. Gráfico Circular (Dona): Distribución de Productos
    function crearGraficoCircular() {
        const ctxPie = document.getElementById('pieChart');

        const colores = [
            '#00796b', 
            '#e64a19', 
            '#fbc02d', 
            '#5d4037', 
            '#c2185b'  
        ];

        new Chart(ctxPie, {
            type: 'doughnut', 
            data: {
                labels: datosPedidos.productos,
                datasets: [{
                    data: datosPedidos.ventasProductos,
                    backgroundColor: colores,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    }
                }
            }
        });
    }

    // 4. Gráfico de Línea: Tendencia de Visitas Semanales (Implementando el requisito de Línea Total como gráfico)
    function crearGraficoLinea() {
        const ctxLine = document.getElementById('lineChart');

        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: datosPedidos.dias, 
                datasets: [{
                    label: 'Visitas al Sitio',
                    data: datosPedidos.pedidosDiarios.map(p => p * 1.5), 
                    borderColor: 'rgb(255, 159, 64)', 
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: true, 
                    tension: 0.3 
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Ejecutar todas las funciones para cargar el dashboard
    mostrarTotalPedidos();
    crearGraficoBarras();
    crearGraficoCircular();
    crearGraficoLinea(); 
});