
let billInput = document.getElementById("billTotalInput");
let tipInput = document.getElementById("tipInput");
let numberOfPeopleDiv = document.getElementById("numberOfPeople");
let perPersonTotal  = document.getElementById("perPersonTotal");


    let numberOfPeople = Number(numberOfPeopleDiv.innerText);
    

const calculateBill = () => {
    
    billTotalInput =  Number(billInput.value);
   
    let tip = Number(tipInput.value);
    let precentTip = tip / 100;
  
    let calTotal = billTotalInput + (billTotalInput * precentTip)
  
    let calPerPerson = calTotal / numberOfPeople
 
    perPersonTotal.innerText = `$${calPerPerson.toFixed(2)}`;
  
  }
  
  const increasePeople = () => {

    let increaseNumber =  numberOfPeople++;
    
  

    numberOfPeopleDiv.innerText = increaseNumber + 1;
  

    calculateBill();
  }
  

  const decreasePeople = () => {
    
   if(numberOfPeople <= 1){
        console.log("Kámo zaplať nebo z tebe udělám půlku");
        
   }else{
  
        let decrementNumber =  numberOfPeople--;
        numberOfPeopleDiv.innerText = decrementNumber - 1
        calculateBill()
    }
    
   
  }
  