import React from 'react'
import {Col} from "react-bootstrap";
import { FaThermometerEmpty } from 'react-icons/fa';

export const CurrentWeather = ({data}) => {
   const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;
   
  return (
  <>
  <Col xs lg="3">
  <label className='label-weather-today'>{data.description}</label>
  </Col>
  <Col xs lg="3" className='icon-weather-today'>
    <FaThermometerEmpty size={20} />{Math.round(data.temp) + ' °C'}
  </Col>
  <Col xs lg="3">
    <img src={iconUrlFromCode(`${data.icon}`)} className='icon-weather-today' alt={data.description}/>
  </Col>
  </>
  )
}
