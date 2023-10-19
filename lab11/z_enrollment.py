import persistent

class Course(persistent.Persistent):
    def __init__(self, id, name, credit = 0):
        self.id = id
        self.name = name
        self.credit = credit
    # def __str__(self):
    #     return "ID: %d Course Name: %s, Credit %d"(self.id, self.name, self.credit)
    def setName(self, name):
        self.name = name
    # def printDetail(self):
    #     print(self.__str__())
    def printDetail(self):
        print(f"ID:{str(self.id):>8}   Course: {self.name:<24} Credit {self.credit}")
    def getCredit(self):
        return self.credit
    
class Enrollment(persistent.Persistent):
    def __init__(self, course, student, grade = "A"):
        self.course = course
        self.grade = grade
        self.student = student
    def getCourse(self):
        return self.course
    def getGrade(self):
        return self.grade
    def setGrade(self, grade):
        self.grade = grade
    
    # def __str__(self):
    #     return "Course Name: %s Grade: %s, Name %s"(self.course.name, self.grade, self.student.name)
    # def printDetail(self):
    #     print(self.__str__())

    def printDetail(self):
        print(f"Course Name:\t{self.course.name} Grade: {self.grade} Name {self.student.name}")
    
class Student(persistent.Persistent):
    def __init__(self, enrolls, id, name):
        self.enrolls = enrolls
        self.id = id
        self.name = name
    def enrollCourse(self, course):
        new = Enrollment(course, self)
        self.enrolls.append(new)
        return new
    def getEnrollment(self, course):
        if course in self.enrolls:
            return Enrollment(course, self)
        else:
            return None
    def setName(self, name):
        self.name = name

    def printTranscript(self):
        size = len(self.enrolls)
        sum = 0
        mul = 1

        all_credit = 0

        print("     Transcript")
        print(f"ID:{self.id:>8} \tName: {self.name:<24}")
        print("Course list")
        for i in range(size):
            all_credit += self.enrolls[i].course.credit

            if self.enrolls[i].grade == 'A':
                grade_num = 4
            elif self.enrolls[i].grade == 'B':
                grade_num = 3
            elif self.enrolls[i].grade == 'C':
                grade_num = 2
            elif self.enrolls[i].grade == 'D':
                grade_num = 1
            elif self.enrolls[i].grade == "F":
                grade_num = 0
            else:
                grade_num = 0

            mul = grade_num * self.enrolls[i].course.credit
            sum += mul
            print(f"\tID:{self.enrolls[i].course.id:>8} Course: {self.enrolls[i].course.name:<20}\t, Credit {self.enrolls[i].course.credit}, Grade: {self.enrolls[i].grade}")

        if (all_credit == 0):
            gpa = 0
        else:
            gpa = sum / all_credit

        print(f"Toal GPA is: {gpa}")
