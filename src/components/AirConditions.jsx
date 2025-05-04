import React from 'react'
import {Card, Col} from "react-bootstrap";
import { FaThermometerEmpty } from 'react-icons/fa';
import { BiSolidDropletHalf } from 'react-icons/bi';
import { FiWind } from 'react-icons/fi';
import { WiCloudy } from 'react-icons/wi'; // cloudy icon

export const AirConditions = ({item}) => {
  return (
    <Col>
        <Card className='card-detail-weather'>      
            <div className="d-flex bd-highlight bloc2">
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition"><FaThermometerEmpty size={20} /> Real Feel</div>           
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition"><FiWind size={20} /> Wind</div>
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition"><WiCloudy size={30} /> Clouds</div>
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition"><BiSolidDropletHalf size={20} /> Humidity</div>
            </div> 

            <div className="d-flex bd-highlight bloc2">
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition">{Math.round(item.temp) + ' °C'}</div>           
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition">{Math.round(item.wind) + ' km/h'}</div>
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition">{Math.round(item.clouds) + '  %'}</div>
            <div className="p-2 flex-fill bd-highlight lib-titre-Air-condition">{item.humidity + ' %'}</div>
            </div>

        </Card>
      </Col>
  )
}

