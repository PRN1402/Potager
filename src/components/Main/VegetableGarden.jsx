import React from 'react';
import { Link, useParams, useLocation,useNavigate } from 'react-router-dom';

function VegetableGarden() {
  
  let navigate = useNavigate();
    function handleNavigate(location) {
      navigate('/vegetables-list/parcelle/' + location.state.id, { state: location.state });
    }
  const params = useParams();

  console.log("Garden : params.state")
  console.log(params.state)
  
  
  const location = useLocation();
  console.log("garden location state");
  console.log(location.state);
  
  const {id,name,endingHarvest,friendVegetables}=location.state;
 
  return (
    <div>
    <h2>Jardin</h2>

    <Link to={'/vegetables-list/:filter'}>2e parcelle</Link>

    <div>
          <h2>{name}</h2>
          <p>Recolte : {(endingHarvest) || "Inconnu"}</p>
          <p>Amis 
          {(friendVegetables?.length) 
          ? friendVegetables.map(ami => { return <span> {ami}</span> }):""}</p> 
  
      </div>
      <button onClick={() => handleNavigate(location)}> Liste légumes </button>

    </div>
  );
};

export default VegetableGarden;