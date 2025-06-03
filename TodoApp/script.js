const todoForm = document.querySelector(".todoForm");
const titleInput = document.querySelector("#tittle-form");
const messageInput = document.querySelector("#message-form");
const taskContainer = document.querySelector(".task-container");
const formAddBtn = document.querySelector(".form-add-btn");
const formCloseBtn = document.querySelector(".form-close-btn");
const showFormBtn = document.querySelector(".showForm-btn");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

//otevření a skrytí formuláře
showFormBtn.addEventListener("click", () =>{
    todoForm.style.display = "flex"; 
    showFormBtn.style.display = "none";

})

formCloseBtn.addEventListener("click", () =>{
    todoForm.style.display = "none"; 
    showFormBtn.style.display = "inline-block";
})



//funkce pro odstranění speciálních znaků
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}

 

//funkce pro přídání a update tasku
const addOrUpdate = () =>{

    if(!titleInput.value.trim()){
        alert("Prosím zadejte název tasku");
        return;
    }

    dataFindIndex = taskData.findIndex((item) => item.id === currentTask.id );

    dataObj = {
        id:dataFindIndex !== -1 ? taskData[dataFindIndex].id : `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title:`${removeSpecialChars(titleInput.value)}`,
        message:`${removeSpecialChars(messageInput.value)}`,
        checked: dataFindIndex !== -1 ? taskData[dataFindIndex].checked : false 
    }

    if(dataFindIndex === -1){
        taskData.unshift(dataObj);
    }else{
        taskData[dataFindIndex] = dataObj;
    }


    localStorage.setItem("data",JSON.stringify(taskData));
    htmlTaskStructure();
    addCheckboxListeners();
    reset();
}



//struktura tasku

const htmlTaskStructure =() =>{
     taskContainer.innerHTML = "";

    taskData.forEach(({id,title,message}) =>{
   
    (taskContainer.innerHTML += `

        <div class="task" id=${id}>
            <input class="check" type="checkbox">
            <h3 class="task-title ">${title}</h3>
            <p class="task-description "><strong>${message}</strong></p>
            <div class="btns">
                <a class="task-btn-edit" onclick=editTask(this)>
                    <img src="img/pen.svg" alt="">
                </a>
                <a class="task-btn-delete" onclick=deleteTask(this)>
                    <img src="img/cross.svg" alt="">
                </a>
            </div>    

        </div>
    `)

    })
} 


//odstranení tasku z containeru a z localStorage
const deleteTask = (deleteBtn) =>{
    const dataFindIndex = taskData.findIndex((item) => item.id === deleteBtn.parentElement.id);
    const ParrentEl = deleteBtn.closest(".task");

    taskData.splice(dataFindIndex,1);
    localStorage.setItem("data",JSON.stringify(taskData));
    
    ParrentEl.remove();
  
}

//editace tasku podle id 
const editTask = (editBtn) =>{
    const ParrentEl = editBtn.closest(".task");
    const dataFindIndex = taskData.findIndex((item) => item.id === ParrentEl.id);

    currentTask = taskData[dataFindIndex];
    titleInput.value = currentTask.title;
    messageInput.value = currentTask.message;

    todoForm.style.display = "flex"; 
    showFormBtn.style.display = "none";


}

//funkce pro přidání stylů po zatržení checkboxu a uložení do localstorage
const addCheckboxListeners = () => {
    const checkedInputs = document.querySelectorAll(".check"); 

    checkedInputs.forEach(check => {
        const parentEl = check.closest(".task");
        const dataFindIndex = taskData.findIndex(item => item.id === parentEl.id);

        //Znovu načtení checkboxu
        if (dataFindIndex !== -1) {
            check.checked = taskData[dataFindIndex].checked || false;
            parentEl.classList.toggle("checked", check.checked);
        }

        check.addEventListener("change", () => {
            taskData[dataFindIndex].checked = check.checked;
            localStorage.setItem("data", JSON.stringify(taskData));
        
            parentEl.classList.toggle("checked", check.checked);
        });
    });
};


//resetování inputů a aktuálního tasku
const reset = () =>{
    titleInput.value = "";
    messageInput.value = "";
    currentTask = {};
}

//načtení všech tasků a checkboxů
if (taskData.length) {
  htmlTaskStructure();
  addCheckboxListeners();
}
 

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdate();
});



