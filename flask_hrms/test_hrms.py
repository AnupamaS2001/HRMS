import unittest
from flask import Flask,json
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from models import *
from app import app, db, Credential

bcrypt = Bcrypt(app)

class RegisterTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push() 

        self.client = self.app.test_client()
        self.app.testing=True
        db.create_all()


    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_register_success(self):
        response = self.client.post('/register', json={
            'username': 'testuser',
            'password': 'testpassword'
        })
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'success')
        
        # Check if the user is actually added to the database
        user = Credential.query.filter_by(username='testuser').first()
        self.assertIsNotNone(user)
    def test_register_error(self):
        response = self.client.post('/register', json={
            'username': 'user',   
        })

        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(data['status'], 'error')

class LoginTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push() 

        self.client = self.app.test_client()
        self.app.testing=True
        db.create_all()

        self.test_username = 'testuser'
        self.test_password = 'testpassword'
        hashed_password = bcrypt.generate_password_hash(self.test_password).decode('utf-8')
        user = Credential(username=self.test_username, password=hashed_password)
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_login_success(self):
        response = self.client.post('/login', json={
            'username': self.test_username,
            'password': self.test_password
        })
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'success')

        
    def test_login_null_fields(self):
        response = self.client.post('/login', json={
            'username': '',
            'password': ''
        })
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'fill fields')

    def test_login_invalid_username(self):
        response = self.client.post('/login', json={
            'username': 'invaliduser',
            'password': self.test_password
        })
        data=json.loads(response.data.decode('utf-8'))
        # self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'username error')

    def test_login_invalid_password(self):
        response = self.client.post('/login', json={
            'username': self.test_username,
            'password': 'invalidpassword'
        })
        data=json.loads(response.data.decode('utf-8'))
        # self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'password error')

class GetDesignationTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push() 

        self.client = self.app.test_client()
        self.app.testing=True
        db.create_all()

        self.test_designation =Designation(name='testdesignation', leave_allotted=10)
        db.session.add(self.test_designation)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_all_designations(self): 
        response = self.client.get('/designation/all')
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'success') 

class PostDesignationTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push() 

        self.client = self.app.test_client()
        self.app.testing=True
        db.create_all()

        self.test_designation =Designation(name='testdesignation', leave_allotted=10)
        db.session.add(self.test_designation)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_post_designation(self):
        response = self.client.post('/designation/add', json={
            'name': 'testdesignation',
            'leave_allotted': 10
        })
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'designation added success')

    def test_post_designation_fill_fields(self):
        response = self.client.post('/designation/add', json={
            'name': '',
            'leave_allotted': ''
        })
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'fill fields')

class UpdateDesignationTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing=True
        db.create_all()


        self.test_designation =Designation(name='testdesignation', leave_allotted=10)
        db.session.add(self.test_designation)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_update_designation(self):
        response = self.client.put('/designation/update/1', json={
            'name': 'testdesignation',
            'leave_allotted': 10
        })  
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'designation updated success')

    def test_update_designation_fill_fields(self):
        response = self.client.put('/designation/update/1', json={
            'name': '',
            'leave_allotted': ''
        })   
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data['status'], 'fill fields')

    def test_update_designation_not_found(self):
        response = self.client.put('/designation/update/2', json={
            'name': 'testdesignation',
            'leave_allotted': 10
        })  
        data=json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 404)
        self.assertEqual(data['status'], 'error')

class GetAllEmployeesTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        self.test_designation = Designation(name='testdesignation', leave_allotted=10)
        db.session.add(self.test_designation)
        db.session.commit()

        self.test_employee = Employee(
            first_name='John',
            last_name='Doe',
            phone_no='1234567890',
            email='john.doe@example.com',
            address='123 Test St',
            designation_id=self.test_designation.id,
            created_at=datetime.now(),
            deleted_at=None
        )
        db.session.add(self.test_employee)
        db.session.commit()

        self.test_leave = Leave(
        employee_id=self.test_employee.id,
        leave_taken=0
        )
        db.session.add(self.test_leave)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_all_employees(self):
        response = self.client.get('/employee/all')
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'success')
        self.assertEqual(len(data['data']), 1)
        self.assertEqual(data['data'][0]['first_name'], 'John')
        self.assertEqual(data['data'][0]['last_name'], 'Doe')
        self.assertEqual(data['data'][0]['phone_no'], '1234567890')
        self.assertEqual(data['data'][0]['email'], 'john.doe@example.com')
        self.assertEqual(data['data'][0]['address'], '123 Test St')
        self.assertEqual(data['data'][0]['designation'], 'testdesignation')
        self.assertEqual(data['data'][0]['leave_taken'], 1)
        self.assertEqual(data['data'][0]['leave_allotted'], 10)

