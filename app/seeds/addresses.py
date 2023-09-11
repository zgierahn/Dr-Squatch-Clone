from app.models import db, Address, environment, SCHEMA
from sqlalchemy.sql import text



# Adds a demo user, you can add other users here if you want
def seed_addresses():
    add1 = Address(
        category = "shipping", address1 = '123 Street', city = "Foosha", state = "East Blue", postal_code = 12345, country = "New World", user_id = 1)
    add2 = Address(
        category = "both", address1 = '456 Street', city = "Denver", state = "CO", postal_code = 90210, country = "New World", user_id = 2)
    add3 = Address(
        category = "billing", address1 = '789 Street', city = "Talladega", state = "Al", postal_code = 90210, country = "United States", user_id = 3)

    db.session.add(add1)
    db.session.add(add2)
    db.session.add(add3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_addresses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.addresses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM addresses"))

    db.session.commit()
