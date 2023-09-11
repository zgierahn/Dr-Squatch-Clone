from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    subscription = db.Column(db.Boolean)
    rewards_points = db.Column(db.Integer)
    profile_image = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    edited_at = db.Column(db.DateTime)
    hashed_password = db.Column(db.String(255), nullable=False)


    reviews = db.relationship(
        "Review",
        cascade="all, delete-orphan",
        back_populates="user"
    )

    orders = db.relationship(
            "Order",
            cascade="all, delete-orphan",
            back_populates="user"
        )

    addresses = db.relationship(
        "Address",
        cascade="all, delete-orphan",
        back_populates="user"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            "firstName" : self.firstName,
            "lastName" : self.lastName,
            "email" : self.email,
            "subscription" : self.subscription,
            "rewardsPoints" : self.rewards_points,
            "profileImage" : self.profile_image,
            "createdAt" : self.created_at,
            "editedAt" : self.edited_at,
            'addresses': [info.to_dict() for info in self.addresses]
        }
