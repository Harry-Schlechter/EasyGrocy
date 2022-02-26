from easygrocy import db
from easygrocy.models import groupuser, itemuser

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.Text, nullable=False)
    name = db.Column(db.Text, nullable=False)

    groups = db.relationship('Group', secondary=groupuser, lazy='subquery',
        backref='users')

    items = db.relationship('Item', secondary=itemuser, lazy='subquery',
        backref='users')
