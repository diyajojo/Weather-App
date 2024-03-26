const apikey="da5ec63c40681130a9c4ec066e4fdab5";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".top input");
const searchBtn=document.querySelector(".top button");
const image=document.querySelector(".weathericon");
// async fn used to do other things cuz the function takes  times to finish
async function checkWeather(city)
{
  // &appid is the format for linking an apiurl with apikey to authenticate the apiserver to access the weather info abt any city
  // await is used to pause execution of function until fetch is completed 
  const response=await fetch(apiurl + city + `&appid=${apikey}` );
  // if city name is an error
  if(response.status==404)
  {
    document.querySelector(".error").style.display="block";
    document.querySelector(".middle").style.display="none";
  }
  else
  {
    document.querySelector(".error").style.display="none";
    //data is converted to json format cuz response returns data in response format which contains unwated headers etc so to get needed info we convert it into json 
  // await is used to stop execution until response.json is finished 
  var data=await response.json();
  console.log(data);
  //querySelector is used to find an html element using class,ids,tags that is linked to your js
  //data. is used as the api returns the info to date variable
  //innerHTML updates the values in js   
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+'°c';
  document.querySelector(".humidity").innerHTML = data.main.humidity+'%';
  document.querySelector(".windspeed").innerHTML = data.wind.speed+'km/hr';
  // images are updared as per weather by changing their path location
  if(data.weather[0].main=="Clouds")
   image.src="images/clouds.png";
  else if(data.weather[0].main=="Rain")
   image.src="images/rain.png";
  else if (data.weather[0].main=="Mist")
   image.src="images/mist.webp";
  else if(data.weather[0].main=="Clear")
   image.src="images/clear.png";
  else if (data.weather[0].main=="Drizzle")
   image.src="images/drizzle.png";
  else
   image.src="images/snowy.webp";
  //used to hide HTML elements as per requirment
  document.querySelector(".middle").style.display="block";
}
}
//when search button is clicked, fn is called and weather info gets updated
//addEventListener executes the function when the event happens(event is clicking search button)
searchBtn.addEventListener('click',()=>{
  checkWeather(searchBox.value);
})