var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var day_of_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var start = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
var month = 1;

function createCalendar() {
    document.writeln("<table id='table_all'>");

    document.writeln("<thead id='table_head'>");
    document.writeln("<tr>");

    document.writeln("<td style='padding: 0px;'>");
    document.writeln("<button onclick='backward()'> &lt; </button>");
    document.writeln("</td>");

    document.writeln("<td colspan='5' id='monthHeader'></td>");

    document.writeln("<td style='padding: 0px;'>");
    document.writeln("<button onclick='forward()'> &gt; </button>");
    document.writeln("</td>");

    document.writeln("</tr>");

    document.writeln("<tr>");
    for (var i = 0; i < 7; i++) {
        document.writeln(`<td>${days[i]}</td>`);
    }
    document.writeln("</tr>");

    document.writeln("</thead>");

    document.writeln("<tbody id='tableBody'></tbody>");

    // document.writeln("</table>");
}

createCalendar();

function show_monthOf2023(month) {
    
    const tableBody = document.getElementById('tableBody');
    const monthHeader = document.getElementById('monthHeader');

    var date = (0 - start[month - 1]) + 1;
    monthHeader.innerHTML = `${month}/2023`;
    tableBody.innerHTML = '';

    var tr, td;
    while (date <= day_of_month[month - 1]) {
        // tr = document.createElement("tr");
        document.writeln("<tr>");
        for (var i = 0; i < 7; i++) {
            // td = document.createElement("td");
            if (1 <= date && date <= day_of_month[month - 1]) {
                // td.innerHTML = `${date}`;
                document.writeln(`<td>${date}</td>`);
                if (i == 6) {
                    // td.style.color = "red";
                }
            }
            else{
                document.writeln(`<td></td>`);
            }
            // tr.appendChild(td);
            date++;
        }
        document.writeln(`</tr>`);
        // tableBody.appendChild(tr);
    }

    // document.writeln("</table>");
}


show_monthOf2023(month);

function rmv() {
    const tableAll = document.getElementById('table_all');
    if (tableAll){
        tableAll.parentNode.removeChild(tableAll);
    }
}

function backward() {
    if (month != 1) {
        // rmv();
        month -= 1
        
        createCalendar();
        show_monthOf2023(month);
    }
}

function forward() {
    if (month != 12) {
        // rmv();
        month += 1
        createCalendar();
        show_monthOf2023(month);
    }
}
