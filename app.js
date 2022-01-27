// list of dom elements needed for displaying data
const requiredDomElements = {
  form : document.querySelector('form'),
  btn : document.querySelector('.btnsubmited'),
  searchinput : document.querySelector('.searchfield'),
  temp : document.getElementById('temp_c'),
  humidity : document.getElementById('humidity'),
  wind : document.getElementById('wind'),
  feelslike : document.getElementById('feelslike'),
  weatherTitle : document.getElementById('weather-title'),
  location : document.getElementById('location'),
  region : document.getElementById('region'),
  country : document.getElementById('country'),
  time : document.getElementById('time'),
  locationIcon : document.getElementById('location-icon'),


};

// prevent form from submitting data
 requiredDomElements.form.addEventListener('submit', (event) =>{
   event.preventDefault();
 });

 
 requiredDomElements.btn.addEventListener('click', () =>{

  const apikey = '1986480656ec490d950204923202611';
  searchVal =  requiredDomElements.searchinput.value;
 

   if (getWeather(apikey , searchVal)){
    
    displayTemparture(requiredDomElements.temp);

   }
   
 
 });
 

// main async function to fetch data 
async function getWeather(apikey , searchVal){

  const dom  = requiredDomElements;
    
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${searchVal}`, {mode: 'cors'});
      
        if(response.status !== 200){

          handleError();
        }

        const weatherData = await response.json();
        console.log(weatherData);
        const weatherInfo = processData(weatherData);
    
         displayIn(weatherInfo, dom);
      

      


}

// error handler function used if response from server is not OK
function handleError(){
    let form = requiredDomElements.form;
    let y = document.createElement("h1");
    y.style.color = '#ffffff';
    //y.textContent = "Location not found!,  please try a correct location";
    console.log('failed to fetch data we are sorry')

}

// collecting data received from server into data object 
function processData(weatherData){

    const data = {
      city : weatherData.location.name,
      region : weatherData.location.region,
      country : weatherData.location.country,
      time : weatherData.location.localtime,
      weather : weatherData.current.condition.text,
      weatherIcon : weatherData.current.condition.icon,
      temp_c : Math.floor(weatherData.current.temp_c),
      temp_f : Math.floor(weatherData.current.temp_f),
      humidity :Math.floor(weatherData.current.humidity) ,
      wind : Math.floor(weatherData.current.wind_mph),
      feelslike_c : Math.floor(weatherData.current.feelslike_c), 
      feelslike_f : Math.floor(weatherData.current.feelslike_f) 
    }
  
    return data;
}
  

// create image element to display weather Icon 
function getWeatherIcon(weatherInfo, locationIcon){
  const img = document.createElement('img');
  img.style.width = '100px';
  img.style.height = '100px;'
  img.src = "https:"+ weatherInfo.weatherIcon;
  locationIcon.innerHTML = '';
  locationIcon.appendChild(img);
}

// insert data into dom elements
function displayIn(weatherInfo , requiredDomElements){

 
  requiredDomElements.temp.textContent = weatherInfo.temp_c;
  requiredDomElements.humidity.textContent = 'Humidity: '+ weatherInfo.humidity + '%';
  requiredDomElements.wind.textContent ='wind: '+ weatherInfo.wind + 'km/hr';
  requiredDomElements.feelslike.textContent = 'Feelslike: '+ weatherInfo.feelslike_c + 'C';
  requiredDomElements.weatherTitle.textContent = weatherInfo.weather;
  requiredDomElements.location.textContent = weatherInfo.city;
  requiredDomElements.country.textContent = weatherInfo.country;
  requiredDomElements.region.textContent = weatherInfo.region;
  requiredDomElements.time.textContent = weatherInfo.time;


  locationIcon = requiredDomElements.locationIcon;

  getWeatherIcon(weatherInfo, locationIcon);

}
// display data html container when weather data is ready for use
function displayWeatherInfoBox(){
    const x = document.querySelector('.weather-location');
    const y = document.querySelector('.weather-details');
     if(x.classList.contains('hidden') && y.classList.contains('hidden')){

         x.classList.remove('hidden')
         y.classList.remove('hidden')

         x.classList.add('visible')
         y.classList.add('visible')
     }

}

function displayTemparture(temp){

  if(temp.classList.contains('hidden')){
    temp.classList.remove('hidden');
    temp.classList.add('visible');
  }

}



















 
