/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */

import { Link } from "react-router-dom";

const HomePageView = () => {
  // Render Home page view
  return (
    <div >
      <h1>Home Page</h1>
      <br/><br/><br/>
      <div style={{display:"flex",justifyContent:"center"}}>
        <div style={{display:"flex",flexDirection:"column",marginRight:100}}>
          <img src="https://images.fineartamerica.com/images-medium-large-5/1-borzoi--russian-wolfhound-art-canvas-print-sandra-sij.jpg" width="400" />
          <br/>
          <Link to='/campuses'>
            <button>View All Campuses</button>
          </Link>
        </div>
        <div style={{display:"flex",flexDirection:"column"}}>
          <img src="https://www.nationalborzoiclub.com/wp-content/uploads/2021/12/Borzoi-Colors-2.jpg" height="300" />
          <br/>
          <Link to='/students'>
            <button>View All Students</button>
          </Link>
        </div>
      </div>
    </div>
  );    
}

export default HomePageView;