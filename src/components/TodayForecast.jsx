import React from 'react'
import {Col} from "react-bootstrap";
import { FaThermometerEmpty } from 'react-icons/fa';

export const TodayForecast = ({data}) => {
  const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
     {data.map((item, idx) => (
          <Col key={idx} xs="12" lg="2" sm="4" className='div-heure'>
          <div className='div-detail-heure'>
            <div className='lib-titre-Air-condition'>{item.heure}</div>
            <div className='lib-titre-Air-condition'>{item.description}</div>
            <div className='lib-titre-Air-condition'><FaThermometerEmpty size={25} className='icon-weather'/>{Math.round(item.temp) + ' °C'}</div>
           <img src={iconUrlFromCode(`${item.icon}`)} className='icon-weather' alt={item.description}/>
          </div>
          </Col>
      ))}
    </>
  )
}

