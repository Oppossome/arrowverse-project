import React, {useEffect, useState} from "react"
import { useParams, useNavigate } from "react-router-dom"
import Shows from '../../Shows.js'
import Actor from './actor'
import Show from './show'
import './styles.css'

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function EpisodeInfo(props) {
    let navigate = useNavigate()
    
    function goBack() {
        navigate(`/show/${props.ShowData.id}`)
    }

    return <div className="epinfo card" style={{"--img": `url(${props.Episode.image.original})`}}>
        <div className="eptitle">
            <h2>{props.Episode.name}</h2>
            <p>Debuted {props.Episode.airdate}</p>
            <p>{props.Episode.rating.average}/10</p>
        </div>

        <button onClick={goBack} className="btn">Close</button>

        <p>
            {props.Episode.summary.replace(/<.*?>/g, "")}
        </p>
    </div>
}

function Home(props) {    
    let [currentSeason, setCurrentSeason] = useState(1)
    let [episodeData, setEpisodeData] = useState()
    let [actorCount, setActorCount] = useState(7)
    let naviate = useNavigate()
    let params = useParams()

    function addActors() {
        setActorCount( actorCount + 7 )
    }

    function exportActors() {
        let fileContents = "Name,Gender,Birthday,Character"

        props.Actors.forEach(element => {
            fileContents += `\n${element.person.name},${element.person.gender},${element.person.birthday},${element.character.name}`
        });        

        download(`${props.ShowData.name.toLowerCase().replace(" ", "_")}-actors.csv`, fileContents)
    }

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${props.ShowData.id}/episodes`)
            .then( x => x.json() )
            .then( x => { console.log(x); setEpisodeData(x) } )
    }, [])


    let seasons = []
    if(episodeData != null) {
        for(let i = 1; i <= episodeData[ episodeData.length - 1 ].season; i++ ){
            seasons[i - 1] = i
        }
    }

    return <div className="home">
        <div className="showinfo card" style={{"--img": `url(${props.ShowData.image.original})`, "animationDelay": "150ms"}}>
            <div className="title">
                <div className="leftside">
                    <h1 className="showname">{props.ShowData.name}</h1>
                    <p>{props.ShowData.type}</p>
                </div>

                <p className="runtime">
                    <span className="date">{props.ShowData.premiered}</span>-
                    <span className="date">{props.ShowData.ended || "Ongoing"}</span>
                </p>
            </div>

            <p>{props.ShowData.summary.replace(/<.*?>/g, "")}</p>
        </div>

        {episodeData != null && (params.epId != null ? <EpisodeInfo ShowData={props.ShowData} Episode={episodeData[params.epId]} /> : <div className="episodes card" style={{"animationDelay": "300ms"}}>
            <div className="header">
                <h2 className="text">Episodes</h2>
                <div className="seasonButtons">
                    <p>Season: </p>
                    {seasons.map( season => {
                        return <button onClick={() => setCurrentSeason(season)} key={season} className={`${season === currentSeason && "active"}`}>
                            {season}
                        </button>
                    })}
                </div>
            </div>

            <div className="episodeHolder">
                {episodeData.map( (episode, ind) => {
                    if(episode.season !== currentSeason) return;
                    if(episode.image === null) return;

                    return <div key={ind} onClick={() => naviate(`show/${props.ShowData.id}/${ind}`)} className="episode" style={{"--img": `url(${episode.image.original})`}}>
                        <div className="top">
                            <h4>{episode.name}</h4>
                            <p>{episode.rating.average}/10</p>
                        </div>
                        
                        <button class="btn">View Info</button>      
                    </div>
                })}
            </div>
        </div> )}

        <div className="actors card" style={{"animationDelay": "450ms"}}>
            <h2 className="text">Actors</h2>
            <div className="inner">
                {props.Actors.slice(0, actorCount).map( (data, ind) => {
                    return <Actor ShowData={props.ShowData} Id={ind} Actor={data} key={ind} />
                })}
            </div> 

            <div>
                { actorCount < props.Actors.length &&
                    <button onClick={addActors} className="btn">Show More</button> }

                <button onClick={exportActors} className="btn export">Export</button>
            </div>
        </div>

        <div className="averse card" style={{"animationDelay": "600ms"}}>
            <h2 className="text">Other Arrowverse Shows</h2>
            <div className="showholder">
                {Shows.map(x => {
                    if(props.ShowData.id === x.Id) return null;
                    return <Show key={x.Id} Show={x}/> 
                })}
            </div>
        </div>
    </div>
}


export default Home