import  Axios  from 'axios';
import React, {useEffect,useState} from 'react';
import Vegetable from './Vegetable';
import { Link, useParams, useLocation,useNavigate } from 'react-router-dom';
function VegetableList() {
  const [vegetablesList,setVegetablesList] = useState([]); 
  const [listePage,setListePage] = useState([]); 
 const [page, setPage] = useState(1);
const [ pageNumber, setPageNumber ] = useState(1);
// useEffect(   getApi(),[]);
 
useEffect(()=>{
  Axios
  .get('https://potager-compatible-api.herokuapp.com/api/vegetables')
  .then((response) => response.data)
  .then(data=>{
    setVegetablesList(data);
    setPageNumber(Math.ceil(data.length/8));
    
   
  });
  },[]);


  const params=useParams();

  console.log("vegatables list : params")
  console.log(params)

  const location = useLocation();
  console.log("vegetables list location state");
  console.log(location.state);

  
function filterFriends(location){
  getApi();
  console.log("filterFriends location state");
   console.log(location.state);

    const {id,name,endingHarvest,friendVegetables}=location.state;
    console.log("friendVegetables");
    console.log(friendVegetables);

    console.log(vegetablesList);
    console.log("vegetablesList");

    const friendsListe=[];
    // crée la liste des lég associés
    friendVegetables.forEach((friend)=>{
      console.log(friend);
      console.log(vegetablesList.length);
      for (let i=0;i<vegetablesList.length-1;i++){
        console.log(vegetablesList[i].name);
        if (vegetablesList[i].name===friend) friendsListe.push(vegetablesList[i]);
      }

});

console.log("friendsListe");
console.log(friendsListe);
setPageNumber(Math.ceil(friendsListe.length/8));

tri(friendsListe);

return friendsListe

}
function tri(liste){

  let sorted=false;
  let buff="";
  while (!sorted) {
    sorted=true;
  for (let i=0; i<liste.length-2;i++){
    let taille1=liste[i].friendVegetables.length;
    let taille2=liste[i+1].friendVegetables.length;
    if (taille1 < taille2){
      sorted=false;
      buff=liste[i];
      liste[i]=liste[i+1];
      liste[i+1] =buff;
    }
    // console.log(liste[i].friendVegetables.length);
  }
  };

}  

 const  getListePage = (page,vegListe)=> {
    const listePage=[];
    for(let i=(page-1)*8; i<(page-1)*8 +8 ; i++){
 //       console.log(vegetablesList[i]);
        if(vegetablesList[i]) listePage.push(vegetablesList[i]);
      }
 //    console.log("listePage");

    return listePage;

    
  };
    
    function handlePageChange(value) {
      setPage(value);
    }
    
    const pageButtons = Array(pageNumber)
    .fill(0)
    .map((value, index) => (
        <button
          className={page === index + 1 ? 'selected-page' : ''}
          disabled={page === index + 1}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ));

      
    return (
      <div className="App">
        {tri(vegetablesList)}
        
      
      <h1>Liste des légumes</h1>
      Page : { page }
      <div>
      <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
        Précédente
      

      </button>
      {pageButtons}
      <button
        disabled={page === pageNumber}
        onClick={() => handlePageChange(page + 1)}
        >
        Suivante
      </button>
      
      </div>
          
      <section>
         { location.state ? getListePage(page,filterFriends(location)).map((veg, index) => {
            return <Vegetable veg={veg} key={index}/>
          }) : getListePage(page,vegetablesList).map((veg, index) => {
            return <Vegetable veg={veg} key={index}/>
          })

         }
      </section>

      
    </div>
  );

};
  
export default VegetableList;

