import Image from './components/Image';

import classes from './App.module.css';

function App() {

  const images = [
    "http://localhost:3000/images/img1.jpg",
    "http://localhost:3000/images/img2.jpg",
    "http://localhost:3000/images/img3.jpg",
    "http://localhost:3000/images/img4.jpg",
    "http://localhost:3000/images/img5.jpg",
    "http://localhost:3000/images/img6.jpg",
    "http://localhost:3000/images/img7.jpg",
  ];

  return (
    <div className={classes.container} >
      
      <div style={{height: "1000px"}}></div>
      
      <div
        style={{
          height: "100px",
          position: "absolute",
          width: "600px",
          border: "1px solid",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >100px height</div>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto"
        }}
      >
        {images.map((img, i) => <Image key={i} src={img} rowNumber={Math.floor(i/3)+1} />)}
      </div>

    </div>
  );
}

export default App;
