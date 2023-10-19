from fastapi import FastAPI, Body

app = FastAPI()

# @app.get("/json")
# async def root():
#     return {"Hello" : "World"}

from pydantic import BaseModel

class Person(BaseModel):
    first_name : str
    last_name : str
    # age : int

students = {
    # Person(id=1, name="Urawee", surname="Thani", age=20),
    # Person(id=2, name="Phurin", surname="Smafin", age=20)
    29 : {"ID": 29, "first_name": "APOOS", "last_name": "RADOOS"},
    30 : {"ID": 30, "first_name": "MAPOOS", "last_name": "GADOOS"}
}

@app.get("/students/all")
async def serviceA():
    # return {persondb[person_id]}
    return students

@app.get("/students/{student_id}")
async def serviceB(student_id: int):
    return students[student_id]

@app.post("/students/new")
async def serviceC(student_data : dict = Body(...)):
    if (student_data.get("ID") in students):
        return {"error": "Student already exist"}
    students[student_data.get("ID")] = {"ID": {student_data.get("ID")}, "first_name": {student_data.get("first_name")}, "last_name": {student_data.get("last_name")}}
    return students[student_data.get("ID")]
    

@app.post("/students/new/{firt_name}/{last_name}/{student_id}")
async def serviceD(student_id: int, firt_name: str, last_name: str):
    if student_id in students:
        return {"error":"Students already exists"}
    students[student_id] = {"ID": {student_id}, "first_name": {firt_name}, "last_name": {last_name}}
    return students[student_id]

@app.post("/students/newForm")
async def serviceE(student_id: int, first_name: str, last_name: str):
    if student_id in students:
        return {"error":"Students already exists"}
    students[student_id] = {"ID": {student_id}, "first_name": {first_name}, "last_name": {last_name}}
    return students[student_id]