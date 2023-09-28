var date = 0;
var row = 1;
var days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
var n = 0;

document.writeln("<table>");
document.writeln("<tr><th colspan=7>August 2023</th></tr>")

document.writeln("<tr>")
for (var i = 0; i < 7; i++){
    document.writeln(`<td>${days[i]}</td>`);
}
document.writeln("</tr>")

for (var row = 1; row < 6; row++)
{
    document.writeln("<tr>")

    for (var n = 0; n < 7; n++)
    {
        if (date > 31){
            document.writeln("<td></td>");
        }
        else{
            if (date == 0){
                document.writeln("<td></td>");
                date++;
            }
            else{
                document.writeln("<td>"+ date + "</td>");
                date++;
            }
        }
    }
    document.writeln("</tr>");
}