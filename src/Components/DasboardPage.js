import { Col, Row, Container, Button, Form,Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Edit.css";
import { useNavigate } from "react-router-dom";
import Slider from "./Slider";
import RandomCard from './RandomCard'
export default function DasboardPage() {
  const [users, setUsers] = useState();
  const navigate = useNavigate();
//   const [data, setData] = useState();
  const [movie, setMovie] = useState();
  const [searchresult, setSearchResult] = useState();
  const [moviedata,setMoviedata] = useState([]);
  const [random,setRandom] = useState([]);

  const shuffleArray=(array) =>{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setRandom(array)
  }
  

  useEffect(() => {
    fetch(" http://localhost:5000/genres")
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        setUsers(users);
      });
    fetch(" http://localhost:5000/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
        setMoviedata(data);
        shuffleArray(data)
      });
  }, []);

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    if (input.length !== 0) {
      let response = [];
      response = movie.filter((d) => {
        return d.title.toLowerCase().search(input) !== -1;
      });
      setSearchResult(response);
    } else {
      setSearchResult([]);
    }
    console.log(searchresult);
  };

  const SubmitSave = () =>{
    localStorage.clear();
    navigate('/save');
  }

  const Submit = () => {
    localStorage.clear();
    navigate("/register");
  };
console.log(random, "props 6")
  return (
    <Container>
      <div style={{ marginLeft: "1120px" }} className="mt-3">
        <Button variant="primary" type="submit" onClick={() => Submit()}>
          SingIn/SingUp
        </Button>
      </div>
      <div style={{ marginBottom: "30px" }} className="mt-3">
         <Button variant="primary" type="submit" onClick={() => SubmitSave()}>
          SaveVideo
        </Button>
        </div>
      <Row>
        <Col sm={3} className="bg-success">
          {users &&
            users.map((item,index) => {
              return( 
                 <ul key={index}>
                <Link to="/preferedmovie" state={{value:item}}>{item}</Link>
            </ul>
              )
            })}
        </Col>
        <Col sm={9} className="mt-3">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <Row>
            {searchresult &&
              searchresult.map((item, index) => {
                return (
                  <Col className="mt-3">
                    {/* <p>{item.title}</p> */}
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
                  </Col>
                );
              })}
          </Row>
          <Col sm={9}className="mt-3"  >
            <Slider  data={moviedata}/>
          </Col>


          {random?.length !== 0 && (
            <Col sm={9}className="mt-3"  >
            <RandomCard data={random.slice(0, 4)} />
          </Col>
          )}
          
        </Col>
        </Row>
    </Container>
  );
}
