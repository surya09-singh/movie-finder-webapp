import { useState } from "react";
import { Button, Carousel} from "react-bootstrap";
import { useEffect } from "react";

export default function Slider(props){
    const[data,setData] = useState()

    useEffect(()=>{
        fetch('http://localhost:5000/movies')
        .then((response)=> response.json())
        .then((data)=>{
          console.log(data);
          setData(data);
  
        });
  
      },[])
       return(
        <div>
              <div>
        <Carousel data-bs-theme="dark">
          {data && data.map((item,index) =>{
            return(
            <Carousel.Item key ={index}>
              <img 
              className="d-block w-100"
              height={500}
              width={100}
              src={item.posterUrl}
              alt="First slide"
              />

          </Carousel.Item>
       
            )
          })}
           </Carousel>
       
        </div>
        </div>
    )
}