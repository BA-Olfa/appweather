import React, {useState} from 'react';
import {useEffect} from 'react';
import { Card, Row, Container, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Search } from "./components/Search";
import { getWeatherData } from './api/apiWeather';
import { WeatherDay } from './components/WeatherDay';
import { WeatherWeek } from './components/WeatherWeek';



function App() {
  const [weatherweek, setWeatherweek] = useState([]);
  const objetCity ={
    value: '36.800833333 10.18',
    label: 'Tunis, TN',
  }

  const filterForecastWeather = (data) => {
    const dataWeatherweek = data
        .map((f) => ({
            temp: f.main.temp,
            title: f.dt,
            icon: f.weather[0].icon,
            date: f.dt_txt,
            description:f.weather[0].description,
            clouds:f.clouds.all,
            humidity:f.main.humidity,
            wind:f.wind.speed
        })).slice(0, 6);
        setWeatherweek(dataWeatherweek)
};

  const searchChangeHandler = async (enteredData) => {
    console.log('enteredData latitude  : '+enteredData.value)
    console.log('enteredData label     : '+enteredData.label)
    
    const [latitude, longitude] = enteredData.value.split(' ');
    const [name, code] = enteredData.label.split(' ');

   console.log(latitude)
   console.log(longitude)
   console.log(name)
   console.log(code)

    try {
      const [todayWeatherResponse, weekForecastResponse] =await getWeatherData(latitude, longitude);
      console.log(weekForecastResponse.list)
      filterForecastWeather(weekForecastResponse.list)

    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    searchChangeHandler(objetCity);
  }, []);

  return (
    <div className="container mt-5">
    <Card className="mx-auto text-center card-weather">
    <Container className='container-search-weather'>
      <Row>
        <Col><Search onSearchChange={searchChangeHandler} datainput={objetCity}/></Col>
      </Row>
    </Container>
    <Container className='container-search-weather'>
      <Row>
        <Col>
          <WeatherDay></WeatherDay>
        </Col>
      </Row>
    </Container> 
    <Container className='container-search-weather'>
      <WeatherWeek data={weatherweek}></WeatherWeek>
      
    </Container> 
      
    </Card>
  </div>
  );
}

export default App;
