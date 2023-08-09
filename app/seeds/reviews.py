from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    # deo1 = Product(
    #     category='Deodorant', name = "Pine Tar Deodorant", description="Rugged, woodsy, and strong, just like a Squatch man should be.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/PineTarDeo_1_1.png?v=1617219566')
    # deo2 = Product(
    #     category='Deodorant', name = "Summer Citrus Deodorant", description="Bright and energizing, like a lemonade on a summer day.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/Frame15.png?v=1662072944')
    # soa1 = Product(
    #     category='Bar Soap', name= "Pine Tar", description="Rugged, woodsy, and strong, just like a Squatch man should be.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/PineTar_1.png?v=1616617621')
    # fac1 = Product(
    #     category='Face Care', name= "Fresh Falls Face Wash", description="Cleanse and exfoliate with energizing scents of water, birch, and pine.", price=14, photos='https://www.drsquatch.com/cdn/shop/files/Frame2896_9e126e25-3812-4288-b412-0f5bcac9711a.png?v=1686237588')
    # hai1 = Product(
    #     category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    # lot1 = Product(
    #     category='Lotion', name= "Pine Tar Lotion", description="Hydrate with ultra-manly scent of fresh-cut pine.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/Frame6_739d66ef-e486-4021-af8f-44c500db06d2.png?v=1688142913')
    # too1 = Product(
    #     category='Toothpaste', name= "Citrus Mint - Morning", description="Squatch morning breath with citrus mint", price=12, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_Toothpaste_IMG_6082.png?v=1636391929')


    # db.session.add_all([deo1, deo2])
    # db.session.add(soa1)
    # db.session.add(fac1)
    # db.session.add(hai1)
    # db.session.add(lot1)
    # db.session.add(too1)
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
