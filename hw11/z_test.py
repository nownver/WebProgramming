import ZODB, ZODB.FileStorage
import transaction
from z_enrollment import *
import BTrees

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
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

root.students = BTrees.OOBTree.BTree()
root.students[1100] = Student([], 1100, "Miss. Urawee Thani")
root.students[1100].enrollCourse(root.courses[101]).setScore(75)
root.students[1100].enrollCourse(root.courses[201]).setScore(81)
root.students[1100].enrollCourse(root.courses[202]).setScore(81)
root.students[1100].enrollCourse(root.courses[301]).setScore(57)

transaction.commit()

if __name__ == "__main__":
    courses = root.courses
    for c in courses:
        course = courses[c]
        course.printDetail()
        print()
    print()
    
    students = root.students
    for s in students:
        student = students[s]
        student.printTranscript()
        print()
