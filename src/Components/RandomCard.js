import {Card} from "react-bootstrap";
// import { useState } from "react";
// import { useEffect } from "react";

export default function RandomCard({data}){


console.log(data, "props ")

     return(

        <div className="row">
            {data &&
           data.map((item,index)=>{
                return(

                    <>
                     <div className='col-sm-3'>
           <Card style={{ width: "10rem" }}>
                      <Card.Img
                        variant="top"
                        height="100"
                        width={100}
                        src={item.posterUrl}
                      />
                      <Card.Body>
                        <Card.Title></Card.Title>
                        <Card.Text>{item.title}</Card.Text>
                      </Card.Body>
                    </Card>
        </div>
        
                    </>

                )
                
            })}
            
            </div>
        
    )
}