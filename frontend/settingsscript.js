document.addEventListener('DOMContentLoaded', function () {
    loadSettings(); // Load settings when the page loads

    // Function to save settings to localStorage
    function saveSettings() {
        const mapStyle = document.getElementById('mapStyle').value;
        const mapZoomLevel = document.getElementById('mapZoomLevel').value;
        const updateInterval = document.getElementById('updateInterval').value;
        const notifyEmail = document.getElementById('notifyEmail').checked;
        const notifySMS = document.getElementById('notifySMS').checked;
        const notifyPush = document.getElementById('notifyPush').checked;

        // Save settings to localStorage
        localStorage.setItem('mapStyle', mapStyle);
        localStorage.setItem('mapZoomLevel', mapZoomLevel);
        localStorage.setItem('updateInterval', updateInterval);
        localStorage.setItem('notifyEmail', notifyEmail);
        localStorage.setItem('notifySMS', notifySMS);
        localStorage.setItem('notifyPush', notifyPush);

        // Provide feedback to the user
        alert('Settings have been saved successfully!');
    }

    // Function to load settings from localStorage
    function loadSettings() {
        const mapStyle = localStorage.getItem('mapStyle');
        const mapZoomLevel = localStorage.getItem('mapZoomLevel');
        const updateInterval = localStorage.getItem('updateInterval');
        const notifyEmail = localStorage.getItem('notifyEmail') === 'true';
        const notifySMS = localStorage.getItem('notifySMS') === 'true';
        const notifyPush = localStorage.getItem('notifyPush') === 'true';

        // Apply settings to the form elements
        if (mapStyle) document.getElementById('mapStyle').value = mapStyle;
        if (mapZoomLevel) document.getElementById('mapZoomLevel').value = mapZoomLevel;
        if (updateInterval) document.getElementById('updateInterval').value = updateInterval;
        document.getElementById('notifyEmail').checked = notifyEmail;
        document.getElementById('notifySMS').checked = notifySMS;
        document.getElementById('notifyPush').checked = notifyPush;
    }
});
