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
  const [dataCurrentWeather, setDataCurrentWeather] = useState({});
  const [nameCity,setNameCity]=useState('');

  const objetCity ={
    value: '36.800833333 10.18',
    label: 'Tunis, TN',
  }

  const filterForecastWeather = (data,data2) => {
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
    setNameCity(enteredData.label);

    try {
      const [todayWeatherResponse, weekForecastResponse] =await getWeatherData(latitude, longitude);
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
      <Row>
          <TodayForecast></TodayForecast>
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
