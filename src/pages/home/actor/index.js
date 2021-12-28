import { useNavigate } from 'react-router-dom'
import './style.css'

function Actor(props) {
  let navigate = useNavigate()
  let actor = props.Actor

  function viewPage() {
    navigate(`show/${props.ShowData.id}/actor/${props.Id}`)
  }

  return <div className="actor" onClick={viewPage} style={{"--img": `url(${actor.person.image.original})`, "--cimg": `url(${actor.character.image.original})`}}>
    <div className="info">
      <h3>{actor.person.name}</h3>
      <button className='btn'>View</button>
    </div>
  </div>
}

export default Actor