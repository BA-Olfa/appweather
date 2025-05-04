import React from 'react'
import {Card, Col} from "react-bootstrap";

export const TodayForecast = () => {
  return (
    <Col>
           <Card className='card-detail-weather'>      
               <div className="d-flex bd-highlight bloc2">
               <div className="p-2 flex-fill bd-highlight day-description"></div>           
               <div className="p-2 flex-fill bd-highlight day"></div>
               <div className="p-2 flex-fill bd-highlight day"></div>
               </div> 
   
           </Card>
         </Col>
  )
}

