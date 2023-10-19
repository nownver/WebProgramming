import ZODB, ZODB.FileStorage
import transaction
from z_enrollment import *
import BTrees

storage = ZODB.FileStorage.FileStorage('mydata.fs')
db = ZODB.DB(storage)
connection = db.open()
root = connection.root

root.courses = BTrees.OOBTree.BTree()
root.courses[101] = Course(101, "Computer Programming", 4)
root.courses[201] = Course(201, "Web Programming", 4)

root.students = BTrees.OOBTree.BTree()
root.students[1101] = Student([], 1101, "Mr. Christian de Neuvillette")
root.students[1101].enrollCourse(root.courses[101]).setGrade("B")
root.students[1101].enrollCourse(root.courses[201]).setGrade("C+")

root.students[2101] = Student([], 2101, "Mr. Zhong Li")
root.students[2101].enrollCourse(root.courses[101]).setGrade("B")
root.students[2101].enrollCourse(root.courses[201]).setGrade("C+")

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