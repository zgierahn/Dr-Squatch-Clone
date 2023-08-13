from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    rev1 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev2 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev3 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev4 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev5 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev6 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev7 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev8 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev9 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")
    rev10 = Review(
        title="", body="", rating="", created_at="", userId="", productId="")


    db.session.add_all([rev1, rev2, rev3, rev4, rev5, rev6, rev7, rev8, rev9, rev10])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
