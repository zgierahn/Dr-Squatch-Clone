from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    rev1 = Review(
        title="loved it", body="This stuff is great!", rating="5", created_at=datetime(2023, 10, 3), userId="1", productId="1")
    rev2 = Review(
        title="great", body="This stuff smells great", rating="4", created_at=datetime(2023, 10, 3), userId="2", productId="1")
    rev3 = Review(
        title="yes", body="I really liked it", rating="5", created_at=datetime(2023, 10, 3), userId="2", productId="2")
    rev4 = Review(
        title="no", body="what is that smell? Oooh that smell", rating="1", created_at=datetime(2023, 10, 3), userId="2", productId="3")
    rev5 = Review(
        title="great", body="I really liked the way this smells", rating="4", created_at=datetime(2023, 10, 3), userId="2", productId="4")
    rev6 = Review(
        title="like it", body="okay for the price", rating="3", created_at=datetime(2023, 10, 3), userId="3", productId="1")
    rev7 = Review(
        title="love it", body="My gf loves the way I smell", rating="5", created_at=datetime(2023, 10, 3), userId="3", productId="2")
    rev8 = Review(
        title="this is great", body="I get compliments with this", rating="5", created_at=datetime(2023, 10, 3), userId="3", productId="5")
    rev9 = Review(
        title="average", body="it's kind of pricey but i enjoy it", rating="4", created_at=datetime(2023, 10, 3), userId="3", productId="10")
    rev10 = Review(
        title="okay", body="nothing special to me", rating="3", created_at=datetime(2023, 10, 3), userId="3", productId="15")


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
