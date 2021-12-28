import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, {useEffect, useState} from "react"
import Accessing from "./pages/accessing"
import Actor from "./pages/actor"
import Home from "./pages/home"
import Shows from "./Shows.js"
import './App.css';

function App() {
  let [isDoneLoading, setDoneLoading] = useState(false)
  let [isLoading, setIsLoading] = useState(true)
  let [showData, setShowData] = useState(null)
  let [series, setSeries] = useState("4");
  let [actors, setActors] = useState()  

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${series}`)
    .then(data => data.json())
    .then(res => setShowData(res))
    
    fetch(`https://api.tvmaze.com/shows/${series}/cast`)
    .then(data => data.json())
    .then(res => setActors(res))
  }, [series])
  
  useEffect(() => {
    setDoneLoading( !isLoading && showData !== null && actors != null )
  }, [showData, isLoading, actors])
  
  function checkTimer() {
    let pathArg = window.location.pathname.match(/show\/(\d+)/)
    if( pathArg && pathArg[1] !== series ){
      setSeries( pathArg[1] )
      setIsLoading(true)
      setShowData(null)
      setActors(null)
    } 
  }

  useEffect(() => {
    let interv = setInterval(checkTimer, 500)
    return () => clearInterval(interv)
  })

  let showColor = Shows.find( x => x.Id === series * 1)
  showColor = showColor != null && showColor.Color

  return (
    <div className="App" style={{"--text-accented-dark": showColor}}>
      { !isDoneLoading ? <Accessing IsLoading={setIsLoading}></Accessing>
        : <BrowserRouter>
            <Routes>
              <Route path="show/:showId/actor/:actorId" element={<Actor ShowData={showData} Actors={actors} />} />
              <Route path="show/:showId/:epId" element={<Home ShowData={showData} Actors={actors} />} />
              <Route path="*" element={<Home ShowData={showData} Actors={actors} />} />
            </Routes>
        </BrowserRouter>}
    </div>
  );
}

export default App;
