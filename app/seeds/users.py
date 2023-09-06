from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstName='Demo', lastName = "User", email='demo@aa.io', rewards_points = 10, profile_image="https://img.cdn-pictorem.com/uploads/collection/E/EF5MND10RMF/900_Coolbits-Art_monkey13.jpg", created_at= datetime(2023, 8, 5), password='password')
    marnie = User(
        firstName='Marnie', lastName= "Last", email='marnie@aa.io', rewards_points = 10, profile_image="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/02/pokemon-journeys-anime-marnie-debut.jpg", created_at= datetime(2023, 8, 5), password='password')
    bobbie = User(
        firstName='Ricky', lastName="Bobby", email='bobbie@aa.io', rewards_points = 10, profile_image="https://www.dictionary.com/e/wp-content/uploads/2018/03/Ricky-Bobby.jpg", created_at= datetime(2023, 8, 5), password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
