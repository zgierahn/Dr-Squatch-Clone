from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class ReviewForm(FlaskForm):
    title = StringField('title')
    body = StringField('body')
    rating=IntegerField('rating')
