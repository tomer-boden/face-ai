import React from 'react';
import './FaceRecognition.css';
import BorderBox from './BorderBox';

const FaceRecognition = ({imageUrl, boxA}) => {
    return (
        <div className='center ma'>
            <div className="absolute mt2">
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                {
                    boxA.map((box, i) => {
                        return (
                            <BorderBox
                                key = {i}
                                top={boxA[i].topRow}
                                right={boxA[i].rightCol}
                                bottom={boxA[i].bottomRow}
                                left={boxA[i].leftCol}
                            />
                        );
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition