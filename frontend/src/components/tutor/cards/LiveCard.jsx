import React from 'react';
import { Card, Button } from 'react-bootstrap';

const LiveCard = () => {
  return (
    <Card style={{ width: '18rem', backgroundColor:'#edf7f7'}}>
      <Card.Body>
        <Card.Title className="fw-bold">Introduction about Python</Card.Title>
        <Card.Text>
        <div>
            <span className="fw-bold">Subject:</span> Python
          </div>
          <div style={{color:'green',textDecoration:'bold'}}>
            <span className="fw-bold" style={{color:'black'}} >Time:</span> 10:00 AM - 11:30 AM
          </div>
          <div>
            <span className="fw-bold">Date:</span> October 31, 2023
          </div>
          <div style={{backgroundColor:'#09ead55e',borderRadius:'5px',color:'red'}}>
            <span className="fw-bold" >Status</span>: Ongoing
          </div>
        </Card.Text>
        <Button variant="dark" style={{width:"100%"}}>Join Now</Button>
      </Card.Body>
    </Card>
  );
};

export default LiveCard;