from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm, ChangeNameForm, ChangeEmailForm, ChangePasswordForm, UserImageForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


#Login
@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Logout
@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


#Signup
@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            email=form.data['email'],
            firstName=form.data['firstName'],
            lastName=form.data['lastName'],
            rewards_points = 10,
            created_at = datetime.utcnow(),
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


#Edit name of User
@auth_routes.route('/edit-name/<int:id>', methods=['GET', 'POST', 'PUT'])
@login_required
def change_name(id):
    user = User.query.get(id)
    form = ChangeNameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.firstName = form.data['firstName']
        user.lastName = form.data['lastName']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Edit Email of User
@auth_routes.route('/edit-email/<int:id>', methods=['GET', 'POST', 'PUT'])
@login_required
def change_email(id):
    user = User.query.get(id)
    form = ChangeEmailForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.email = form.data['email']
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Edit Password of User
@auth_routes.route('/edit-password/<int:id>', methods=['GET', 'POST', 'PUT'])
@login_required
def change_password(id):
    user = User.query.get(id)
    form = ChangePasswordForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.password = form.data['newPassword']
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Add User Image
@auth_routes.route('/profile-image/<int:id>/put', methods=['GET', 'PUT', 'POST'])
@login_required
def add_profile_image(id):
    user = User.query.get(id)
    form = UserImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user.profile_image = form.data['profileImage']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Remove User Image
@auth_routes.route('/profile-image/<int:id>/delete', methods=['GET', 'POST', 'DELETE'])
@login_required
def remove_profile_image(id):
    user = User.query.get(id)
    if current_user.id == user.id:
        user.profile_image = None
        db.session.commit()
        return user.to_dict()
    return {'errors': "an error occured"}, 401
