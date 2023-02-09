import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { useNavigate } from 'react-router-dom';
import useImage from 'use-image';
import './BodyDiagram.css';

export default function BodyDiagram() {
    const navigate = useNavigate();
    const stageRef = useRef(null);

    const handleClick = (e) => {
        console.log(`You clicked the ${e.target.name()}`)
        // Change this
        navigate('/PPI-graph')
    }

    const bodyX = 550;
    const lungX = bodyX + 105;

    const [bodyImage] = useImage('https://i.pinimg.com/736x/6c/be/78/6cbe78f45758fada70c7bd3671e0b3f5--body-template-the-human-body.jpg');
    const [lungImage] = useImage('https://static.vecteezy.com/system/resources/thumbnails/005/155/375/small_2x/lungs-human-icon-outline-black-color-illustration-flat-style-image-vector.jpg');
    const [isImagesLoaded, setIsImagesLoaded] = useState(false);
    const [bodyScale, setBodyScale] = useState({ x: 1, y: 1 });
    const [lungScale, setLungScale] = useState({ x: 1, y: 1 });





    return (
        <div>
            <h1>
                Body Diagram
            </h1>
            <div>
                <button onClick={() => {
                    navigate('/')
                }}>
                    Go back to landing page
                </button>
            </div>

            {/* <div className='body-diagram-container'>
                <img
                    src='https://i.pinimg.com/736x/6c/be/78/6cbe78f45758fada70c7bd3671e0b3f5--body-template-the-human-body.jpg'
                    alt='Body Diagram'
                    className='body-diagram-image'
                ></img>
                <div className='organ-images-container'>
                    <img
                        src='https://static.vecteezy.com/system/resources/thumbnails/005/155/375/small_2x/lungs-human-icon-outline-black-color-illustration-flat-style-image-vector.jpg'
                        alt='Lungs'
                        className='organ-image-lungs'
                    ></img>
                </div>


            </div>

 */}

            <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
                <Layer>
                    <Image
                        image={bodyImage} // image of the human body
                        name="body"
                        onLoad={() => setIsImagesLoaded(true)}
                        x={bodyX}
                        scaleX={0.4}
                        scaleY={0.4}
                    />
                    <Image
                        image={lungImage} // image of the lungs
                        x={lungX}
                        y={105}
                        scaleX={0.2}
                        scaleY={0.2}
                        name="lungs"
                        onClick={handleClick}
                    />
                </Layer>
            </Stage>

        </div>
    )
}


// import React, { useEffect, useRef, useState } from 'react';
// import { Stage, Layer, Image } from 'react-konva';2
// import { useNavigate } from 'react-router-dom';
// import useImage from 'use-image';
// import './BodyDiagram.css';

// export default function BodyDiagram() {
//     const navigate = useNavigate();
//     const stageRef = useRef(null);

//     const handleClick = (e) => {
//         console.log(`You clicked the ${e.target.name()}`)
//         // Change this
//         navigate('/PPI-graph')
//     }

//     const [bodyImage] = useImage("src/BodyDiagram/human.jpg"); 

//     return (
//         <div>
//         <div>
//             <h1>
//                 Body Diagram
//             </h1>
//             <div>
//                 <button onClick={() => {
//                     navigate('/')
//                 }}>
//                     Go back to landing page
//                 </button>
//             </div>
//         </div>
//     </div>
//     )}

