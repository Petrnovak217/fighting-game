const output = document.getElementById("output")
const convertBtn = document.getElementById("convert-btn")




const convertNumToRomen = (num) =>{

  const romanData = [
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ]

  const convertedNumber = [];

  romanData.forEach((arr) =>{
    while(num >= arr[1]){
      convertedNumber.push(arr[0])
      num -= arr[1];
    }
  })

  return convertedNumber.join('');

} 


const clearOutput = () =>{

  output.innerText = "";
  output.classList.remove("alert");

}

console.log(convertNumToRomen(15));



const isValidNum = (num) =>{
  let message = "";

  if(num === ""){
    message = "Please enter a valid number";
  }else if(num <=0){
    message = "Please enter a number greater than or equal to 1";
  }else if(num >=4000){
    message = "Please enter a number less than or equal to 3999";
  }else{
    return true;
  }

  output.classList.add("alert");
  output.innerText = message;

  return false;
}

const displayResult = () =>{
  const numInput = document.getElementById("number").value;
  const num = parseInt(numInput,10);

  output.style.display = "block";

  clearOutput();

  if(isValidNum(numInput)){
    output.innerText = convertNumToRomen(num);
  }

}

convertBtn.onclick = () =>{
  displayResult();
}

let myA = [1,2,3,4]

myA.forEach((a) =>{
  console.log(a + 1 );
})


