import requests
import json

def post1(name, surname, id):
    url = f"http://161.246.5.61:11617/students/newForm/?student_name={name}&student_surname={surname}&student_id={id}"
    response = requests.post(url)

    if response.status_code == 200:
        print('Request successful')
        print('Response:', response.text)
    else: #404
        print('Request failed. Status code:', response.status_code)
    

def post2(name, surname, id):
    url = f"http://161.246.5.61:11617/students/new/{name}/{surname}/{id}/"
    response = requests.post(url)

    if response.status_code == 200:
        print('Request successful')
        print('Response:', response.text)
    else:
        print('Request failed. Status code:', response.status_code)
        

def post3(name, surname, id):
    url = f"http://161.246.5.61:11617/students/new/"
    data = {
        "name": name,
        "surname": surname,
        "ID": id
    }

    json_data = json.dumps(data)

    response = requests.post(url, data=json_data)
    if response.status_code == 200:
        print('Request successful')
        print('Response:', response.text)
    else:
        print('Request failed. Status code:', response.status_code)

def get1():
    url = f"http://161.246.5.61:11617/students/html/"
    response = requests.get(url)

    if response.status_code == 200:
        print('Request successful')
        print('Response:', response.text)
    else:
        print('Request failed. Status code:', response.status_code)
        
def get2(id):
    url = f"http://161.246.5.61:11617/students/html/{id}/"
    response = requests.get(url)

    if response.status_code == 200:
        print('Request successful')
        print('Response:', response.text)
    else:
        print('Request failed. Status code:', response.status_code)


post1("qw","qw",789011317)  
post2("uru", "trt", 341523127)
post3("ww","eff",132562317)
get1()
get2(341523127)