import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
	const facesArr = ()=> {
	    if(box){
	     const newArr =  box.map(face => {
	        return <div className="bounding-box" key={shortid.generate()} style={{top:face.topRow,left:face.leftCol,right:face.rightCol, bottom:face.bottomRow}}></div>
	      })
	      return newArr
	    }
	    return null
	 }

	  return (
	    <div style={{position:'relative',width:'30%',margin:'0 auto'}}>
	      {imageUrl?<img id="inputImage"  src={imageUrl} alt="recognImage" style={{position:'relative'}} className="imageFaces"/>:null}
	      {facesArr()}
	    </div>
	  )
	// return (
	// 	<div className='center ma'>
	// 		<div className = 'absolute mt2'>
	// 			<img id="inputimage" alt='' src={imageUrl} width='500px' height='auto'/>
	// 			<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
	// 		</div>
	// 	</div>
	// );
};

export default FaceRecognition;