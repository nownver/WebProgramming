from fastapi import FastAPI, Request, HTTPException
from fastapi import FastAPI, Body, Form
from fastapi.responses import HTMLResponse
from fastapi.responses import RedirectResponse

from z_enrollment import *

app = FastAPI()
root = connection.root

scheme1 = [ {"Grade": "A", "min": 80, "max": 100},
          {"Grade": "B", "min": 70, "max": 79},
          {"Grade": "C", "min": 60, "max": 69},
          {"Grade": "D", "min": 50, "max": 59},
          {"Grade": "F", "min": 0, "max": 49} ]

scheme2 = [ {"Grade": "A", "min": 90, "max": 100},
          {"Grade": "B", "min": 70, "max": 89},
          {"Grade": "C", "min": 60, "max": 69},
          {"Grade": "D", "min": 50, "max": 59},
          {"Grade": "F", "min": 0, "max": 49} ]

scheme3 = [ {"Grade": "A", "min": 80, "max": 100},
          {"Grade": "B", "min": 60, "max": 79},
          {"Grade": "C", "min": 40, "max": 59},
          {"Grade": "D", "min": 30, "max": 39},
          {"Grade": "F", "min": 0, "max": 29} ]


root.courses = BTrees.OOBTree.BTree()
root.courses[101] = Course(4, scheme1, 101, "Computer Programming")
root.courses[201] = Course(4, scheme1, 201, "Web Programming")
root.courses[202] = Course(5, scheme2, 202, "Software Engineering Principle")
root.courses[301] = Course(3, scheme3, 301, "Artificial Intelligent")

root.students[617] = Student([], 617, "Miss Urawee Thani", "hell")
root.students[617].enrollCourse(root.courses[101]).setScore(75)
root.students[617].enrollCourse(root.courses[201]).setScore(81)
root.students[617].enrollCourse(root.courses[202]).setScore(81)
root.students[617].enrollCourse(root.courses[301]).setScore(57)

@app.get("/login", response_class=HTMLResponse)
async def login_page():
    html_content = """
    <html>
    <head> 
        <title>Login Page</title>
        <style>
            body {
                margin: auto;
                text-align: center;
            }
        </style>
    </head>
    <body> 
        <h1>Login</h1> 
        <form method="post" action="/login">
            <div style="padding: 10px;">
                <label for="ID">ID:</label>
                <input type="text" id="ID" name="ID" />
            </div>
            <div style="padding: 10px;">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    </body> 
    </html> """
    return HTMLResponse(content=html_content)

@app.post("/login", response_class=HTMLResponse)
async def login_post(ID: int = Form(...), password: str = Form(...)):    
    if ID in root.students:
        student = root.students[ID]
        if student.login(ID, password):
            transaction.commit()
            return RedirectResponse(url=f"/entry/{ID}", status_code=303)
    
    return {"error": "Incorrect login"}

@app.get("/entry/{ID}", response_class=HTMLResponse)
async def entry_form(ID: int):
    enrollment_table = "<table><thead><tr><th>Course Code</th><th>Course Name</th><th>Credits</th><th>Score</th></tr></thead><tbody>"

    student = root.students[ID]
    for enrollment in student.enrolls:
        course = enrollment.getCourse()
        enrollment_table += f"<tr><td>{course.id}</td><td>{course.name}</td><td>{course.getCredit()}</td><td><input id='{course.id}' name='{course.id}' /></td></tr>"

    enrollment_table += "</tbody></table>"

    html_content = f"""
    <html>
    <head> 
        <title>Transcript Entry Form</title>
    </head>
    <body> 
        <h1>Transcript Entry Form</h1> 
        <h2>ID: {ID}</h2>
        <h2>Name: {student.name}</h2>
        <form method="post" action="/entry/{ID}">
    {enrollment_table}
    <button type="submit">Submit</button>
</form>
    </body> 
    </html> """
    
    return HTMLResponse(content=html_content)

@app.post("/entry/{ID}", response_class=HTMLResponse)
async def entry_post(ID: int, scores: dict = Form(...)):    
    print(f"Received POST request for ID: {ID}")
    print("Scores:", scores)

    student = students.get(ID)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    for enrollment in student.enrolls:
        course_id = enrollment.getCourse().id
        score_key = f"{course_id}"
        if score_key in scores:
            try:
                score = float(scores[score_key])
                enrollment.setScore(score)
            except ValueError:
                return {"error": "Invalid score format"}

    transaction.commit()
    print(f"Redirecting to /transcript/{ID}")
    return RedirectResponse(url=f"/transcript/{ID}", status_code=303)


    
@app.get("/transcript/{ID}", response_class=HTMLResponse)
async def serviceD(ID: int):
    student = students.get(ID)
    if student:
        hi = student.printTranscript()
        # return {"message": "Transcript has been printed."}
        return HTMLResponse(content=hi)
    else:
        raise HTTPException(status_code=404, detail="Student not found")
    

@app.get("/redirect")
async def redirect_to_another_uri() :
    redirect_uri = "/target_uri"
    return RedirectResponse(url=redirect_uri)

@app.get("/target_uri")
def target_uri() :
    return {"message": "You have been redirected to the target URL"}

