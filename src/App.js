import React, {useState} from 'react';
import {useEffect} from 'react';
import { Card, Row, Container, Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Search } from "./components/Search";
import { getWeatherData } from './api/apiWeather';
import { CurrentWeather } from './components/CurrentWeather';
import { WeatherWeek } from './components/WeatherWeek';
import { AirConditions } from './components/AirConditions';
import { TodayForecast } from './components/TodayForecast';

function App() {
  const [weatherweek, setWeatherweek] = useState([]);
  const [weatherhourly, setWeatherhourly] = useState([]);
  const [dataCurrentWeather, setDataCurrentWeather] = useState({});
  

  const objetCity ={
    value: '34 9',
    label: 'Tunis, TN',
  }

  const filterForecastWeather = (data,data2) => {
    
    const Firstelement={
      temp: data[0].main.temp,
      title: data[0].dt,
      icon: data[0].weather[0].icon,
      date: data[0].dt_txt,
      description:data[0].weather[0].description,
      clouds:data[0].clouds.all,
      humidity:data[0].main.humidity,
      wind:data[0].wind.speed
    }

    const dataWeatherweek = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
        .map((f) => ({
          temp: f.main.temp,
          title: f.dt,
          icon: f.weather[0].icon,
          date: f.dt_txt,
          description:f.weather[0].description,
          clouds:f.clouds.all,
          humidity:f.main.humidity,
          wind:f.wind.speed
        }));
      dataWeatherweek.push(Firstelement)
      setWeatherweek(dataWeatherweek)

      const datahourlyWeather = data
        .map((f) => ({
            temp: f.main.temp,
            title: f.dt,
            icon: f.weather[0].icon,
            date: f.dt_txt,
            description:f.weather[0].description,
            clouds:f.clouds.all,
            humidity:f.main.humidity,
            wind:f.wind.speed,
            heure:f.dt_txt.split(" ")[1].slice(0, 5)
        })).slice(0, 6);
        setWeatherhourly(datahourlyWeather)

        const datatodayWeather = {
          temp: data2.main.temp,
          title: data2.dt,
          icon: data2.weather[0].icon,
          date: data2.dt_txt,
          description:data2.weather[0].description,
          clouds:data2.clouds.all,
          humidity:data2.main.humidity,
          wind:data2.wind.speed,
          city:data2.name
      }
      setDataCurrentWeather(datatodayWeather)

};

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');
   

    try {
      const [todayWeatherResponse, weekForecastResponse] =await getWeatherData(latitude, longitude);
      console.log(weekForecastResponse)
      console.log(todayWeatherResponse)
      filterForecastWeather(weekForecastResponse.list,todayWeatherResponse)
      
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    searchChangeHandler(objetCity);
  }, []);

  return (
    <div className="container mt-5 containerapp">
    <Card className="mx-auto text-center card-weather">
    <Container className='container-search-weather'>
      
      <Row>
        <Col><Search onSearchChange={searchChangeHandler} datainput={objetCity}/></Col>
      </Row>
    </Container>
    <Container className='container-search-weather'>
      <Row xs={1} md={1} className="g-4"><Col><h4 className='titre'>CURRENT WEATHER</h4></Col></Row>
      <Row className="justify-content-md-center bloc2">
          <CurrentWeather data={dataCurrentWeather}></CurrentWeather>
      </Row>
    </Container>
    <Container className='container-search-weather'>
      <Row xs={1} md={1} className="g-4"><Col><h4 className='titre'>AIR CONDITIONS</h4></Col></Row>
      <Row>
          <AirConditions item={dataCurrentWeather}></AirConditions>
      </Row>
    </Container>  
    <Container className='container-search-weather'>
      <Row xs={1} md={1} className="g-4"><Col><h4 className='titre'>TODAY'S FORECAST</h4></Col></Row>
      <Row className="justify-content-md-center bloc2">
          <TodayForecast data={weatherhourly}></TodayForecast>
      </Row>
    </Container> 
    <Container className='container-search-weather'>
      <Row xs={1} md={1} className="g-4"><Col><h4 className='titre'>WEEKLY FORECAST</h4></Col></Row>
      <WeatherWeek data={weatherweek}></WeatherWeek>
      
    </Container> 
      
    </Card>
  </div>
  );
}

export default App;
