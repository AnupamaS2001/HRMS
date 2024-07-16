from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
import logging
from datetime import datetime,timezone
from sqlalchemy import String, create_engine, UniqueConstraint
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column, sessionmaker, relationship

class Base(DeclarativeBase):
  def __repr__(self):
    return f"{self.__class__.__name__}(id={self.id})"
  

db = SQLAlchemy(model_class=Base)




class Credential(db.Model):
    __tablename__ = 'credential'
    __table_arg__ = (UniqueConstraint('username', 'password'))
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(80), nullable=False)
    password: Mapped[str] = mapped_column(String(80), nullable=False)

class Designation(db.Model):
    __tablename__ = 'designation'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)
    leave_allotted: Mapped[int] = mapped_column(nullable=False)

class Employee(db.Model):
    __tablename__ = 'employee'
    __table_arg__ =(UniqueConstraint('phone_no', 'email'))
    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone_no: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    address: Mapped[str] = mapped_column(String(100), nullable=False)
    designation_id: Mapped[int] = mapped_column(ForeignKey('designation.id'), nullable=False)
    designation : Mapped['Designation'] = relationship('Designation', backref='employee', lazy=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now,nullable=False)
    deleted_at: Mapped[datetime] = mapped_column(nullable=True)
    

class Leave(db.Model):
    __tablename__ = 'leave'

    id: Mapped[int] = mapped_column(primary_key=True)
    employee_id: Mapped[int] = mapped_column(ForeignKey('employee.id'), nullable=False)
    leave_taken: Mapped[int] = mapped_column(nullable=False)
    employee: Mapped['Employee'] = relationship('Employee', backref='leave', lazy=True)

def init_db(db_uri='postgresql://anu:1234@localhost:5432/flaskdb'):
    logger = logging.getLogger("FlaskApp")
    engine = create_engine(db_uri)
    Base.metadata.create_all(engine)
    logger.info("Created database")


def get_session(db_uri):
    engine = create_engine(db_uri)
    Session = sessionmaker(bind=engine)
    session = Session()
    return session
