import React, {useState} from 'react';
import Vegetable from './Vegetable';
import { useParams, useLocation } from 'react-router-dom';
import {verifCompatible, triCoin,verifCoherenceListe,triAssociab} from  "../outils.mjs"

//=======================
function VegetableList() {

  let vegetablesList = [] 
  const [listePage,setListePage] = useState([]); 
 const [page, setPage] = useState(1);
let pageNumber=1;

let listLOCSTOR=[]


  const params=useParams();
  const location = useLocation();
//===============================================================================
//Fonction qui filtre la liste des légumes récupérée du local Storage (CF App.js)  
//================================================================================
function tri(){
  let liste =JSON.parse(localStorage.getItem('listVegetables'))
  vegetablesList=liste
  verifCoherenceListe(liste)
  
  
  if (listLOCSTOR&&listLOCSTOR.length > 4 &&listLOCSTOR.length < 8){
    triCoin(listLOCSTOR,liste);
   }
    else{
  
  let tabComp=[]
  //recherche des meilleurs amis du ou des lég déjà choisis pour les parcelles, avant de traiter le reste de la liste

  if (listLOCSTOR){
    let listFriends=[]
    listLOCSTOR.forEach(it=>{
      verifCompatible(it,liste,tabComp,true)      
    })

  }

  liste.forEach(element => {
    if (!listLOCSTOR.find(it => it.name===element.name))
    verifCompatible(element,liste,tabComp,false)
   });
  
  //rempli si on vient de garden - il faut filtrer sur le ou les légumes centraux)



  if (listLOCSTOR){
    let listTrav=[]
    if (listLOCSTOR.length<3) {
      listTrav=listLOCSTOR
    }
      if (listLOCSTOR.length===3) {
      listTrav.push(listLOCSTOR[0])
      listTrav.push(listLOCSTOR[1])
    }
    if (listLOCSTOR.length===4) {
      listTrav.push(listLOCSTOR[0])
      listTrav.push(listLOCSTOR[2])
      listTrav.push(listLOCSTOR[3])
    }  

    listTrav.forEach(leg=>{
      leg.enemyVegetables.forEach(en=>{
        let obj = liste.find(obj =>obj.name===en)
        if (obj) obj.moy=-1
      })
    })

    liste.forEach(leg=>{
      leg.enemyVegetables.forEach(en=>{
        let obj = listTrav.find(obj =>obj.name===en)
        if (obj) leg.moy=-1
      })
    })
  }

// tri de la liste pour présenter les lég les plus associables en premier
 triAssociab(liste)

}
}

 const  getListePage = (page)=> {

    const listePage=[];
    for(let i=(page-1)*8; i<page*8  ; i++){
        if(vegetablesList[i]) listePage.push(vegetablesList[i]);
      }

    return listePage;

    
  };
    
    function handlePageChange(value) {
    setPage(value);
    }
    
    const pageButtons = Array(5)
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

    let parcelles=[]
    listLOCSTOR= JSON.parse(localStorage.getItem('vegetables'));

    if (listLOCSTOR){
    for (let i=0;i<listLOCSTOR.length;i++){
      
      listLOCSTOR[i].style="P"+i;
    }
    }
      
    
    parcelles= listLOCSTOR.map((veg)=> (
      <div className={veg.style}>
      <h3>{veg.name}</h3>
    
      </div>
    ))
     
    return (
      <div className="container2">
        <div className='parcelles'>
        
         {parcelles}
        </div>

      <div className='listeLegumes'>
      {tri()}
      
      
     <h2>Liste des légumes</h2>
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
    
    
      <div>
      { getListePage(page).map((veg, index) => {
            return <Vegetable veg={veg} key={index}/>
          }) 
         }
      </div>

      </div>
    </div>
  );

};
  
export default VegetableList;

