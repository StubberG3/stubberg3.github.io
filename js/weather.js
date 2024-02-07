const app = {
    init: () => {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems);
        });
        document
            .getElementById('btnGet')
            .addEventListener('click', app.fetchWeather);
        document
            .getElementById('btnCurrent')
            .addEventListener('click', app.getLocation);
    },
    fetchWeather: (ev) => {
        document
            .getElementById('loading')
            .classList
            .remove('hide');
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        //use the values from latitude and longitude to fetch the weather
        let lat = document.getElementById('latitude').value;
        let lon = document.getElementById('longitude').value;
        let key = '8fb8ce234116ef7dfa8214ca6286a884';
        let lang = 'en';
        let units = 'metric';
        let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${key}&appid=${key}&units=${units}&lang=${lang}`;
        //fetch the weather
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data) => {
                app.showWeather(data);
            })
            .catch(console.err);
        document
            .getElementById('loading')
            .classList
            .add('hide');
    },
    getLocation: (ev) => {
        document
            .getElementById('loading')
            .classList
            .remove('hide');
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10, //10 seconds
            maximumAge: 1000 * 60 * 5, //5 minutes
        };
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, opts);
        document
            .getElementById('loading')
            .classList
            .add('hide');
    },
    onSuccess: (position) => {
        //got position
        document.getElementById('latitude').value =
            position.coords.latitude.toFixed(2);
        document.getElementById('longitude').value =
            position.coords.longitude.toFixed(2);
    },
    onError: (err) => {
        //geolocation failed
        console.error(err);
    },
    showWeather: (resp) => {
        console.log(resp);
        let today = document.querySelector('.today');
        let week = document.querySelector('.week');
        function convertCtoF (C) {
            return parseInt(C * 9 / 5 + 32);
        }
        //clear out the old weather and add the new
        today.innerHTML = resp.daily
            .map((day, idx) => {
                let dt = new Date(day.dt * 1000); //timestamp * 1000
                const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                if (idx == 0) { // show current day forecast
                    return `<div class="card col s12 m6 offset-m3 l6 offset-l3 primary-color white-text">
                    <div class="card-content">
                        <h6>${resp.timezone}</h6>
                        <h2 style="margin: 0;"><b>${convertCtoF(day.temp.day)}&deg;F</b></h2>
                        <img
                            src="http://openweathermap.org/img/wn/${day.weather[0].icon
                        }@4x.png"
                            class="card-image"
                            alt="${day.weather[0].description}"
                        />
                        <h5 style="margin: 0;">${day.weather[0].main}</h5>
                    </div>
                </div>`;
                }
            })
            .join(' ');
        week.innerHTML = resp.daily
            .map((day, idx) => {
                let dt = new Date(day.dt * 1000); //timestamp * 1000
                const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                if (idx <= 7) {
                    return `<div class="col s6 m3">
                        <div class="card">
                        <div class="card-title">
                        <h5>${weekday[dt.getDay()]}</h5>
                        <h6>${dt.toLocaleDateString('en-US')}</h6>
                        <img
                            src="http://openweathermap.org/img/wn/${day.weather[0].icon
                        }@4x.png"
                            class="card-image"
                            alt="${day.weather[0].description}"
                        />
                        <h4>${day.weather[0].main}</h4>
                        </div>
                        <div class="card-content">
                            <p class="card-text">High ${convertCtoF(day.temp.max)}&deg;F Low ${convertCtoF(day.temp.min)
                        }&deg;F</p>
                            <p class="card-text">High Feels like ${convertCtoF(day.feels_like.day)
                        }&deg;F</p>
                            <p class="card-text">Precipitation ${day.pop * 100}%</p>
                        </div>
                        </div>
                    </div>
                    </div>`;
                }
            })
            .join(' ');
    },
};

app.init();