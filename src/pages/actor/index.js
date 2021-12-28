import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import "./style.css"

function Actor(props) {
  let actor = props.Actors[ useParams().actorId ]
  let [actorShows, setActorShows] = useState()
  
  useEffect(() => {
    fetch(`https://api.tvmaze.com/people/${actor.person.id}/castcredits?embed=show`)
      .then( x => x.json() )
      .then( x => { console.log(x); setActorShows(x) } )
  }, [])

  let seenShows = []
  return <div className="actorDiv">
    <div className="card actorInfo">
      <div className="cardTitle">
        <h2>{actor.person.name} {actor.person.gender === "Male" ? "♂" : "♀"}</h2>
        <p>Played {actor.character.name}</p>
        <p>Born on {actor.person.birthday} in {actor.person.country.name}</p>
      </div>

      <div className="photo" style={{"--img": `url(${actor.person.image.original})`}}></div>
    </div>

    {actorShows != null && <div className="card" style={{"animationDelay": "150ms"}}>
      <h2>Starred In</h2>
      <div className="playedInner">
        { actorShows.map( (x, ind) => {
          let showInfo = x._embedded.show;
          if( seenShows[showInfo.id] ) return <></>;
          seenShows[showInfo.id] = true;


          return <div key={ind} className="starredIn" style={{"--img": `url(${showInfo.image.original})`}}>
            <h3>{showInfo.name}</h3>

          </div>
        })}
      </div> 
    </div>}
  </div>
}

export default Actor