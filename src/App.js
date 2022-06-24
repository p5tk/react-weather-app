import React, {useState, useEffect}  from "react";
import axios from "axios";

const App = () => {


  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [backgroundUrl, setBackgroundUrl] = useState("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.kpopmap.com%2F2020%2F11%2F1600819502-20200922-jennie.jpg&f=1&nofb=1")

  useEffect(() => {
    console.log(backgroundUrl + "updated")
  },[backgroundUrl])


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid={APIKEY}}`

  const searchLocation = (event) => {
    if (event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        console.log(response.data.weather[0].description)
        const weather_description = response.data.weather[0].description
        setBackgroundUrl("https://source.unsplash.com/1600x900/?" + weather_description)
        console.log(weather_description)
        console.log(backgroundUrl)
      })
      setLocation('')
    }
  }

  

  // 'https://source.unsplash.com/1600x900/?" + description + "'

  // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";

  return (
    <div className="app" style={{ background: `url("${backgroundUrl}") no-repeat center center/cover`}}>
      <div className="search">
        <input 
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}℃</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && 
          <div className="bottom">
          <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like.toFixed()}℃</p> : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH </p> : null}
            <p>Winds</p>
          </div>
        </div>
        }
        
      </div>
      
    </div>
  )
}

export default App;