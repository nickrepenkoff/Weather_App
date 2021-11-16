import React from 'react';



const ForecastPage = ({days, months, weather, weatherForSomeDays}) => {

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
                            {Math.round(weather.list[i].main.temp)}°c
                        </div>
                        <div className="weather">{weather.list[i].weather[0].main}</div>
                    </div>
                </div>
                )} 
            </div>
        </div>
    );
};

export default ForecastPage;