class GetOneEmployeeTestCase(unittest.TestCase):
        def setUp(self):
            self.app = app
            self.app_context = self.app.app_context()
            self.app_context.push()

            self.client = self.app.test_client()
            self.app.testing = True
            db.create_all()

            self.test_designation = Designation(name='testdesignation', leave_allotted=10)
            db.session.add(self.test_designation)
            db.session.commit()

            self.test_employee = Employee(
                first_name='John',
                last_name='Doe',
                phone_no='1234567890',
                email='john.doe@example.com',
                address='123 Test St',
                designation_id=self.test_designation.id,
                created_at=datetime.now(),
                deleted_at=None
            )
            db.session.add(self.test_employee)
            db.session.commit()

            self.test_leave = Leave(
            employee_id=self.test_employee.id,
            leave_taken=0
            )
            db.session.add(self.test_leave)
            db.session.commit()

        def tearDown(self):
            db.session.remove()
            db.drop_all()

        


        def test_get_existing_employee(self):

            response = self.client.get('/employee/1')
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['data']['first_name'], 'John')
            self.assertEqual(data['data']['last_name'], 'Doe')
            self.assertEqual(data['data']['phone_no'], '1234567890')
            self.assertEqual(data['data']['email'], 'john.doe@example.com')
            self.assertEqual(data['data']['address'], '123 Test St')
            self.assertEqual(data['data']['designation'], 'testdesignation')
            self.assertEqual(data['data']['created_at'], datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            self.assertEqual(data['data']['deleted_at'], None)
            self.assertEqual(data['data']['leave_taken'], 1)
            self.assertEqual(data['data']['leave_allotted'], 10)
        
        def test_get_non_existing_employee(self):

            response = self.client.get('/employee/2')
            self.assertEqual(response.status_code, 404)

class PostEmployeeTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        self.test_designation = Designation(name='testdesignation', leave_allotted=10)
        db.session.add(self.test_designation)
        db.session.commit()

        self.test_employee = Employee(
            first_name='John',
            last_name='Doe',
            phone_no='1234567890',
            email='john.doe@example.com',
            address='123 Test St',
            designation_id=self.test_designation.id,
            created_at=datetime.now(),
            deleted_at=None

        )
        db.session.add(self.test_employee)      
        db.session.commit()

        self.test_leave = Leave(
        employee_id=self.test_employee.id,
        leave_taken=0
        )
        db.session.add(self.test_leave)
        db.session.commit()



    def tearDown(self):
        db.session.remove()
        db.drop_all()


    def test_add_employee(self):
        response = self.client.post('/employee/add', json={
            'first_name': 'Jane',
            'last_name': 'Doe',
            'phone_no': '9876543210',
            'email': 'jane.doe@example.com',
            'address': '456 Test St',
            'designation_id': self.test_designation.id
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['data']['first_name'], 'Jane')
        self.assertEqual(data['data']['last_name'], 'Doe')
        self.assertEqual(data['data']['phone_no'], '9876543210')
        self.assertEqual(data['data']['email'], 'jane.doe@example.com')
        self.assertEqual(data['data']['address'], '456 Test St')
        self.assertEqual(data['data']['designation'], 'testdesignation')
        

class UpdateEmployeeTestCase(unittest.TestCase):
        def setUp(self):
            self.app = app
            self.app_context = self.app.app_context()
            self.app_context.push()

            self.client = self.app.test_client()
            self.app.testing = True
            db.create_all()

            self.test_designation = Designation(name='testdesignation', leave_allotted=10)
            db.session.add(self.test_designation)
            db.session.commit()

            self.test_employee = Employee(
                first_name='John',
                last_name='Doe',
                phone_no='1234567890',
                email='john.doe@example.com',
                address='123 Test St',
                designation_id=self.test_designation.id,
                created_at=datetime.now(),
                deleted_at=None
            )
            db.session.add(self.test_employee)
            db.session.commit()

            self.test_leave = Leave(
            employee_id=self.test_employee.id,
            leave_taken=0
            )
            db.session.add(self.test_leave)
            db.session.commit() 

        def tearDown(self):
            db.session.remove()
            db.drop_all()

        def test_success_update_employee(self):  

            response = self.client.put('/employee/update/1', json={
                'first_name': 'Jane',
                'last_name': 'Doe',
                'phone_no': '9876543210',
                'email': 'jane.doe@example.com',
                'address': '456 Test St',
                'designation_id': self.test_designation.id
            })
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['status'], 'success')
            
        def test_update_employee_not_found(self):

            response = self.client.put('/employee/update/2', json={
                'first_name': 'Jane',
                'last_name': 'Doe',
                'phone_no': '9876543210',
                'email': 'jane.doe@example.com',
                'address': '456 Test St',
                'designation_id': self.test_designation.id
            })
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(response.status_code, 404)
            self.assertEqual(data['message'],'Employee not found')


        def test_update_employee_designation_not_found(self):

            response = self.client.put('/employee/update/1', json={
                'first_name': 'Jane',
                'last_name': 'Doe',
                'phone_no': '9876543210',
                'email': 'jane.doe@example.com',
                'address': '456 Test St',
                'designation_id': 23
            })
            data = json.loads(response.data.decode('utf-8'))
            self.assertEqual(response.status_code, 404)
            self.assertEqual(data['message'],'Designation not found')

class DeleteEmployeeTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        self.test_designation = Designation(name='testdesignation', leave_allotted=10)
        db.session.add(self.test_designation)
        db.session.commit()

        self.test_employee = Employee(
            first_name='John',
            last_name='Doe',
            phone_no='1234567890',
            email='john.doe@example.com',
            address='123 Test St',
            designation_id=self.test_designation.id,
            created_at=datetime.now(),
            deleted_at=None
        )
        db.session.add(self.test_employee)
        db.session.commit()

        self.test_leave = Leave(
        employee_id=self.test_employee.id,
        leave_taken=0
        )
        db.session.add(self.test_leave)
        db.session.commit() 

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_success_delete_employee(self):
        response = self.client.post('/employee/delete/1')
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], True)
        self.assertEqual(data['message'], 'Employee deleted successfully')


    def test_delete_employee_not_found(self):
        response = self.client.post('/employee/delete/9999')  # Using an ID that does not exist
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 404)
        self.assertEqual(data['status'], False)
        self.assertEqual(data['message'], 'Employee not found')

class PostLeaveTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()

        self.test_designation = Designation(name='testdesignation', leave_allotted=2)
        db.session.add(self.test_designation)
        db.session.commit()

        self.test_employee = Employee(
            first_name='John',
            last_name='Doe',
            phone_no='1234567890',
            email='john.doe@example.com',
            address='123 Test St',
            designation_id=self.test_designation.id,
            created_at=datetime.now(),
            deleted_at=None 
        )
        db.session.add(self.test_employee)
        db.session.commit() 

        self.test_leave = Leave(
        employee_id=self.test_employee.id,
        leave_taken=0
        )
        db.session.add(self.test_leave)
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()   

    def test_success_post_leave(self):
        response = self.client.post('/leave/add/1', json={
            'leave_taken': 5
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'success')
        self.assertEqual(data['message'], 'Leave added successfully')


    def test_leave_employee_not_found(self):
        response = self.client.post('/leave/add/22', json={
            'leave_taken': 5
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 404)
        self.assertEqual(data['status'], 'error')
        self.assertEqual(data['message'], 'Employee not found')

    def test_leave_taken_exceeds_allotted(self):
        test_leave = Leave(
        employee_id=self.test_employee.id,
        leave_taken=1
        )
        db.session.add(test_leave)
        db.session.commit()
        response = self.client.post('/leave/add/1', json={
            'leave_taken': 2
        })
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'error')
        self.assertEqual(data['message'], 'No more leave available')


class LogoutTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()
        self.app.testing = True
        db.create_all()


    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_logout(self):
        with self.client.session_transaction() as session:
            session['username'] = 'test'
        response = self.client.post('/logout', json={})
        data = json.loads(response.data.decode('utf-8'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['status'], 'success')
        with self.client.session_transaction() as session:
            self.assertEqual(session.get('username'), None)


if __name__ == '__main__':
    unittest.main()