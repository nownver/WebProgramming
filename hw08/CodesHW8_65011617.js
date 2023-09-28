document.addEventListener("DOMContentLoaded", function () {
    // Function to update the transcript table with data from a JSON file
    function updateTranscriptTable(transcriptData) {
        const contentBody = document.getElementById("content_body");

        // Clear the existing table content
        contentBody.innerHTML = "";

        let totalCreditsAttempted = 0;
        let totalPointsEarned = 0;
        let totalSemesters = 0;

        for (const year in transcriptData.credit) {
                for (const semester in transcriptData.credit[year]) {
                    
                        // Add semester label (e.g., "1st Semester, Year, 2021-2022")
                        const semesterLabelRow = document.createElement("tr");
                        const semesterLabelCell = document.createElement("td");
                        semesterLabelCell.textContent = `${semester}, ${year}`;
                        semesterLabelCell.style.textDecoration = "underline"; 
                        semesterLabelCell.colSpan = 1; // Span all columns
                        semesterLabelRow.appendChild(semesterLabelCell);
                        semesterLabelRow.appendChild(document.createElement("td"));
                        semesterLabelRow.appendChild(document.createElement("td"));
                        contentBody.appendChild(semesterLabelRow);

                        let semesterCreditsAttempted = 0;
                        let semesterPointsEarned = 0;

                        for (course of transcriptData.credit[year][semester]){
                            // const sub = transcriptData.credit[year][semester][course];
                            const row = document.createElement("tr");

                            // Add subject_id and course name columns
                            const subjectIdAndCourseTitleCell = document.createElement("td");
                            subjectIdAndCourseTitleCell.textContent = `${course.subject_id} ${course.name}`;
                            subjectIdAndCourseTitleCell.style.textAlign = "left";
                            // subjectIdAndCourseTitleCell.style.fontStyle = "Italic";
                            subjectIdAndCourseTitleCell.colSpan = 1; // Span 1 column
                            row.appendChild(subjectIdAndCourseTitleCell);

                            // Add credit column
                            const creditCell = document.createElement("td");
                            creditCell.textContent = course.credit;
                            row.appendChild(creditCell);

                            // Add grade column
                            const gradeCell = document.createElement("td");
                            gradeCell.textContent = course.grade;
                            row.appendChild(gradeCell);

                            contentBody.appendChild(row);

                            // Calculate semester GPA (GPS) for valid grades
                            if (course.grade === "A") {
                                semesterCreditsAttempted += parseFloat(course.credit);
                                semesterPointsEarned += parseFloat(course.credit) * 4.0;
                            } else if (course.grade === "B+") {
                                semesterCreditsAttempted += parseFloat(course.credit);
                                semesterPointsEarned += parseFloat(course.credit) * 3.5;
                            } else if (course.grade === "B") {
                                semesterCreditsAttempted += parseFloat(course.credit);
                                semesterPointsEarned += parseFloat(course.credit) * 3.0;
                            } else if (course.grade === "C+") {
                                semesterCreditsAttempted += parseFloat(course.credit);
                                semesterPointsEarned += parseFloat(course.credit) * 2.5;
                            } else if (course.grade === "C") {
                                semesterCreditsAttempted += parseFloat(course.credit);
                                semesterPointsEarned += parseFloat(course.credit) * 2.0;
                            } else if (course.grade === "D+") {
                                semesterCreditsAttempted += parseFloat(course.credit);
                                semesterPointsEarned += parseFloat(course.credit) * 1.5;
                            } else if (course.grade === "D") {
                                semesterCreditsAttempted += parseFloat(course.credit);
                                semesterPointsEarned += parseFloat(course.credit) * 1.0;
                            }
                        }

                        // Calculate and display semester GPS if valid
                        if (semesterCreditsAttempted > 0) {
                            const semesterGPS = semesterPointsEarned / semesterCreditsAttempted;

                            // Update cumulative total for GPA calculation
                            totalCreditsAttempted += semesterCreditsAttempted;
                            totalPointsEarned += semesterPointsEarned;

                            const semesterGPA = totalPointsEarned / totalCreditsAttempted;

                            const semesterGPSText = `GPS: ${semesterGPS.toFixed(2)}  GPA: ${semesterGPA.toFixed(2)}`;
                            const semesterGPSCell = document.createElement("td");
                            semesterGPSCell.textContent = semesterGPSText;
                            semesterGPSCell.style.fontStyle = "Italic";
                            const semesterGPSRow = document.createElement("tr");
                            semesterGPSRow.appendChild(semesterGPSCell);
                            semesterGPSRow.appendChild(document.createElement("td"));
                            semesterGPSRow.appendChild(document.createElement("td"));
                            contentBody.appendChild(semesterGPSRow);

                            totalSemesters++;
                        }

                }

        }

        // Populate other student information
        document.getElementById("student_name").value = transcriptData.student_name;
        document.getElementById("date_of_birth").value = transcriptData.date_of_birth;
        document.getElementById("student_id").value = transcriptData.student_id;
        document.getElementById("date_of_admission").value = transcriptData.date_of_admission;
        document.getElementById("date_of_graduation").value = transcriptData.date_of_graduation;
        document.getElementById("degree").value = transcriptData.degree;
        document.getElementById("major").value = transcriptData.major;
    }

    // Function to handle file input change
    function handleFileInputChange(event) {
        const fileInput = event.target;
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    updateTranscriptTable(jsonData);
                } catch (error) {
                    alert("Error parsing JSON file: " + error.message);
                }
            };

            reader.readAsText(file);
        }
    }

    // Attach the file input change event handler
    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", handleFileInputChange);
});
