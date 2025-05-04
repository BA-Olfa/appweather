import React from 'react'
import {Card, Row, Col} from "react-bootstrap";
import { getWeekDays } from '../utilities/DatetimeUtils';
import { FaThermometerEmpty } from 'react-icons/fa';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { WiCloudy } from 'react-icons/wi'; // cloudy icon
import { GiSunrise, GiSunset } from 'react-icons/gi';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export const WeatherWeek = ({ data }) => {
    const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const forecastDays = getWeekDays(); 

  return (
    <Row xs={1} md={2} className="g-4">
    {data.map((item, idx) => (
      <Col key={idx}>
        <Card className='card-detail-weather'>
         
          <div className="d-flex bd-highlight">
            <div className="p-2 flex-fill bd-highlight day">{forecastDays[idx]}</div>
            <div className="p-2 flex-fill bd-highlight day"></div>
            <div className="p-2 flex-fill bd-highlight day"> <FaThermometerEmpty size={20} />{Math.round(item.temp) + ' °C'}</div>
            <div className="p-2 flex-fill bd-highlight day"> <FiWind size={20} />{Math.round(item.wind) + ' km/h'}</div>
            </div> 

            <div className="d-flex bd-highlight bloc2">
            <div className="p-2 flex-fill bd-highlight day"><img src={iconUrlFromCode(`${item.icon}`)} className='icon-weather'/>{item.description}</div>
            
            <div className="p-2 flex-fill bd-highlight day"><WiCloudy size={25} />{item.clouds + ' %'}</div>
            <div className="p-2 flex-fill bd-highlight day"><BiSolidDropletHalf size={20} />{item.humidity + ' %'}</div>
            
            </div> 

        </Card>
      </Col>
    ))}
  </Row>
  )
}
