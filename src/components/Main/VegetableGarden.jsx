import React , {useEffect,useState}  from 'react';
import { Link, useParams, useLocation,useNavigate } from 'react-router-dom';
function VegetableGarden() {
let elements=[]
  const  [lStVegs,setlStVegs] = React.useState([]);
  useEffect(() => { 
    // Je récupère le tableau du local storage
    let tabLST = JSON.parse(localStorage.getItem('vegetables'));

    // S'il existe j'ajoute le légume
    if (tabLST&&tabLST.length<5) tabLST.push({ id:location.state.id,name: location.state.name,friendVegetables:location.state.friendVegetables, enemyVegetables: location.state.enemyVegetables })

       // Sinon je crée un nouveau tableau avec le légume
    if  (!tabLST) tabLST = [{ id:location.state.id,name: location.state.name, friendVegetables:location.state.friendVegetables, enemyVegetables: location.state.enemyVegetables }];

    // Je sauve le tableau modifié dans le local storage
    localStorage.setItem('vegetables', JSON.stringify(tabLST));
    setlStVegs(tabLST);

  

  }, []);

  
  let navigate = useNavigate();
    function handleNavigate(location) {
      navigate('/vegetables-list/parcelle/' + location.state.id, { state: location.state });
    }
  const params = useParams();

  const location = useLocation();

  
  for (let i=0;i<lStVegs.length;i++){
    
    lStVegs[i].style="P"+i;
  }

  elements= lStVegs.map((veg)=> (
  
    <div className={veg.style}>
    <h1>{veg.name}</h1>
    <p><h3>Amis</h3> </p> 
         <p> {(veg.friendVegetables?.length) 
          ? veg.friendVegetables.map(ami => { return <span> {ami}</span> }):""}</p> 
          <p><h3>Ennemis </h3></p>
          <p>{(veg.enemyVegetables?.length) 
          ? veg.enemyVegetables.map(ami => { return <span> {ami}</span> }):""}</p> 

    </div>
   
    ))

  return (
    <div>
    <h2>Parcelles </h2>

    <div className='container'>
    {elements}

    </div>
    <button onClick={() => handleNavigate(location)}> Liste légumes </button>
    </div>
  );
};

export default VegetableGarden;