/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const key = '0805a14f10c3d1934604cf2ac0fee90d';


const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(`${baseURL}?zip=${zip},us&units=metric&appid=${key}`);
    try {
        const data = await res.json();
        console.log('Getting weather from OpenWeatherMap API\n' + JSON.stringify(data));
        return data;
    }
    catch (error) {
        console.log('error getting data from OpenWeatherMap API', error);
    }
};

const postData = async (url = '', data = {}) => {
    console.log(url);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await res.json();
        console.log('Sending data to app:\n' + JSON.stringify(data));
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
};

const getData = async (url = '') => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log('Getting data from app:\n' + JSON.stringify(data));
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}
document.addEventListener('DOMContentLoaded', (evt) => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', (evt) => {
        event.preventDefault();
        const zip = document.getElementById('zip').value;
        getWeather(baseURL, zip, key).then((data) => {
            const temp = data.main.temp;
            const content = document.getElementById('feelings').value;
            const postDataObject = {
                temperature: temp,
                date: newDate,
                user_response: content
            }
            postData('http://localhost:8000/all', postDataObject).then((data) => {
                getData('http://localhost:8000/all').then((data) => {
                    console.log(data);
                    const mostRecentEntry = data['data'];
                    console.log(mostRecentEntry);
                    // Dynamically Update UI
                    document.getElementById('date').innerHTML = `Date: ${mostRecentEntry.date}`;
                    document.getElementById('temp').innerHTML = `Temperature: ${mostRecentEntry.temperature}&deg;C`;
                    document.getElementById('content').innerHTML = `Content: ${mostRecentEntry.user_response}`;
                });
            });
        });
    });
});  