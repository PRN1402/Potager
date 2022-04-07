 
 //===============================================
//===============================================
//triCoin :  fonction ppale pour remplir les 4 coins à partir des  5 parcelles récupérées du local storage  (tabLST) 
//===============================================
//===============================================

export function triCoin(tabLST,liste){
  
 //coins : stocke toutes les possibilités de coins
  let coins=[]
      
let listTrav=[]

coins=rechCoin(tabLST,liste) 
// tous les légumes favorables possibles pour les coins ss 2blons
listTrav=creeListTrav(coins)

let coinsleg=[]
let boucle =false
// recherche d'un coin (rechLegCoin) et suppr du légume  des listes de travail (MajListTrav.. coins et lisTrav)  
while (coins.length>0 && listTrav.length>0 && !boucle){
  let taille1 =coins.length
  let taille2 =listTrav.length
  
  coinsleg=rechLegCoin(coins,listTrav,coinsleg)

  if (coinsleg.length!==0){
    majListTrav (coinsleg,coins,listTrav)
  }
  if (taille1 ===coins.length || taille2 === listTrav.length)
    boucle =true
}
//si les coins ne sont pas tous remplis on cherche des légumes non défavorables
let myFriends=[]
tabLST.forEach(veg => {
  let obj =liste.find(obj=> obj.id===veg.id)
  myFriends.push(obj)
})

let coinRempli = coinsleg.find(leg=>leg.idCoin==="HG")

if (!coinRempli){
  let trouve=false
  let i =0
  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[1].enemyVegetables.includes(ami) && !myFriends[2].enemyVegetables.includes(ami)&&
    (myFriends[1].friendVegetables.includes(ami) || myFriends[2].friendVegetables.includes(ami))
    &&!(coinsleg.find(leg=>leg.ami===ami)))
     {
      trouve=true
      let obj={ 
        idCoin:"HG",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
        

  }
  coinRempli = coinsleg.find(leg=>leg.idCoin==="HG")
if (!coinRempli){
  trouve=false
  i =0

  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[1].enemyVegetables.includes(ami) && !myFriends[2].enemyVegetables.includes(ami)
    )
     {
      trouve=true
      let obj={ 
        idCoin:"HG",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
  }
}
}

coinRempli = coinsleg.find(leg=>leg.idCoin==="HD")

if (!coinRempli){
  let trouve=false
  let i =0
  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[1].enemyVegetables.includes(ami) && !myFriends[3].enemyVegetables.includes(ami)&&
    (myFriends[1].friendVegetables.includes(ami) || myFriends[3].friendVegetables.includes(ami))
    &&!(coinsleg.find(leg=>leg.ami===ami)))
     {
      trouve=true
      let obj={ 
        idCoin:"HD",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
}
coinRempli = coinsleg.find(leg=>leg.idCoin==="HD")
if (!coinRempli){
  trouve=false
  i =0

  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[1].enemyVegetables.includes(ami) && !myFriends[3].enemyVegetables.includes(ami)
    )
     {
      trouve=true
      let obj={ 
        idCoin:"HD",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
  }
}
}

coinRempli = coinsleg.find(leg=>leg.idCoin==="BG")

if (!coinRempli){
  let trouve=false
  let i =0
  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[2].enemyVegetables.includes(ami) && !myFriends[4].enemyVegetables.includes(ami)&&
    (myFriends[2].friendVegetables.includes(ami) || myFriends[4].friendVegetables.includes(ami))
    &&!(coinsleg.find(leg=>leg.ami===ami)))
     {
      trouve=true
      let obj={ 
        idCoin:"BG",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
}
coinRempli = coinsleg.find(leg=>leg.idCoin==="BG")
trouve=false
i =0

if (!coinRempli){
  trouve=false
  i =0
  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[2].enemyVegetables.includes(ami) && !myFriends[2].enemyVegetables.includes(ami)
    )
     {
      trouve=true
      let obj={ 
        idCoin:"BG",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
  }
}
}

coinRempli = coinsleg.find(leg=>leg.idCoin==="BD")

if (!coinRempli){
  let trouve=false
  let i =0
  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[3].enemyVegetables.includes(ami) && !myFriends[4].enemyVegetables.includes(ami)&&
    (myFriends[3].friendVegetables.includes(ami) || myFriends[4].friendVegetables.includes(ami))
    &&!(coinsleg.find(leg=>leg.ami===ami)))
     {
      trouve=true
      let obj={ 
        idCoin:"BD",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
}
coinRempli = coinsleg.find(leg=>leg.idCoin==="BD")
trouve=false
i =0

if (!coinRempli){
  while (i<myFriends[0].friendVegetables.length && !trouve){
    let ami =myFriends[0].friendVegetables[i]
    if  (!myFriends[3].enemyVegetables.includes(ami) && !myFriends[4].enemyVegetables.includes(ami)
    )
     {
      trouve=true
      let obj={ 
        idCoin:"BD",
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
  }
}
}

let tabAngle=[]
tabAngle.push(coinsleg.find(obj=>obj.idCoin==="HG"));
tabAngle.push(coinsleg.find(obj=>obj.idCoin==="HD"));
tabAngle.push(coinsleg.find(obj=>obj.idCoin==="BG"));
tabAngle.push(coinsleg.find(obj=>obj.idCoin==="BD"));

coinsleg=tabAngle
let myCoins=[]
liste.forEach(leg => {leg.coin=""})
//modif liste avec le champ coin pour permettre le tri
liste.forEach(leg => {
    let obj =coinsleg.find(obj=> obj.ami===leg.name)
    if (obj) leg.coin =obj.idCoin
  
  })
triListeCoin(liste);
//ajout des coins ds le local storage Parcelle (vegetables)
let tabCoin = JSON.parse(localStorage.getItem('vegetables'));

//fusionner tabLST2 avec les coins
coinsleg.forEach(leg=> {
    let obj =liste.find(obj=> obj.name===leg.ami)
    if (obj) {
      leg ={id:obj.id,name:obj.name,friendVegetables:obj.friendVegetables,enemyVegetables:obj.enemyVegetables}
      tabCoin.push(leg) 
    }
  })
// Je sauve le tableau modifié dans le local storage
localStorage.setItem('vegetables', JSON.stringify(tabCoin));


}
//==============================================
//rechercher les leg possibles pour chaque coin (favorables avec tous les légumes encadrant ce coin)
//==============================================
function rechCoin (listLOCSTOR,liste) {
  let coins=[]
  let myFriends=[]
  //pour ajouter les légumes amis à la liste des légumes des 5 parcelles (récupérée du local storage)
  listLOCSTOR.forEach(veg => {
    let obj =liste.find(obj=> obj.id===veg.id)
    myFriends.push(obj)
  })

//récup de tous les amis des légumes des 5  parcelles pour préparer la liste des candidats pour les coins (HG :Haut Gauche)  
myFriends[0].friendVegetables.forEach(ami => {
  if (myFriends[1].friendVegetables.includes(ami) && myFriends[2].friendVegetables.includes(ami))
  {
    let obj={ 
      idCoin:"HG",
      id1:myFriends[0].id,
      id2:myFriends[1].id,
      id3:myFriends[2].id,
      ami:ami}
      coins.push(obj)
  }  })
      
myFriends[0].friendVegetables.forEach(ami => {
  if (myFriends[1].friendVegetables.includes(ami) && myFriends[3].friendVegetables.includes(ami))
  {
    let obj={ 
      idCoin:"HD",
      id1:myFriends[0].id,
      id2:myFriends[1].id,
      id3:myFriends[3].id,
      ami:ami}
      coins.push(obj)
  }  })
                
myFriends[0].friendVegetables.forEach(ami => {
  if (myFriends[2].friendVegetables.includes(ami) && myFriends[4].friendVegetables.includes(ami))
  { 
   let obj={ 
      idCoin:"BG",
      id1:myFriends[0].id,
      id2:myFriends[2].id,
      id3:myFriends[4].id,
      ami:ami}
      coins.push(obj)
  }  })

myFriends[0].friendVegetables.forEach(ami => {
  if (myFriends[3].friendVegetables.includes(ami) && myFriends[4].friendVegetables.includes(ami))
    {
    let  obj={ 
        idCoin:"BD",
        id1:myFriends[0].id,
        id2:myFriends[3].id,
        id3:myFriends[4].id,
        ami:ami}
        coins.push(obj)
      }  })
            
   return coins     
        
}

//==========================================
//pour éliminer les 2blons de légumes possibles pour les coins 
function creeListTrav(coins){
  let listTrav=[]
listTrav.push(coins[0].ami)
  coins.forEach(itm=> {
    if (!listTrav.includes(itm.ami))listTrav.push(itm.ami)

  })
  return listTrav
}
 
 //==============
 export function verifCoherenceListe(liste){

 
    liste.forEach(leg=>{
      leg.enemyVegetables.forEach(veg=>{
        let obj=liste.find(obj=>obj.name===veg)
        if (!obj.enemyVegetables.includes(leg.name))
        obj.enemyVegetables.push(leg.name)
        
      })
    })

    liste.forEach(leg=>{
      leg.friendVegetables.forEach(veg=>{
        let obj=liste.find(obj=>obj.name===veg)
        if (!obj.friendVegetables.includes(leg.name))
        obj.friendVegetables.push(leg.name)
        
      })
    })
  liste.forEach(leg=>{
    if (leg.friendVegetables.includes(leg.name)){
      let tb=leg.friendVegetables.filter(a=>a!==leg.name)
      leg.friendVegetables=tb
    }
    if (leg.enemyVegetables.includes(leg.name)){
      let tb=leg.enemyVegetables.filter(en=>en!==leg.name)
      leg.enemyVegetables=tb
    }
    
  })
  
  liste.forEach(leg=>{
    leg.friendVegetables.forEach(a=>{
      if (leg.enemyVegetables.includes(a))
      {
        let obj=liste.find(obj=>obj.name===a)
        if (obj.friendVegetables.includes(leg.name)){
          let tb=obj.enemyVegetables.filter(en=>en!==leg.name)
          leg.enemyVegetables=tb
        }
      }
    })
  })
  }
  //=================================================================================================
//pour chaque ami de item (un légume)  , vérifier la compatibilité des amis de chaque légume de la liste
//=================================================================================================

export function verifCompatible(item,liste,tabObjComp){
  let tabComp =[]
  
  liste.forEach((veg)=>{
    if (veg.name!==item.name && !item.enemyVegetables.includes(veg.name)){
      let nbCompat=0
      veg.friendVegetables.forEach(friend=>{
        item.friendVegetables.forEach(it => {
          if (it ===friend) nbCompat++
        })
      })
      if (nbCompat>2){ let obj={id:veg.id,nb:nbCompat,name:veg.name}
     
        tabComp.push(obj);
      }
    }   
  })
let objComp={id:item.id,tb:tabComp}
tabObjComp.push(objComp)
}

export function triAssociab(liste){

  let sorted=false;
  let buff="";
  while (!sorted) {
    sorted=true;
    for (let i=0; i<liste.length-1;i++){
      let moy1=liste[i].moy;
      let moy2=liste[i+1].moy;
     if (moy1 < moy2){
        sorted=false;
        buff=liste[i];
        liste[i]=liste[i+1];
        liste[i+1] =buff;
      }
      // console.log(liste[i].friendVegetables.length);
    }
  };

};

function triListeCoin(liste){

  let sorted=false;
  let buff="";
  while (!sorted) {
    sorted=true;
    for (let i=0; i<liste.length-1;i++){
      let coin1=liste[i].coin;
      let coin2=liste[i+1].coin;
     if (coin1 < coin2){
        sorted=false;
        buff=liste[i];
        liste[i]=liste[i+1];
        liste[i+1] =buff;
      }
    }
  };

};
//==========================================
//on remlit les coins   avec des lég présents 1 seule fois  
function rechLegCoin(coins,listeTrav,coinsleg){
  //==========================================
  
  let i=0
  let nb=0
  let ami=""
  let idc=""
  
    while (i<=listeTrav.length) 
    {
      nb=0
      ami=""
      idc=""
    coins.forEach(coin => {if (coin.ami===listeTrav[i] )
      { 
        nb++
        ami=coin.ami
        idc=coin.idCoin
        }
  })
      
      if (nb===1 ||listeTrav.length ===1) {
       
        let obj={idCoin:idc,ami:ami}
        
        coinsleg.push(obj )
        break
      }
      i++
  }
  return coinsleg
  }
  
  
  export function majListTrav(coinsleg,coins,listeTrav){

  
  
  //on retire les légumes sélectionnés : le dernier ajouté dans la liste coinsleg (cf rechLegCoin)
   let param=coinsleg[coinsleg.length-1].ami
   
   coins.filter(leg=>leg.ami!==param)
  
  
  //on retire les légumes sélectionnés : le dernier ajouté dans la liste coinsleg (cf rechLegCoin)
    param=coinsleg[coinsleg.length-1].idCoin
    
    coins.filter(leg=>leg.idCoin!==param)
   
   
  //on retire les légumes sélectionnés : le dernier ajouté dans la liste coinsleg (cf rechLegCoin)
  //==========================================
    param=coinsleg[coinsleg.length-1].ami
    
     listeTrav.filter(leg=>leg!==param)
   
  
}


