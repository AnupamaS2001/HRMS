from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import *
import flask 

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://anu:1234@localhost:5432/flaskdb"

db.init_app(app)
CORS(app)


@app.route("/")
def home():
    return "Hello, world"



#login
@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')
        print(username, password ,"username")
        user = db.session.query(Credential).filter_by(username=username, password=password).first()
        print(user)
        if user:
            return jsonify({'status': 'success'})
        else:
            return jsonify({'status': 'error'}), 401  
        
#get designtion
@app.route('/designation/all', methods=['GET'])
def get_all_designations():
    if request.method == 'GET':
        designations = db.session.query(Designation).all()
        designation_list = []
        for designation in designations:
            designation_data = {
                'id': designation.id,
                'name': designation.name,
                'leave_allotted': designation.leave_allotted
            }
            designation_list.append(designation_data)
        return jsonify(designation_list)
    
# post designation
@app.route('/designation/add', methods=['POST'])
def add_designation():
    if request.method == 'POST':
        name = request.json.get('name')
        leave_allotted = request.json.get('leave_allotted')
        designation = Designation(name=name, leave_allotted=leave_allotted)
        db.session.add(designation)
        db.session.commit()
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error'}), 400  
    
# update designation
@app.route('/designation/update/<int:id>', methods=['PUT']) 
def update_designation(id):
    if request.method == 'PUT':
        name = request.json.get('name')
        leave_allotted = request.json.get('leave_allotted')
        designation = db.session.query(Designation).filter_by(id=id).first()
        if designation:
            designation.name = name
            designation.leave_allotted = leave_allotted
            db.session.commit()
            return jsonify({'status': 'success'})
        else:
            return jsonify({'status': 'error'}), 404  
    
# list employee
@app.route('/employee/all', methods=['GET'])
def get_all_employees():
    if request.method == 'GET':
        employees = Employee.query.all()

        emp_data = []

        for employee in employees:
            leave_taken = Leave.query.filter_by(employee_id=employee.id).count() 
            emp_data.append({
            'id': employee.id,
            'first_name': employee.first_name,
            'last_name': employee.last_name,
            'phone_no': employee.phone_no,
            'email': employee.email,
            'address': employee.address,
            'designation': employee.designation.name,
            'created_at': employee.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'deleted_at': employee.deleted_at.strftime('%Y-%m-%d %H:%M:%S') if employee.deleted_at else None,
            'leave_taken': leave_taken,
            'leave_allotted': employee.designation.leave_allotted
            })
    
        
        return jsonify({"data": emp_data})


# get one employee
@app.route('/employee/<int:id>', methods=['GET'])
def get_employee(id):
    if request.method == 'GET':
        employee = db.session.query(Employee).filter_by(id=id).first()
        return jsonify({
            "id": employee.id,
            "first_name": employee.first_name,
            "last_name": employee.last_name,
            "phone_no": employee.phone_no,
            "email": employee.email,
            "address": employee.address,
            "designation_id": employee.designation_id
        })


# post employee

@app.route('/employee/add', methods=['POST'])
def add_employee():
        designation_name = request.json.get('designation')
        designation = Designation.query.filter_by(name=designation_name).first()
        
        if not designation:
            return jsonify({'status': 'error'}), 400  # Commit to get the new designation ID
        

        employee = Employee(
            first_name=request.json.get('first_name'),
            last_name=request.json.get('last_name'),
            phone_no=request.json.get('phone_no'),
            email=request.json.get('email'),
            address=request.json.get('address'),
            designation_id=designation.id
        )
        
        db.session.add(employee)
        db.session.commit()

        new_employee={            
            "id": employee.id,
            "first_name": employee.first_name,
            "last_name": employee.last_name,
            "phone_no": employee.phone_no,
            "email": employee.email,
            "address": employee.address,
            "designation": designation.name
}
        return flask.jsonify (new_employee)

# update employee   
@app.route('/employee/update/<int:id>', methods=['PUT'])
def update_employee(id):
    if request.method == 'PUT':
        employee = db.session.query(Employee).filter_by(id=id).first()
        employee.first_name = request.json.get('first_name')
        employee.last_name = request.json.get('last_name')
        employee.phone_no = request.json.get('phone_no')
        employee.email = request.json.get('email')
        employee.address = request.json.get('address')
        employee.designation_id = request.json.get('designation_id')
        db.session.commit()
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error'}), 400  
    
# delete employee
@app.route('/employee/delete/<int:id>', methods=['DELETE'])
def delete_employee(id):
    if request.method == 'DELETE':
        employee = db.session.query(Employee).filter_by(id=id).first()
        db.session.delete(employee)
        db.session.commit()
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error'}), 400

# get leave
@app.route('/leave/all', methods=['GET'])
def get_all_leaves():
    if request.method == 'GET':
        leaves = db.session.query(Leave).all()
        leave_list = []
        for leave in leaves:
            leave_data = {
                'id': leave.id,
                'employee_id': leave.employee_id,
                'leave_taken': leave.leave_taken
            }
            leave_list.append(leave_data)
        return jsonify(leave_list)



# # post leave
# @app.route('/leave/add', methods=['POST'])  
# def add_leave():
#     if request.method == 'POST':
#         employee_id = request.json.get('employee_id')
#         leave_taken = request.json.get('leave_taken')
#         new_leave = Leave(employee_id=employee_id, leave_taken=leave_taken)
#         db.session.add(new_leave)
#         db.session.commit()
#         return jsonify({'status': 'success'})
#     else:
#         return jsonify({'status': 'error'}), 400  # Return a 400 Bad Request status code





@app.route('/leave/add/<int:emp_id>', methods=['POST'])
def add_leave(emp_id):
    if request.method == 'POST':
        employee_id = emp_id

        total_leave_taken = db.session.query(db.func.count(Leave.leave_taken)).filter_by(employee_id=employee_id).scalar() or 0
        
        employee = Employee.query.filter_by(id=employee_id).first()
        if not employee:
            return jsonify({'status': 'error', 'message': 'Employee not found'})

        leave_allotted = employee.designation.leave_allotted
        print(total_leave_taken, leave_allotted)

        # Check if the leave taken exceeds the allotted leave
        if total_leave_taken > leave_allotted:
            return jsonify({'status': 'error', 'message': 'No more leave available'})

        # Add new leave record
        new_leave = Leave(employee_id=employee_id, leave_taken=total_leave_taken+1)
        db.session.add(new_leave)
        db.session.commit()

        return jsonify({'status': 'success', 'message': 'Leave added successfully'})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid request method'})
# get credential
@app.route('/credentials/all', methods=['GET'])
def get_credentials():
    if request.method == 'GET':
        credentials = db.session.query(Credential).all()
        credential_list = []
        for credential in credentials:
            credential_data = {
                'id': credential.id,
                'username': credential.username,
                'password': credential.password
            }
            credential_list.append(credential_data)
        return jsonify(credential_list) 
    
# list credentials
@app.route('/credentials/add', methods=['POST'])
def add_credentials():
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')
        credential = Credential(username=username, password=password)
        db.session.add(credential)
        db.session.commit()
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error'}), 400  
    
# logout
@app.route('/logout', methods=['POST'])
def logout():
    db.session.pop('username, None') 
    return jsonify({'status': 'success'})

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    init_db()
    app.run(port=5000)
