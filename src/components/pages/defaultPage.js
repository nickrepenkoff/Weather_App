import React from 'react';


const DefaultPage = ({days, months, weather, weatherForSomeDays, fetchDate}) => {
    const defaultCities = ['Minsk', 'Moscow', 'Bratislava'];


    const changeCurrentCity = (e) => {
        localStorage.setItem('city', e.target.value);
        fetchDate(e.target.value);
    }
    
    return (
        <div>
            <div className="location">
                {weather.city.name} 
            </div>
            <div className="main-location">
                {weatherForSomeDays.map((date, i )=> 
                    <div key={i}>
                    <div className="location-box"> 
                        <div className="date">{`
                        ${days[date.getDay()]}
                        ${date.getDate()}
                        ${months[date.getMonth()]}
                        ${date.getFullYear()}`
                        }</div>
                        </div>
                        <div className="weather-box">
                        <div className="temperature">
                            {Math.round(weather?.list[i]?.main?.temp)}°c
                        </div>
                        <div className="weather">{weather?.list[i]?.weather[0]?.main}</div>
                    </div>
                </div>
                )} 
            </div>
            <div className= "btn-box">
            {defaultCities.map((city, id) => 
                <button key={id} value={city} className="btn" onClick={changeCurrentCity}>
                    {city}
                </button>
            )}
            </div>
        </div>
    );
};

export default DefaultPage;