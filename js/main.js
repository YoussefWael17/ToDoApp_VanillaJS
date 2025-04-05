let x = document.querySelector(".hamburger");
x.addEventListener("click", function(){
    const menu = document.querySelector('.menu').classList.toggle("active");
});



document.addEventListener("DOMContentLoaded", function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const outerDiv = document.getElementById("show");

    savedTasks.forEach((taskText) => {
        createTaskElement(taskText);
    });
});


let plusBtns = document.querySelectorAll(".sum");
plusBtns.forEach((plusBtn) => {
    plusBtn.addEventListener("click", function () {
        let input = document.getElementById("in");
        if (input.value.trim() !== "") {
            const taskText = input.value;
            
            const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            savedTasks.push(taskText);
            localStorage.setItem("tasks", JSON.stringify(savedTasks));
            
            createTaskElement(taskText);

            input.value = "";
        }
    });
});


function createTaskElement(taskText) {
    const outerDiv = document.getElementById("show");


    let div = document.createElement("div");
    div.classList.add("task-info");

    let p = document.createElement("p");
    p.innerHTML = taskText;

    let lis = document.createElement("div");
    lis.classList.add("lis");

    let rebtn = document.createElement("button");
    rebtn.classList.add("re-btn");
    rebtn.textContent = "Rename";
    rebtn.addEventListener("click", function () {
        const currentText = p.textContent;
        const newText = prompt("Rename the task:", currentText);

        if (newText !== null && newText.trim() !== "") {
            p.textContent = newText;


            updateTaskInStorage(currentText, newText);
        }
    });


    let delbtn = document.createElement("button");
    delbtn.classList.add("del-btn");
    delbtn.textContent = "Delete";
    delbtn.addEventListener("click", function () {
        if (confirm("Are You Sure Do You Want To Delete This Task?")) {
            div.remove();

            removeTaskFromStorage(p.textContent);
        }
    });

    let info = document.createElement("i");
    info.classList.add("fa-solid");
    info.classList.add("fa-circle-info");

    lis.append(rebtn);
    lis.append(delbtn);
    lis.append(info);

    div.append(p);
    div.append(lis);

    outerDiv.append(div);
}

function updateTaskInStorage(oldTask, newTask) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = savedTasks.indexOf(oldTask);
    if (taskIndex !== -1) {
        savedTasks[taskIndex] = newTask;
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
}

function removeTaskFromStorage(taskText) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}


let searchButn = document.getElementById("se");
let searchInput = document.getElementById("search");
searchButn.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll("#show .task-info");

    tasks.forEach((task) => {
        const taskText = task.querySelector("p").textContent.toLowerCase();
        task.style.display = taskText.includes(query) ? "flex" : "none";
    });
});




let sorting = document.querySelector(".sorting-butn");
sorting.addEventListener("click",function(){
    let sp = document.querySelector(".sorting-butn span");
        if (sp.style.display === "block"){
            sp.style.display = "none";
        }else{
            sp.style.display = "block";
        }
});



let al = document.getElementById("al");

al.addEventListener("click", function () {
    let lls = document.querySelectorAll(".task-info p");

    let llsArray = Array.from(lls);

    llsArray.sort((a, b) => a.textContent.localeCompare(b.textContent));

    let parent = document.querySelectorAll(".task-info");
    parent.forEach((ts) => {
        ts.getElementsByTagName("p")[0].remove();
    });

    llsArray.forEach((p, index) => {
        let targetParent = parent[index % parent.length]; 
        let newP = document.createElement("p");
        newP.textContent = p.textContent;
        targetParent.prepend(newP); 
    });
});



let pir = document.getElementById("pi");
pir.addEventListener("click", function () {
    let parent = document.querySelectorAll(".task-info");
    parent.forEach((ts) => {
        ts.remove() 
    });
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const outerDiv = document.getElementById("show");

    savedTasks.forEach((taskText) => {
        createTaskElement(taskText);
    });
});


