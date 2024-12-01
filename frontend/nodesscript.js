document.addEventListener('DOMContentLoaded', function () {
    const charts = ['chart1', 'chart2', 'chart3', 'chart4'];

    charts.forEach((chartId) => {
        const ctx = document.getElementById(chartId).getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
                datasets: [{
                    label: 'Data',
                    data: [150, 200, 180, 220, 170, 190, 210, 180, 230, 200],
                    borderColor: '#7dc8ff',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
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
    });
});
