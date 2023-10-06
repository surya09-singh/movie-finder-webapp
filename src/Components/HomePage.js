import { Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
// import { useEffect } from "react";
// import { useState } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  // const[data,setData] = useState()

  // useEffect(()=>{
  //   fetch('http://localhost:5000/movies')
  //   .then((response)=> response.json())
  //   .then((data)=>{
  //     console.log(data);
  //     setData(data);

  //   });

  // },[])
  const handleSubmit = () =>{
    localStorage.clear();
    navigate("/dasboardpage")
  }

  const Submit = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <div className="mt-3">
      <div style={{ marginLeft: "1120px" }} className="mt-3">
        <Button variant="primary" type="submit" onClick={() => Submit()}>
          SingIn/SingUp
        </Button>
      </div>
      {/* <div>
        <Carousel data-bs-theme="dark">
          {data && data.map((item,index) =>{
            return(
            <Carousel.Item key ={index}>
              <img 
              className="d-block w-100"
              height={700}
              src={item.posterUrl}
              alt="First slide"
              />

          </Carousel.Item>
       
            )
          })}
           </Carousel>
       
        </div> */}
      <Slider />
      <div>
        <Button onClick={()=>handleSubmit()}>Explore More</Button>
      </div>
    </div>
  );
}
