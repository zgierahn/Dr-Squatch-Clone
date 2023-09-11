from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, Review
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from ..forms.review_form import ReviewForm
from datetime import date

review_routes = Blueprint('reviews', __name__)

db_url = "sqlite:///dev.db"
engine = create_engine(db_url)
SessionFactory = sessionmaker(bind=engine)
session = SessionFactory()


#Get review by Id
@review_routes.route('/<int:reviewId>')
def review(reviewId):
    review = Review.query.get(reviewId)
    return review.to_dict()


#Get reviews by product Id
@review_routes.route('/products/<int:productId>')
def reviewsByProduct(productId):
    reviews = Review.query.filter(Review.product_id == productId)
    return [review.to_dict() for review in reviews]


#Create a new review
@review_routes.route('/products/<int:productId>/new', methods=['POST'])
@login_required
def create_Review(productId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    existing_review = Review.query.filter(Review.product_id == productId)
    if existing_review is True:
        return {'error':'Review for Product already exists'},403
    if form.validate_on_submit():
        review = Review(
            title = form.data['title'],
            body = form.data['body'],
            rating = form.data['rating'],
            created_at = date.today(),
            user_id = current_user.id,
            product_id = productId,
        )
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
    form = ReviewForm()
    review = Review.query.get(reviewId)
    form['csrf_token'].data = request.cookies['csrf_token']
    review.title = form.data['title']
    review.body = form.data['body']
    review.rating = form.data['rating']
    review.edited_at = date.today()
    db.session.commit()
    return review.to_dict()



###########test stuff#############
session.close()
engine.dispose()
