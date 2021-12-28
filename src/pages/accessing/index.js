import React, {useEffect, useState, useRef} from "react";
import ScrollInText from "../../components/scrollin-text.js";
import './styles.css';

let messages = [
    "Accessing Justice League Database",
    "Accessing The SCPD Database",
    "Collating Data",
]

function Accessing(props){
    let [isFinishing, setIsFinishing] = useState(false)
    let [textElements, setTextElements] = useState([])
    let body = useRef()

    useEffect(() => {
        if( isFinishing ){
            setTimeout(() => {
                props.IsLoading(false);
            }, 500)

            return;
        }

        setTimeout(() => {    
            if( textElements.length === 3){
                setIsFinishing(true);
                return;
            }

            setTextElements( [ ...textElements, messages[textElements.length] ] )
        }, 750)
    }, [isFinishing, textElements, props])

    
    return <div ref={body} className={`body ${isFinishing && "fade-out"}`}>
        <div className="inner">
            <h2><ScrollInText>Accessing Information</ScrollInText></h2>
            <div className="text">{textElements.map( (text, ind) => {
                return <p key={ind}><ScrollInText>{text}</ScrollInText></p>
            })}</div>
        </div>
    </div>
}

export default Accessing