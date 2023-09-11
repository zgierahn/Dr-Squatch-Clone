from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from .login_form import password_matches
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def firstname_exists(form, field):
    firstName = field.data
    if len(firstName) < 2:
        raise ValidationError('First name must have at least 2 charactors')
    if len(firstName) > 25:
        raise ValidationError('First name must be less than 25 charactors')

def lastname_exists(form, field):
    lastName = field.data
    if len(lastName) < 2:
        raise ValidationError('Last name must have at least 2 charactors')
    if len(lastName) > 25:
        raise ValidationError('Last name must be less than 25 charactors')

def password_exists(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must have at least 6 charactors')
    if len(password) > 25:
        raise ValidationError('Password must be less than 25 charactors')

def is_valid(form, field):
    el = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    email = field.data
    if not re.match(el, email):
        raise ValidationError('Invalid email address.')


class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, is_valid])
    firstName = StringField('firstname', validators=[DataRequired(), firstname_exists])
    lastName = StringField('lastname', validators=[DataRequired(), lastname_exists])
    password = StringField('password', validators=[DataRequired(), password_exists])

class ChangeEmailForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists, is_valid])

class ChangeNameForm(FlaskForm):
    firstName = StringField('firstname', validators=[DataRequired(), firstname_exists])
    lastName = StringField('lastname', validators=[DataRequired(), lastname_exists])

class ChangePasswordForm(FlaskForm):
    email = StringField('email')
    password = StringField('password', validators=[DataRequired(), password_matches])
    newPassword = StringField('newpassword', validators=[DataRequired(), password_exists])

class UserImageForm(FlaskForm):
    profileImage = StringField('profileImage', validators=[DataRequired()])
