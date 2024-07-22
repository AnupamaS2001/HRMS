# HRMS

Currrent credentials to login:

username:admin1 , password:admin@123

To register a new user Login use any third party tool like postman :

Endpoint: http://127.0.0.1:5000/register

Json data model:

{ username:"admin1 ",

password:"admin@123" }

Make sure a user is created before login.

Flask Running on http://127.0.0.1:5000.

requirements.txt file attched to install all required packages for flask.

navigate to Flask/ and run

source .hrms/bin/activate (any virtual environemt can use)

pip install -r requirements.txt

flask --app app run 
