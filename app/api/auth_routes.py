from flask import Blueprint, jsonify, session, request, abort, redirect
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm, ChangeNameForm, ChangeEmailForm, ChangePasswordForm, UserImageForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import os
import pathlib
import requests


auth_routes = Blueprint('auth', __name__)

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1" # to allow Http traffic for local dev

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_OAUTH_CLIENT_ID')
GOOGLE_PASSWORD = os.environ.get('GOOGLE_PASSWORD')
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

print("secret: ", client_secrets_file)

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://localhost:5000/api/auth/callback"
)

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

@auth_routes.route("/callback")
def callback():
    # print('----------------------------------callback-----------------------------------------')
    flow.fetch_token(authorization_response=request.url)
    # This method is sending the request depicted on line 6 of our flow chart! The response is depicted on line 7 of our flow chart.
    # I find it odd that the author of this code is verifying the 'state' AFTER requesting a token, but to each their own!!

    # This is our CSRF protection for the Oauth Flow!
    # print('state ', session["state"], '   ---- request state  ', request.args["state"])
    if not session["state"] == request.args["state"]:
        abort(500)  # State does not match!

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    # The method call below will go through the tedious work of verifying the JWT signature sent back with the object from OpenID Connect
    # Although I cannot verify, hopefully it is also testing the values for "sub", "aud", "iat", and "exp" sent back in the CLAIMS section of the JWT
    # Additionally note, that the oauth initializing URL generated in the previous endpoint DID NOT send a random nonce value. (As depicted in our flow chart)
    # If it had, the server would return the nonce in the JWT claims to be used for further verification tests!
    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    # Now we generate a new session for the newly authenticated user!!
    # Note that depending on the way your app behaves, you may be creating a new user at this point...
    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    user123 = User.query.filter(User.email == id_info.get("email")).first()
    print("---------------------user123--------------------------", user123)
    if user123 == None:
        form = SignUpForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        user = User(
            firstName=id_info.get("name"),
            lastName=id_info.get("name"),
            email=id_info.get("email"),
            rewards_points = 10,
            created_at = datetime.utcnow(),
            password=GOOGLE_PASSWORD
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return redirect("http://localhost:3000/") #http://localhost:3000/ was this
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    # Add the user to the session, we are logged in!
    user = User.query.filter(User.email == id_info.get("email")).first()
    login_user(user)
    return redirect("http://localhost:3000/") # This will send the final redirect to our user's browser. As depicted in Line 8 of the flow chart!
    #http://localhost:3000/ was this

@auth_routes.route("/oauth_login")
def oauth_login():
    authorization_url, state = flow.authorization_url()
    print('-------------------------------in oauth login---------------------------------')
    # print("AUTH URL: ", authorization_url) # I recommend that you print this value out to see what it's generating.
    # Ex: https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=NICE TRY&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&state=A0eZyFD4WH6AfqSj7XcdypQ0cMhwr9&access_type=offline
    # It SHOULD look a lot like the URL in the SECOND or THIRD line of our flow chart!
    # Note that in the auth url above the value 'access_type' is set to 'offline'. If you do not send this, the user will NOT see the Google Login screen!!
    # Additionally, note that this URL does NOT contain the 'code_challenge_method' value NOR the 'code_challenge' that can be seen in our flow chart.
    # This package may have been created BEFORE the official Oauth2 consortium began recommending PKCE even for back channel flows...
    # While implementation details are completely obscured by the method .authorization_url() let's note 2 things here.
    # 1) We ARE generating a random value for the 'state' variable. We save it to the session on the line below to compare later.
    # 2) The authorization URL
    print("authorizationurl: ", authorization_url)
    print("STATE: ", state)
    session["state"] = state
    return redirect(authorization_url) # This line technically will enact the SECOND and THIRD lines of our flow chart.


# After a successful login by our user, Google will send a verification code to the endpoint below.
# Using the verification code, we can request an authorization token from Google as long as we do it before it expires. I think 5 minutes...
# This endpoint is being hit by the 5th line in our flow chart.
