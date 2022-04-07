import { useNavigate } from 'react-router-dom';

function Vegetable(veg){
  let navigate = useNavigate();
  function handleNavigate(veg) {
    navigate('/vegetable-garden/parcelle/' + veg.id, { state: veg });
  }

  const {id,name,endingHarvest,friendVegetables,enemyVegetables}=veg.veg;
  return(
      <div>
          <h2>{name}</h2>
          <p>Recolte : {(endingHarvest) || "Inconnu"}</p>
          <p>Amis 
          {(friendVegetables?.length) 
          ? friendVegetables.map(ami => { return <span> {ami}</span> }):""}</p> 
          <p>Ennemis 
          {(enemyVegetables?.length) 
          ? enemyVegetables.map(ami => { return <span> {ami}</span> }):""}</p> 
          <button onClick={() => handleNavigate(veg.veg)}> Parcelle </button>
 
      </div>
  )
}


export default Vegetable;