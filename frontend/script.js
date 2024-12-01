document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('sensorGraph').getContext('2d');
    var sensorGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],  // Empty at first, to be populated with timestamps
            datasets: [{
                label: 'Temperature',
                data: [],  // Empty at first, to be populated with temperature data
                borderColor: '#00D1FF',
                fill: false,
                borderWidth: 1.5
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Function to fetch sensor data from MongoDB via Flask
    async function fetchSensorData() {
        try {
            // Fetch data from Flask API endpoint
            const response = await fetch('http://localhost:5000/get-sensor-data');  // Replace with your Flask server URL if deployed
            const data = await response.json();

            // If data is fetched successfully, process it
            if (data && Array.isArray(data)) {
                // Extract timestamps and temperatures from the fetched data
                const labels = data.map(entry => new Date(entry.timestamp).toLocaleTimeString());
                const temperatures = data.map(entry => entry.temperature);

                // Update the graph with the fetched data
                sensorGraph.data.labels = labels;
                sensorGraph.data.datasets[0].data = temperatures;
                sensorGraph.update(); // Update the graph once with the full dataset
            }
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    }

    // Fetch data once when the page loads
    fetchSensorData();
});



let center = [73.856743, 18.520430]
var map = tt.map({

    key: "TBSH4uA4KmIwIuo5q7MHKrwM2Ac5nuLM",
    center: center,
    container: "map",
    zoom: 13
})
map.on('load', () => {
    new tt.Marker().setLngLat(center).addTo(map)
});
