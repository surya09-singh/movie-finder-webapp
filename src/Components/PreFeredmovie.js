import React, { useEffect, useState } from 'react'
import { Button, Card} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SaveVideo,RemoveAddVideo } from './AuthSlice';
import { useSelector } from 'react-redux';


export default function PreFeredmovie() {
  const [dataitem, setDataitem] = useState([])
  const [refresh,setrefresh] = useState()
  const dispatch = useDispatch();
  const Save = useSelector((state) => state.auth.SaveVideo)

  const location = useLocation();
  // console.log(location)

  const handleSubmit = (item) =>{
    let value =   item.like +1
    if (!item.hasOwnProperty('like')) {
      value = 1;
    }
    let unlike = item.unlike
    if (!item.hasOwnProperty('unlike')) {
      unlike = 0
    }


    const user={
      "title":item.title,
      "year":item.year,
      "runtime":item.year,
      "genres":item.genres,
      "director":item.director,
      "actors":item.actors,
      "plot":item.plot,
      "posterUrl":item.posterUrl,
      "like":value,
      "unlike":unlike,
    }
    console.log(value, unlike, item, item.hasOwnProperty('like'));
    update(user,item.id)
  }

  const Submit = (item) =>{
    let value =   item.like 
    if (!item.hasOwnProperty('like')) {
      value = 0;
    }
    let unlike = item.unlike + 1
    if (!item.hasOwnProperty('unlike')) {
      unlike = 1;
    }


    const user={
      "title":item.title,
      "year":item.year,
      "runtime":item.year,
      "genres":item.genres,
      "director":item.director,
      "actors":item.actors,
      "plot":item.plot,
      "posterUrl":item.posterUrl,
      "like":value,
      "unlike":unlike,
    }
    console.log(value, unlike, item, item.hasOwnProperty('unlike'));
    update(user,item.id)
  }
const update=(user,id)=>{
  fetch('http://localhost:5000/movies/'+ id,{
    method:'PUT',
    body:JSON.stringify(user),
    headers: {'Content-Type': 'application/json'},
  })
  .then(res => res.json(user))
  .then((response)=>{
    console.log(response);
    setrefresh(!refresh)

  })
}
   
  

useEffect(() => {
    fetch("http://localhost:5000/movies")
    .then((response) => response.json())
    .then((data)=> {
        console.log(data);
        const filteredMovies = data.filter(movie => movie?.genres?.find((d) => d !== location?.state?.value));
        // const filteredMovies = dataitem.filter((movie)=>movie.genres==="Fantasy")
        console.log('her my filter', filteredMovies)
        setDataitem(filteredMovies)

      }).catch((err) => {
        console.log("please start json server", err)
      })
  }, [!refresh])


   const Savevideo = (item)=>{

item.saved = true;
// if (!isDataExists) {
dispatch(SaveVideo(item))
// }
   }
   const checkSaveData =(item) =>{
    let check = Save.find(d=> d.id == item.id)
      if(check){
        return false
      }else{
        return true
      }
   }
   const removeSaveVideo = (item)=>{
    let myobj = Save?.filter(v => v.id !== item.id);
    dispatch(RemoveAddVideo(myobj))
   }
  
  return (
    <div>
      <div className='row'>
        {dataitem && dataitem.map((item, index) => {
          return (
            <Card style={{ width: '20rem' }} key={index}  className='moviecard col-sm-10 p-2' >
              <Card.Img variant="top"  height="100"  width={100} src={item.posterUrl} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Title>
                  <ul>
                    <li>{item.genres}</li>
                  </ul>
                </Card.Title>
                <Card.Title>{item.director}</Card.Title>

                <Button type='submit' onClick={()=>handleSubmit(item)}>Like:{item.like}</Button>

                <Button type='submit' onClick={()=>Submit(item)}>Dislike:{item.unlike}</Button>
                {
                  checkSaveData(item)  && (
<Button type='submit'onClick={()=>Savevideo(item)} >Save</Button>
                  )
                }
                  {
                  checkSaveData(item) == false  && (
<Button type='submit'onClick={()=>removeSaveVideo(item)}>UnSave</Button>
                  )
                }
                 </Card.Body>
                 </Card>
                 )
                  })}
                  </div>
                  </div>
                  )
                }
