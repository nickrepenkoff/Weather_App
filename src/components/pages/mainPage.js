import React, { useState, useEffect,useRef } from 'react';
import ApiKey from '../service/api';


import DefaultPage from './defaultPage';
import  ForecastPage  from './forecastPage';

const api = ApiKey();
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



function MainPage(){
  const defaultCity = 'Minsk';

  let [query, setQuery] = useState(defaultCity);

  let [Days, setDays] = useState(4);

  const [weather, setWeather] = useState({});

  const [weatherForSomeDays, setWeatherForSomeDays] = useState([]); 

  const [isShown, setIsShown] = useState(false);

  const inputRef = useRef(null);


  const resetWeather = (result) => {
    setWeather(result);
  }

  const fetchDate = (city)  => {
    fetch(`${api.base}forecast?q=${city}&units=metric&cnt=${Days}&APPID=${api.key}`)
    .then(res => res.json())
    .then(res => resetWeather(res))
    .catch(res => console.log("Error"))
  }

  useEffect( () => {
    const localStorageCity = localStorage.getItem('city');

    if(localStorageCity){
      query = localStorageCity;
    }else{
      localStorage.setItem('city', query)
    }

    fetchDate(query);
    setDate();
   
  }, [Days]);

  
  const setDate = () => {
    const copyWeatherForSomeDays = [];

    const currentDay = new Date();

    for(let i = 0; i < Days; i++) {
    copyWeatherForSomeDays.push(new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate() + i))
    }
    setWeatherForSomeDays(copyWeatherForSomeDays)
  }



 const switchDay = () => {
    setIsShown(!isShown)
    if(!isShown){
      setDays(4)
    }else{
      setDays(10)
    }
 }
 
 const search = event => {

   if(event.key === "Enter"){

    fetchDate(query, 4);

    if(inputRef.current.value){
      localStorage.setItem('city',inputRef.current.value);
      inputRef.current.value = '';
     }
   }

 }

 return (
    <div>
      <div className={(Object.keys(weather) != 0) ? ((weather.list[0].main.temp > 16) ? 'app warm' : 'app') : 'app'}>
        <main>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              onKeyPress={search}
              ref={inputRef}
            />
          <button className="btn btn-b" onClick={switchDay}>{!isShown ? "Forecast for 10 days" : "Forecast for 4 days "}</button>
          </div>
          {Object.keys(weather) != 0 && (
            <div>
              {!isShown && (
                <DefaultPage
                  days={days} 
                  months={months} 
                  weather={weather} 
                  weatherForSomeDays={weatherForSomeDays} 
                  fetchDate={fetchDate}/>
              )}
              {isShown && (
                <ForecastPage days={days} months={months} weather={weather} weatherForSomeDays={weatherForSomeDays}/>
              )}
            </div>
          )}
        </main> 
      </div>
        
    </div>
  );

}

export default MainPage;