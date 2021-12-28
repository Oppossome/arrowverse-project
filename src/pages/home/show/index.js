import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import "./style.css"


function Show(props) {
  let [showData, setShowData] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${props.Show.Id}`)
      .then(data => data.json())
      .then(res => setShowData(res))
  }, [])

  function viewShow() {
    navigate(`/show/${props.Show.Id}`)

  }


  return (!showData ? <></> : 
  <div onClick={viewShow} class="show" style={{"--img": `url(${showData.image.original})`, "--text-accented-dark": props.Show.Color}}>
    <h3>{showData.name}</h3>
    <button className="btn">View</button>
  </div>)
}

export default Show