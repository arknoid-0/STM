document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('sensorGraph').getContext('2d');
    var sensorGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature',
                data: [],
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

    async function fetchSensorData() {
        try {
            const response = await fetch('http://localhost:5000/get-sensor-data');
            const data = await response.json();
            if (data && Array.isArray(data)) {
                const labels = data.map(entry => new Date(entry.timestamp).toLocaleTimeString());
                const temperatures = data.map(entry => entry.temperature);
                sensorGraph.data.labels = labels;
                sensorGraph.data.datasets[0].data = temperatures;
                sensorGraph.update();
            }
        } catch (error) {
            console.error("Error fetching sensor data:", error);
        }
    }

    fetchSensorData();

    async function fetchWeather() {
        const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';  // Replace with your actual API key
        const city = 'Pune';

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Weather data could not be fetched.');
            }
            const weatherData = await response.json();
            document.getElementById('weather-info').innerHTML = `
                <h3>Weather in ${weatherData.name}</h3>
                <p>Temperature: ${weatherData.main.temp} °C</p>
                <p>Humidity: ${weatherData.main.humidity} %</p>
                <p>Weather: ${weatherData.weather[0].description}</p>
            `;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    fetchWeather();

    async function fetchNodeData() {
        try {
            const response = await fetch("https://api.thingspeak.com/channels/2770751/feeds.json?api_key=JDQUOS7HWNR94BCT&results=2");
            const data = await response.json();
            if (data && data.feeds) {
                const nodeDataHtml = data.feeds.map(feed => `
                    <p>Timestamp: ${feed.created_at}</p>
                    <p>Field 1: ${feed.field1}</p>
                `).join('<hr>');
                document.getElementById('node-data').innerHTML = nodeDataHtml;
            }
        } catch (error) {
            console.error('Error fetching node data:', error);
        }
    }

    fetchNodeData();

    let center = [73.856743, 18.520430];
    var map = tt.map({
        key: "YOUR_TOMTOM_API_KEY",  // Replace with your actual TomTom API key
        center: center,
        container: "map",
        zoom: 13
    });
    map.on('load', () => {
        new tt.Marker().setLngLat(center).addTo(map);
    });
});
