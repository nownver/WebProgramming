
function prompt() {
    // Get the table element by its ID
    const table = document.getElementById("originalTable");

    // Initialize JSON structure
    const jsonData = {
        "Header": [],
        "Body": [],
        "Footer": [],
    };

    // Get the table headers
    const headerRow = table.rows[0];
    for (let i = 0; i < headerRow.cells.length; i++) {
        jsonData.Header.push(headerRow.cells[i].textContent);
    }

    // Get the table rows (excluding the last one which is the footer)
    for (let i = 1; i < table.rows.length - 1; i++) {
        const rowData = {};
        const row = table.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            const header = jsonData.Header[j];
            rowData[header] = row.cells[j].textContent;
        }
        jsonData.Body.push(rowData);
    }

    // Get the table footer
    const footerRow = table.rows[table.rows.length - 1];
    const footerData = [];
    for (let i = 0; i < footerRow.cells.length; i++) {
        const colspan = footerRow.cells[i].getAttribute("colspan") || 1;
        footerData.push({
            "value": footerRow.cells[i].textContent,
            "colspan": parseInt(colspan)
        });
    }
    jsonData.Footer = footerData;

    // Convert JSON to a string and display it in the textarea
    const jsonText = JSON.stringify(jsonData, null, 4);
    document.getElementById("displayTextarea").value = jsonText;
}

window.onload = function() {
    prompt();
}


function convert() {
    // Get the JSON data from the textarea
    const jsonText = document.getElementById("displayTextarea").value;
    const jsonData = JSON.parse(jsonText);

    // Create a new table element
    const newTable = document.createElement("table");
    newTable.border = "1";
    newTable.align = "center";

    // Create the header row
    const headerRow = document.createElement("tr");
    for (const header of jsonData.Header) {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    }
    newTable.appendChild(headerRow);

    // Create the body rows
    for (const rowData of jsonData.Body) {
        const bodyRow = document.createElement("tr");
        for (const header of jsonData.Header) {
            const td = document.createElement("td");
            td.textContent = rowData[header];
            bodyRow.appendChild(td);
        }
        newTable.appendChild(bodyRow);
    }

    // Create the footer row
    const footerRow = document.createElement("tr");
    for (const footerData of jsonData.Footer) {
        const td = document.createElement("td");
        td.textContent = footerData.value;
        if (footerData.colspan > 1) {
            td.colSpan = footerData.colspan;
        }
        footerRow.appendChild(td);
    }
    newTable.appendChild(footerRow);

    // Add the new table to the page
    const tableContainer = document.getElementById("newTable");
    tableContainer.innerHTML = ""; // Clear any previous table
    tableContainer.appendChild(newTable);
}

// Attach the click event handler to the "Convert" button
document.getElementById("convertButton").addEventListener("click", createTableFromJSON);

