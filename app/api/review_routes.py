from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Review
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..forms.create_review_form import CreateReviewForm
from ..forms.edit_review_form import EditReviewForm
from datetime import date

review_routes = Blueprint('reviews', __name__)

db_url = "sqlite:///dev.db"
engine = create_engine(db_url)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()

#Get reviews by product Id
@review_routes.route('/products/<int:productId>')
def reviews(productId):
    reviews = Review.query.filter(Review.product_id ==productId)
    print('-----------------reviews--------------------', reviews)
    return [review.to_dict() for review in reviews]


#Create a new review
@review_routes.route('/products/<int:productId>/new', methods=['POST'])
@login_required
def create_Review(productId):
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    existing_review = Review.query.filter(form.data['name']==Review.name)
    if existing_review is True:
        return {'error':'Review for Product already exists'},403
    if form.validate_on_submit():
        review = Review(
            title = form.data['title'],
            body = form.data['body'],
            rating = form.data['rating'],
            created_at = str(date.today()),
            productId = form.data['productId'],
            userId = current_user,
            productId = productId,
        )
        # print('-----------------backend---------------------',review)
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': 'error'}, 401


#Delete an Existing Review
@review_routes.route("/delete/<int:reviewId>", methods=['GET','POST','DELETE'])
@login_required
def delete_review(reviewId):
  review = Review.query.get(reviewId)
  db.session.delete(review)
  db.session.commit()
  return {'message':'deleted'}


#Edit and Existing review
@review_routes.route('/edit/<int:reviewId>', methods=['GET','POST','PUT'])
@login_required
def edit_review(reviewId):
    form = EditReviewForm()
    review = Review.query.get(reviewId)
    form['csrf_token'].data = request.cookies['csrf_token']
    name_dupicate = Review.query.filter(form.data['name']==Review.name)
    name_dupicate_length =len([review.to_dict() for review in name_dupicate])
    if name_dupicate_length > 0:
        return {'error':'Review name already exists'},401
    review.name = form.data['name']
    # review.server_id=serverId
    db.session.commit()
    return review.to_dict()
    # return {'errors': 'error'}, 401


@review_routes.route('/<int:reviewId>')
@login_required
def single_channel(reviewId):
    review = Review.query.get(reviewId)
    return review.to_dict()

###########test stuff#############
session.close()
engine.dispose()
