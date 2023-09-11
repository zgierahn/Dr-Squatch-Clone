from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class AddressForm(FlaskForm):
    category = StringField('category', validators=[DataRequired()])
    address1 = StringField('address1', validators=[DataRequired()])
    address2 = StringField('address2')
    address3 = StringField('address3')
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    postal_code = IntegerField('postal_code', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
