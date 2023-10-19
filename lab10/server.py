from fastapi import FastAPI, Body
from pydantic import BaseModel
from typing import Annotated
from fastapi.responses import HTMLResponse

class Student(BaseModel):
    name: str
    surname: str
    ID: int

students = []

app = FastAPI()


# create post method for body
@app.post("/students/new/")
async def create_student(student: Student = Body(...)):
    if student.ID in [s.ID for s in students]:
        return {"error": "Student already exists"}
    students.append(student)
    return student

# create post method for path
@app.post("/students/new/{student_name}/{student_surname}/{student_id}")
async def create_student(student_name: str, student_surname: str, student_id: int):
    if student_id in [s.ID for s in students]:
        return {"error": "Student already exists"}
    student = Student(name=student_name, surname=student_surname, ID=student_id)
    students.append(student)
    return student

# create post method for query
@app.post("/students/newForm/")
async def create_student(student_name: str, student_surname: str, student_id: int):
    if student_id in [s.ID for s in students]:
        return {"error": "Student already exists"}
    student = Student(name=student_name, surname=student_surname, ID=student_id)
    students.append(student)
    return student


@app.get("/students/html/", response_class=HTMLResponse)
async def get_students_html():
    html_content = """
    <html>
        <head>
            <title>Students</title>
        </head>
        <body>
            <h1>Students</h1>
            <table border=1>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>ID</th>
                </tr>
                %s
            </table>
        </body>
    </html>
    """
    rows = ""
    for student in students:
        rows += "<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (student.name, student.surname, student.ID)
    return html_content % rows

@app.get("/students/html/{student_id}", response_class=HTMLResponse)
async def get_student_html(student_id: int):
    html_content = """
    <html>
        <head>
            <title>Student</title>
        </head>
        <body>
            <h1>Student</h1>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>ID</th>
                </tr>
                %s
            </table>
        </body>
    </html>
    """
    rows = ""
    for student in students:
        if student.ID == student_id:
            rows += "<tr><td>%s</td><td>%s</td><td>%s</td></tr>" % (student.name, student.surname, student.ID)
        else:
            html_content = """
            <html>
                <head>
                    <title>Student</title>
                </head>
                <body>
                    <h1>ID not found</h1>
                    %s
                </body>
            </html>
            """
    return html_content % rows
