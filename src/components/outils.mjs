 
 //===============================================
//===============================================
//triCoin :  fonction ppale pour remplir les 4 coins à partir des  5 parcelles récupérées du local storage  (tabLST) 
//===============================================
//===============================================

export function triCoin(tabLST,liste){
  
 //coins : stocke toutes les possibilités de coins
  let coins=[]
 // tabTrav : définit les voisins de chaque coin     
  let tabTrav=[
    {id:"HG",i1:0,i2:1,i3:2},
    {id:"HD",i1:0,i2:1,i3:3},
    {id:"BG",i1:0,i2:2,i3:4},
    {id:"BD",i1:0,i2:3,i3:4}
  ]
coins=rechCoin(tabLST,liste,tabTrav) 

let coinsleg=[]
  
rechLegCoin(coins,coinsleg,tabLST)

//si les coins ne sont pas tous remplis application de filtres moins restrictifs 
let myFriends=[]
tabLST.forEach(veg => {
  let obj =liste.find(obj=> obj.id===veg.id)
  myFriends.push(obj)
})


tabTrav.forEach(it=>{
let coinRempli = coinsleg.find(leg=>leg.idCoin===it.id)

if (!coinRempli){
  let trouve=false
  let i =0
  while (i<myFriends[it.i1].friendVegetables.length && !trouve){
    let ami =myFriends[it.i1].friendVegetables[i]
    if  (!myFriends[it.i2].enemyVegetables.includes(ami) && !myFriends[it.i3].enemyVegetables.includes(ami)&&
    (myFriends[it.i2].friendVegetables.includes(ami) || myFriends[it.i3].friendVegetables.includes(ami))
     &&!(coinsleg.find(leg=>leg.ami===ami)))
     {
      trouve=true
      let obj={ 
        idCoin:it.id,
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
        

  }
  coinRempli = coinsleg.find(leg=>leg.idCoin===it.id)
if (!coinRempli){
  trouve=false
  i =0

  while (i<myFriends[it.i1].friendVegetables.length && !trouve){
    let ami =myFriends[it.i1].friendVegetables[i]
    if  (!myFriends[it.i2].enemyVegetables.includes(ami) && !myFriends[it.i3].enemyVegetables.includes(ami)&&
    (myFriends[it.i2].friendVegetables.includes(ami) || myFriends[it.i3].friendVegetables.includes(ami))
    )
     {
      trouve=true
      let obj={ 
        idCoin:it.id,
        ami:ami}
        coinsleg.push(obj)
        break
      }
    i++  
  }
  coinRempli = coinsleg.find(leg=>leg.idCoin===it.id)
  if (!coinRempli){
    trouve=false
    i =0
  
    while (i<myFriends[it.i1].friendVegetables.length && !trouve){
      let ami =myFriends[it.i1].friendVegetables[i]
      if  (!myFriends[it.i2].enemyVegetables.includes(ami) && !myFriends[it.i3].enemyVegetables.includes(ami)
      )
       {
        trouve=true
        let obj={ 
          idCoin:it.id,
          ami:ami}
          coinsleg.push(obj)
          break
        }
      i++  
    }
  }
}
}
})

let tabAngle=[]
tabTrav.forEach(it=>{
  tabAngle.push(coinsleg.find(obj=>obj.idCoin===it.id));
})
coinsleg=tabAngle
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
function rechCoin (listLOCSTOR,liste,tabTrav) {
  let coins=[]
  let myFriends=[]
  //pour ajouter les légumes amis à la liste des légumes des 5 parcelles (récupérée du local storage)
  listLOCSTOR.forEach(veg => {
    let obj =liste.find(obj=> obj.id===veg.id)
    myFriends.push(obj)
  })
  tabTrav.forEach(it=>{
//récup de tous les amis des légumes des 5  parcelles pour préparer la liste des candidats pour les coins (HG :Haut Gauche)  
myFriends[it.i1].friendVegetables.forEach(ami => {
    if (myFriends[it.i2].friendVegetables.includes(ami) && myFriends[it.i3].friendVegetables.includes(ami))
  
  {
    let obj={ 
      idCoin:it.id,
      id1:myFriends[it.i1].id,
      id2:myFriends[it.i2].id,
      id3:myFriends[it.i3].id,
      ami:ami}
      coins.push(obj)
  }  })
})
            
   return coins     
        
}


 //==============
 export function verifCoherenceListe(liste){

    //let liste2=liste.filter(obj=>obj.id!==-1)
    let obj=liste.find(obj=>obj.id===-1)
    
    
    console.log(liste);
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
  return liste
  }
  //=================================================================================================
//pour chaque ami de item (un légume)  , vérifier la compatibilité des amis de chaque légume de la liste
//=================================================================================================

export function verifCompatible(item,liste,tabObjComp,isFriend){
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

let tbObjmostCompt=[]
  //init de la liste des lég les plus associables 
  liste.forEach(veg=>{
    let objVeg={id:veg.id,name:veg.name, nb:0,moy:0}
    tbObjmostCompt.push(objVeg)
  })
// pour chaque légume , on additionne les amis communs avec toutes les  liste d'amis des légumes ( les + favorables : au moins 3 amis trouvés)
tabObjComp.forEach(itm =>{
   let obj=""
   itm.tb.forEach(veg => {
      obj=tbObjmostCompt.find(obj => obj.id===veg.id)
      obj.nb+=veg.nb;
    })
 })
//calcul de la moyenne d'associabilité pour chaque légume favorable (tabComp) avec des listes d'amis > 5 
liste.forEach(veg=>{
    veg.moy=0;
  let obj= tbObjmostCompt.find(obj => obj.id===veg.id)
     
 
     if (veg.friendVegetables&& veg.friendVegetables.length>7){ 
       obj.moy= obj.nb/veg.friendVegetables.length;
       veg.moy=obj.moy
       if (isFriend)veg.moy+=100
      }
  } );

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
function rechLegCoin(coins,coinsleg,tbLST){
//==========================================
let tabIdC=[{id:"HG",nb:0},{id:"HD",nb:0},{id:"BG",nb:0},{id:"BD",nb:0}]
let tabLegCoin=[{leg:"",nb:0}]
let listLegC=[]

coins.forEach(itm=> {
  if (!listLegC.includes(itm.ami))listLegC.push(itm.ami)
})

let nb =0
//
let idCoin=""
let tbObj=[]
tabIdC.forEach(it=>{
  tbObj=coins.filter(o=>o.idCoin===it.id)
  it.nb=tbObj.length
})
listLegC.forEach(it=>{
  tbObj=coins.filter(o=>o.ami===it)
  
  let obj={leg:it, nb:tbObj.length}
  tabLegCoin.push(obj)
})
let trouv =true
let tabRetour=[]
while (tabIdC.length>0 && coinsleg.length<4 && trouv){
  tbObj=tabIdC.find( x=> x.nb===1)
  if (tbObj){
  idCoin=tbObj.id
  tbObj=coins.find(y=>y.idCoin===idCoin)
  coinsleg.push(tbObj)
  tabRetour=majListTrav(coinsleg,coins,tabIdC,tabLegCoin)
  coinsleg=tabRetour[0]
  coins=tabRetour[1]
  tabIdC=tabRetour[2]
  tabLegCoin=tabRetour[3]

}else {
  tbObj=tabLegCoin.find(o=>o.nb===1)
  if (tbObj){ 
    let obj=tbObj
    tbObj=coins.find(o=>o.ami===obj.leg)
    coinsleg.push(tbObj)
    tabRetour=majListTrav(coinsleg,coins,tabIdC,tabLegCoin)
    coinsleg=tabRetour[0]
    coins=tabRetour[1]
    tabIdC=tabRetour[2]
    tabLegCoin=tabRetour[3]
    
  
  }else trouv=false
}
}





 }
  
  
 function majListTrav(coinsleg,coins,tabIdC,tabLegCoin){

  
  
//on retire les légumes sélectionnés : le dernier ajouté dans la liste coinsleg (cf rechLegCoin)
  let param=coinsleg[coinsleg.length-1].ami
  
  coins=coins.filter(leg=>leg.ami!==param)

  tabLegCoin=tabLegCoin.filter(c=>c.leg!==param)
//on retire les légumes sélectionnés : le dernier ajouté dans la liste coinsleg (cf rechLegCoin)
  param=coinsleg[coinsleg.length-1].idCoin
  
  coins= coins.filter(leg=>leg.idCoin!==param)
  tabIdC=tabIdC.filter(c=>c.id!==param)

  let newTb = [];
  let tb=[]
  let nb = 0;
  tabIdC.forEach((ta) => {
    tb = coins.filter((o) => o.idCoin === ta.id);
    if (tb.length){
    
      newTb.push({ id: ta.id, nb: tb.length });
    }

  });

  tabIdC=newTb

   
   console.log("coins");
   console.log(coins);
   
  let tabTab=[]
  tabTab.push(coinsleg)
  tabTab.push(coins)
  tabTab.push(tabIdC)
  tabTab.push(tabLegCoin)
  
  return tabTab
}
