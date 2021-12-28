import React, {useEffect, useState} from "react";


function ScrollInText(props) {
    let [charCount, setCharCount] = useState(0)

    useEffect(() => {
        let typeEffect = setTimeout(() => {
            if(charCount + 1 < props.children.length + 1){
                setCharCount( charCount + 1 )
            }
        }, props.Speed || 50)

        return () => 
            clearTimeout(typeEffect)
    }, [charCount, props.Speed])


    let eText = props.children.substring(0, charCount) 
    return <>{eText === "" ? " " : eText}</>
}

export default ScrollInText