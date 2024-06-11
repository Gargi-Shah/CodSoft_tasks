var inputs = document.getElementById("input");
var text = document.querySelector(".text");

document.addEventListener("DOMContentLoaded", loadTasks);

function save() {
    if (inputs.value == "") {
        alert("Please Enter Task");
    } else {
        var new_Ele = document.createElement("ul");
        new_Ele.innerHTML = `${inputs.value} <j class="fa-solid fa-pencil edit_icon"></j> <i class="fa-solid fa-trash delete_icon"></i>`;
        text.appendChild(new_Ele);
        inputs.value = "";

        new_Ele.querySelector(".delete_icon").addEventListener("click", remove);
        new_Ele.querySelector(".edit_icon").addEventListener("click", edit);


        saveToLocalStorage();

        function remove() {
            new_Ele.remove();
            saveToLocalStorage();
        }

        function edit() {
            let currentTask = new_Ele.childNodes[0].nodeValue.trim();
            let editedTask = prompt("Edit your task:", currentTask);

            if (editedTask !== null && editedTask.trim() !== "") {
                new_Ele.childNodes[0].nodeValue = editedTask + " ";
                saveToLocalStorage(); 
            }
        }
    }
}

function saveToLocalStorage() {
    var tasks = [];
    text.querySelectorAll("ul").forEach(function (ul) {
        tasks.push(ul.childNodes[0].nodeValue.trim());
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(function (task) {
            var new_Ele = document.createElement("ul");
            new_Ele.innerHTML = `${task} <j class="fa-solid fa-pencil edit_icon"></j> <i class="fa-solid fa-trash delete_icon"></i>`;
            text.appendChild(new_Ele);

            new_Ele.querySelector(".delete_icon").addEventListener("click", remove);
            new_Ele.querySelector(".edit_icon").addEventListener("click", edit);

            function remove() {
                new_Ele.remove();
                saveToLocalStorage(); 
            }

            function edit() {
                let currentTask = new_Ele.childNodes[0].nodeValue.trim();
                let editedTask = prompt("Edit your task:", currentTask);

                if (editedTask !== null && editedTask.trim() !== "") {
                    new_Ele.childNodes[0].nodeValue = editedTask + " ";
                    saveToLocalStorage(); 
                }
            }
        });
    }
}
