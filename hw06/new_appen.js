var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
var day_of_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_start = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
var month = 1;

function createCalendar() {
    var table, thead, tr, td, tbody;

    table = document.createElement("table");

    thead = document.createElement("thead");
    thead.setAttribute("id", "table_head");
    tr = document.createElement("tr");

    td = document.createElement("td");
    td.setAttribute("style", "padding: 0px;");
    td.innerHTML = "<button onclick='prev_month()'> < </button>";
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("colspan", 5);
    td.setAttribute("id", "header");
    tr.appendChild(td);

    td = document.createElement("td");
    td.setAttribute("style", "padding: 0px;");
    td.innerHTML = "<button onclick='next_month()'> > </button>";
    tr.appendChild(td);

    thead.appendChild(tr);

    tr = document.createElement("tr");
    for (var i = 0; i < 7; i++) {
        td = document.createElement("td")
        td.innerHTML = `${days[i]}`
        tr.appendChild(td);
    }

    thead.appendChild(tr);

    table.appendChild(thead);

    tbody = document.createElement("tbody");
    tbody.setAttribute("id", "table_body");

    table.appendChild(tbody);

    document.body.appendChild(table);
}

createCalendar();

function show_monthOf2023(m){
    const table_body = document.getElementById('table_body');
    const header = document.getElementById('header');

    var date = (0 - month_start[m-1]) + 1
    header.innerHTML = `${m} / 2023`;
    table_body.innerHTML = '';

    var tr, td;
    while (date <= day_of_month[m-1]) {
        tr = document.createElement("tr")
        for (var i = 0; i < 7; i++) {
            td = document.createElement("td")
            if (1 <= date && date <= day_of_month[m-1]) {
                td.innerHTML = `${date}`;
                if (i == 6)
                    td.setAttribute("style", "color: red;");
            }
            tr.appendChild(td);
            date++;
        }
        table_body.appendChild(tr);
    }
}

function prev_month(){
    if (month != 1)
    show_monthOf2023(--month);
}

function next_month(){
    if (month != 12)
    show_monthOf2023(++month);
}

show_monthOf2023(month);