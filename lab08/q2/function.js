var current = new Date(2023, 8, 7, 8, 50, 0);
function AlertTime(time, message){
    this.time = time;
    this.message = message;
}

function displayTable(array){
    const tablectn = document.getElementById("alert-table");
    tablectn.innerHTML = "";
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    th1.innerHTML = "Time";
    th2.innerHTML = "Alert Word";
    tr.appendChild(th1);
    tr.appendChild(th2);
    table.appendChild(tr);

    for (let i = 0; i < array.length; i++) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.innerHTML = array[i].time.toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit', hour12: false});
        td2.innerHTML = array[i].message;
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    }
    tablectn.appendChild(table);
}

function displayForm(array){
    const tablectn = document.getElementById("alert-table");
    tablectn.innerHTML = "";
    const table = document.createElement("table");

    for (let i = 0; i < array.length; i++) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");

        const timeinput = document.createElement("input");
        const messageinput = document.createElement("input");
        const removebtn = document.createElement("input");
        

        timeinput.setAttribute("type", "time");
        timeinput.setAttribute("value", array[i].time.toLocaleTimeString("en-US", {hour: '2-digit', minute:'2-digit', hour12: false}));

        messageinput.setAttribute("type", "text");
        messageinput.setAttribute("value", array[i].message);

        removebtn.setAttribute("type", "button");
        removebtn.setAttribute("value", "Remove");


        removebtn.addEventListener("click", function(e){
            array.splice(i, 1);
            displayForm(array);
        });

        td1.appendChild(timeinput);
        td2.appendChild(messageinput);
        td3.appendChild(removebtn);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    }
    const addrowbtn = document.createElement("input");
    addrowbtn.setAttribute("type", "button");
    addrowbtn.setAttribute("value", "Add Row");
    addrowbtn.addEventListener("click", function(){
        save();
        array.push(new AlertTime(new Date(current.getFullYear(), current.getMonth(), current.getDate(), 0, 0, 0), ""));
        displayForm(array);
    });
    tablectn.appendChild(table);
    tablectn.appendChild(addrowbtn);
}

// function updateTime(){

//     const timectn = document.getElementById("current-time");
//     timectn.innerHTML = "Current time: " + current.getHours() + ":" + current.getMinutes();
//     current = new Date(current.getTime() + 1000);
// }

function save(){
    const table = document.getElementById("alert-table").getElementsByTagName("table")[0];
    const rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const tds = rows[i].getElementsByTagName("td");
        alertTime[i].time = new Date(current.getFullYear(), current.getMonth(), current.getDate(), tds[0].getElementsByTagName("input")[0].value.split(":")[0], tds[0].getElementsByTagName("input")[0].value.split(":")[1], 0);
        alertTime[i].message = tds[1].getElementsByTagName("input")[0].value;
    }

    alertTime.sort(function(a, b){
        return a.time.getTime() - b.time.getTime();
    });
}

function run(){

    // updateTime();
    for (let i = 0; i < alertTime.length; i++) {
        if(current.getTime() == alertTime[i].time.getTime()){
            alert(alertTime[i].message);
        }
    }
}

var alertTime = [
    // new AlertTime(new Date(current.getFullYear(), current.getMonth(), current.getDate(), 9, 0, 0), "Wake up!"),
    // new AlertTime(new Date(current.getFullYear(), current.getMonth(), current.getDate(), 12, 0, 0), "Lunch time!"),
    // new AlertTime(new Date(current.getFullYear(), current.getMonth(), current.getDate(), 15, 30, 0), "Take a break!"),
]

document.addEventListener("DOMContentLoaded", function(){
    displayTable(alertTime);
    const edit = document.getElementById("edit");
    edit.addEventListener("click", function(e){
        if(e.target.value == "Edit"){
            displayForm(alertTime);
            e.target.value = "Done";
        }else{
            save();
            displayTable(alertTime);
            e.target.value = "Edit";
        }
    });
    setInterval(run, 1);
});

function exportSchedule() {
    const scheduleData = alertTime.map(function(alert) {
        return {
            time: alert.time.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' }),
            activity: alert.message
        };
    });

    const jsonSchedule = JSON.stringify(scheduleData);

    // Create a Blob containing the JSON data
    const blob = new Blob([jsonSchedule], { type: "application/json" });

    // Create a link to download the JSON file
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "schedule.json";

    // Trigger a click event on the link to initiate the download
    a.click();
}

// Add an event listener to the "Export Schedule" button
const exportButton = document.getElementById("exportSchedule");
exportButton.addEventListener("click", exportSchedule);

function importSchedule() {
    const fileInput = document.getElementById("importFile");
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            try {
                const importedData = JSON.parse(e.target.result);

                // Clear the existing alertTime array
                alertTime.length = 0;

                // Populate the alertTime array with imported data
                for (const item of importedData) {
                    const date = new Date();
                    const timeParts = item.time.split(":");
                    const hours = parseInt(timeParts[0]);
                    const minutes = parseInt(timeParts[1]);

                    date.setHours(hours);
                    date.setMinutes(minutes);
                    alertTime.push(new AlertTime(date, item.activity));
                }

                // Display the imported data as a table
                displayTable(alertTime);
            } catch (error) {
                alert("Error parsing JSON file: " + error.message);
            }
        };

        reader.readAsText(file);
    } else {
        alert("Please select a JSON file to import.");
    }
}

// Add an event listener to the "Import file" input for changes
const fileInput = document.getElementById("importFile");
fileInput.addEventListener("change", importSchedule);

const selectDateInput = document.getElementById("selectDate");

        // Function to save the displayed schedule for the selected date
        function saveSchedule() {
            const selectedDate = selectDateInput.value;
            const scheduleData = alertTime.map(function(alert) {
                return {
                    time: alert.time.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false }),
                    activity: alert.message
                };
            });

            const storageKey = `schedule_${selectedDate}`;
            localStorage.setItem(storageKey, JSON.stringify(scheduleData));
        }

        function loadSchedule() {
            const selectedDate = selectDateInput.value;
            const storageKey = `schedule_${selectedDate}`;
            const savedData = localStorage.getItem(storageKey);

            if (savedData) {
                const importedData = JSON.parse(savedData);

                // Clear the existing alertTime array
                alertTime.length = 0;

                // Populate the alertTime array with imported data
                for (const item of importedData) {
                    alertTime.push(new AlertTime(new Date(current.getFullYear(), current.getMonth(), current.getDate(), parseInt(item.time.split(":")[0]), parseInt(item.time.split(":")[1]), 0), item.activity));
                }

                // Display the imported data as a table
                displayTable(alertTime);
            }
        }

        // Load previously saved data for the selected date when the page loads
        window.addEventListener("load", loadSchedule);

        // Add an event listener to the "Save Schedule" button to save the displayed schedule
        const saveScheduleButton = document.getElementById("saveSchedule");
        saveScheduleButton.addEventListener("click", saveSchedule);
