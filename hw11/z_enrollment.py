import persistent

class Course(persistent.Persistent):
    def __init__(self, credit, gradingScheme, id, name):
        self.id = id
        self.name = name
        self.credit = credit
        self.gradeScheme = gradingScheme

    def setName(self, name):
        self.name = name

    def printDetail(self):
        print(f"ID:{self.id:>8} Course: {self.name:<28}\t, Credit  {self.credit}", end = " ")

    def getCredit(self):
        return self.credit
    
    def scoreGrading(self, score):
        for i in range(len(self.gradeScheme)):
            if score >= self.gradeScheme[i]["min"] and score <= self.gradeScheme[i]["max"]:
                grade = self.gradeScheme[i]["Grade"]
                return grade
        return "Invalid Grade" 
            
    def setGradeScheme(self, scheme):
        if not isinstance(scheme, list):
            return "Invalid Scheme(not a list)"
        
        expected = {"A", "B", "C", "D", "F"}
        founded = set()
        for i in range(len(scheme)):
            if not isinstance(scheme[i], dict):
                return "Invalid Scheme(not a dict)"
            if ("Grade" not in scheme[i]) or ("min" not in scheme[i]) or ("max" not in scheme[i]):
                return "Invalid Scheme"
            founded.add(scheme[i]["Grade"])

        if (expected == founded):
            self.gradeScheme = scheme

class Enrollment(persistent.Persistent):
    def __init__(self, course, student, score = 0):
        self.course = course
        self.score = score
        self.student = student

    def getCourse(self):
        return self.course
    
    def getGrade(self):
        return self.course.scoreGrading(self.score)

    def printDetail(self):
        self.course.printDetail()
        print(f"Score:  {self.score}  Grade:  {self.getGrade()}")

    def getScore(self):
        return self.score

    def setScore(self, score):
        self.score = score
    
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

            if self.enrolls[i].getGrade() == 'A':
                grade_num = 4
            # elif self.enrolls[i].grade == 'B+':
            #     grade_num = 3.5
            elif self.enrolls[i].getGrade() == 'B':
                grade_num = 3
            # elif self.enrolls[i].grade == 'C+':
            #     grade_num = 2.5
            elif self.enrolls[i].getGrade() == 'C':
                grade_num = 2
            # elif self.enrolls[i].grade == 'D+':
            #     grade_num = 1.5
            elif self.enrolls[i].getGrade() == 'D':
                grade_num = 1
            elif self.enrolls[i].getGrade() == "F":
                grade_num = 0
            else:
                grade_num = 0

            mul = grade_num * self.enrolls[i].course.credit
            sum += mul
            print("     ", end="")
            self.enrolls[i].printDetail()

        if (all_credit == 0):
            gpa = 0
        else:
            gpa = sum / all_credit

        print(f"Toal GPA is: {gpa:.2f}")
