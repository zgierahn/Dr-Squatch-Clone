from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class EditReviewForm(FlaskForm):
    name = StringField('name')
    server_id=IntegerField('Server ID')
