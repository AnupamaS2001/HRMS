from flask import Flask, request, jsonify,session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS,cross_origin
from models import *
import flask 
import datetime as dt
from flask_bcrypt import Bcrypt 


app = Flask(__name__)
bcrypt = Bcrypt(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://anu:1234@localhost:5432/flaskdb"

db.init_app(app)
CORS(app)

app.secret_key = 'anupama123'
@app.route("/")
def home():
    return "Hello, world"

#register
@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')
        if not username or not password:
            return jsonify({'status': 'error'}), 400
        hashed_password = bcrypt.generate_password_hash (password).decode('utf-8') 
        user = Credential(username=username, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'status': 'success'})
    

#login
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return jsonify({'status': 'fill fields'}), 400
    user = db.session.query(Credential).filter_by(username=username).first()
    if user==None:
            return jsonify({'status': 'username error'})
    isvalid = bcrypt.check_password_hash(user.password, password)
           
    if isvalid:
            session['username'] = username  
            return jsonify({'status': 'success'}),200

    return jsonify({'status': 'password error'}),400
        
#get designtion
@app.route('/designation/all', methods=['GET'])
@cross_origin()
def get_all_designations():
        designations = db.session.query(Designation).all()
        designation_list = []
        for designation in designations:
            designation_data = {
                'id': designation.id,
                'name': designation.name,
                'leave_allotted': designation.leave_allotted
            }
            designation_list.append(designation_data)
        return jsonify({'status': 'success', 'data': designation_list})
    
# post designation
@app.route('/designation/add', methods=['POST'])
def add_designation():
        name = request.json.get('name')
        leave_allotted = request.json.get('leave_allotted')
        if not name or not leave_allotted:
            return jsonify({'status': 'fill fields'}), 400
        designation = Designation(name=name, leave_allotted=leave_allotted)

        db.session.add(designation)
        db.session.commit()
        return jsonify({'status': 'designation added success'})
    
# update designation
@app.route('/designation/update/<int:id>', methods=['PUT']) 
@cross_origin()
def update_designation(id):
        data = request.get_json()        
        name = data.get('name')
        leave_allotted = data.get('leave_allotted')
        if not name or not leave_allotted:  
            return jsonify({'status': 'fill fields'}), 400
        designation = db.session.query(Designation).filter_by(id=id).first()
        if designation:
            designation.name = name
            designation.leave_allotted = leave_allotted
            db.session.commit()
            return jsonify({'status': 'designation updated success'})
        else:
            return jsonify({'status': 'error'}), 404  
    
# list employee
@app.route('/employee/all', methods=['GET'])
@cross_origin()
def get_all_employees():
        deleted_employees = Employee.query.filter_by(deleted_at=None).all()

        emp_data = []

        for employee in deleted_employees:
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
        return jsonify({"status": "success","data": emp_data}),200


# get one employee
@app.route('/employee/<int:id>', methods=['GET'])
@cross_origin()
def get_employee(id):
    if request.method == 'GET':
        # Fetch the employee with the given ID
        employee = db.session.query(Employee).filter_by(id=id).first()
        
        # If no employee is found, return an appropriate message
        if not employee:
            return jsonify({"error": "Employee not found"}), 404
        
        # Get the number of leaves taken by the employee
        leave_taken = Leave.query.filter_by(employee_id=employee.id).count()
        
        # Construct the employee details
        emp_details = {
            'id': employee.id,
            'first_name': employee.first_name,
            'last_name': employee.last_name,
            'phone_no': employee.phone_no,
            'email': employee.email,
            'address': employee.address,
            'designation_id': employee.designation.id,
            'designation': employee.designation.name,
            'created_at': employee.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'deleted_at': employee.deleted_at.strftime('%Y-%m-%d %H:%M:%S') if employee.deleted_at else None,
            'leave_taken': leave_taken,
            'leave_allotted': employee.designation.leave_allotted
        }
        
        # return jsonify (emp_details)
        return jsonify({'data': emp_details}), 200



# post employee

@app.route('/employee/add', methods=['POST'])
def add_employee():
        
        

        employee = Employee(
            first_name=request.json.get('first_name'),
            last_name=request.json.get('last_name'),
            phone_no=request.json.get('phone_no'),
            email=request.json.get('email'),
            address=request.json.get('address'),
            designation_id=request.json.get('designation_id'),
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
            "designation": employee.designation.name
}
        # return flask.jsonify (new_employee)
        return jsonify({'data': new_employee}), 201


# update employee   


@app.route('/employee/update/<int:id>', methods=['PUT'])
def update_employee(id):
    if request.method == 'PUT':
        data = request.json
        print(data)
        # Fetch the employee
        employee = db.session.query(Employee).filter_by(id=id).first()
        if not employee:
            return jsonify({'status': 'error', 'message': 'Employee not found'}), 404

        # Update employee fields
        employee.first_name = data.get('first_name')
        employee.last_name = data.get('last_name')
        employee.phone_no = data.get('phone_no')
        employee.email = data.get('email')
        employee.address = data.get('address')
        
        # Fetch and update designation
        designation_id = data.get('designation_id')
        if designation_id:
            designation = db.session.query(Designation).get(designation_id)
            if designation:
                employee.designation_id = designation.id
            else:
                return jsonify({'status': 'error', 'message': 'Designation not found'}), 404

        db.session.commit()
        return jsonify({'status': 'success'})

    
# delete employee
@app.route('/employee/delete/<int:id>', methods=['POST'])
@cross_origin()
def delete_employee(id):
    if request.method == 'POST':
        # data=request.get_json()
        now=dt.datetime.now(dt.timezone.utc).isoformat()
        # employeeId=data['id']
        employee=db.session.query(Employee).filter_by(id=id).first()
        if not employee:
            return jsonify({"data":{},
            "status":False,
            "message":"Employee not found"}),404
        employee.deleted_at=now
        db.session.commit()
        return jsonify({"data":{},
        "status":True,
        "message":"Employee deleted successfully"}),200


# post leave

@app.route('/leave/add/<int:emp_id>', methods=['POST'])
def add_leave(emp_id):
    if request.method == 'POST':
        employee_id = emp_id

        total_leave_taken = db.session.query(db.func.count(Leave.leave_taken)).filter_by(employee_id=employee_id).scalar() or 0
        
        employee = Employee.query.filter_by(id=employee_id).first()
        if not employee:
            return jsonify({'status': 'error', 'message': 'Employee not found'}),404

        leave_allotted = employee.designation.leave_allotted
        print(total_leave_taken, leave_allotted)

        # Check if the leave taken exceeds the allotted leave
        if total_leave_taken >= leave_allotted:
            return jsonify({'status': 'error', 'message': 'No more leave available'}),200

        # Add new leave record
        new_leave = Leave(employee_id=employee_id, leave_taken=total_leave_taken+1)
        db.session.add(new_leave)
        db.session.commit()

        return jsonify({'status': 'success', 'message': 'Leave added successfully'})


    
# logout
@app.route('/logout', methods=['POST'])
@cross_origin()
def logout():
    session.pop('username', None) 
    return jsonify({'status': 'success'}), 200

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    init_db()
    app.run(port=5000)
