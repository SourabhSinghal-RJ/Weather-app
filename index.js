let weather = {
  apiKey:"de61032c2a74cd5fb9fbb620a0d00804",
  fetchWeather: function(city){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="
    +city
    +"&units=metric&appid="
    +this.apiKey
  )
    .then((response)=>response.json())
    .then((data)=>this.displayWeather(data));
  },
  displayWeather:function(data){
    const{name}=data;
    const{icon,description}=data.weather[0];
    const{temp,humidity}=data.main;
    const{speed}=data.wind;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    document.querySelector(".city").innerText="Weather in "+name;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText=description;
    document.querySelector(".temp").innerText=temp+" °C";
    document.querySelector(".humidity").innerText="Humidity : "+humidity+"%";
    document.querySelector(".wind").innerText="Wind speed : "+speed+"Km/h";
    document.body.style.backgroundImage="url('https://source.unsplash.com/"+vw+"x"+vh+"/?" + name + "')";
  },
  search:function(){
    this.fetchWeather(document.querySelector(".searchBar").value);
  }
};


let currweather = {
  apiKey:"de61032c2a74cd5fb9fbb620a0d00804",
  fetchWeather: function(lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+this.apiKey
  )
    .then((response)=>response.json())
    .then((data)=>this.displayWeather(data));
  },
  displayWeather:function(data){
    const{name}=data;
    const{icon,description}=data.weather[0];
    const{temp,humidity}=data.main;
    const{speed}=data.wind;
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    document.querySelector(".city").innerText="Weather in "+name;
    document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText=description;
    document.querySelector(".temp").innerText=temp+" °C";
    document.querySelector(".humidity").innerText="Humidity : "+humidity+"%";
    document.querySelector(".wind").innerText="Wind speed : "+speed+"Km/h";
    document.body.style.backgroundImage="url('https://source.unsplash.com/"+vw+"x"+vh+"/?" + name + "')";
  },
  search:function(){
    this.fetchWeather(document.querySelector(".searchBar").value);
  }
};
document.querySelector(".button").addEventListener("click",function(){
  weather.search();
});
document.querySelector(".searchBar").addEventListener("keyup",function(event){
  if(event.key=="Enter"){
    weather.search();
  }
})
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  currweather.fetchWeather(crd.latitude,crd.longitude);
  console.log(crd.latitude);
  console.log(crd.longitude);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
weather.fetchWeather("Delhi")
