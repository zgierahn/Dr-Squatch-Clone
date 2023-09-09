from flask import Blueprint, jsonify, request
from app.models import db
from flask_login import login_required
from app.models import User, Address
from ..forms.address_form import AddressForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


#Delete an Existing User
@user_routes.route("/<int:id>/delete", methods=['GET','DELETE'])
@login_required
def delete_user(id):
  user = User.query.get(id)
  db.session.delete(user)
  db.session.commit()
  return {'message':'deleted'}


#Create an Address by User
@user_routes.route("/<int:userId>/address", methods=["POST"])
@login_required
def create_address(userId):
   form = AddressForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   if form.validate_on_submit():
      address = Address(
         category = form.data['category'],
         address1 = form.data['address1'],
         address2 = form.data['address2'],
         address3 = form.data['address3'],
         city = form.data['city'],
         state = form.data['state'],
         postal_code = form.data['postal_code'],
         country = form.data['country'],
         user_id = userId
      )
      db.session.add(address)
      db.session.commit()
      return address.to_dict()
   return {'errors': 'error'}, 401


#Edit an Address by User
@user_routes.route("/<int:userId>/address/<int:addressId>/edit", methods=['GET','POST','PUT'])
@login_required
def edit_address(userId, addressId):
   form = AddressForm()
   form['csrf_token'].data = request.cookies['csrf_token']
   address = Address.query.get(addressId)
   if form.validate_on_submit():
      address.category = form.data['category']
      address.address1 = form.data['address1']
      address.address2 = form.data['address2']
      address.address3 = form.data['address3']
      address.city = form.data['citry']
      address.state = form.data['state']
      address.postal_code = form.data['postal_code']
      address.country = form.data['country']
      db.session.commit()
      return address.to_dict()
   return {'errors': 'error'}, 401


#Delete an Existing Address
@user_routes.route("/<int:userId>/address/<int:addressId>/delete", methods=['GET','POST','DELETE'])
@login_required
def delete_address(userId, addressId):
  address = Address.query.get(addressId)
  if address.user_id == userId:
     db.session.delete(address)
     db.session.commit()
     return {'message':'deleted'}
  return {'errors': 'error'}, 401
