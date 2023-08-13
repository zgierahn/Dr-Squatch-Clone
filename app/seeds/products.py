from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# Adds a demo user, you can add other users here if you want
def seed_products():
    deo1 = Product(
        category='Deodorant', name = "Pine Tar Deodorant", description="Rugged, woodsy, and strong, just like a Squatch man should be.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/PineTarDeo_1_1.png?v=1617219566')
    deo2 = Product(
        category='Deodorant', name = "Summer Citrus Deodorant", description="Bright and energizing, like a lemonade on a summer day.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/Frame15.png?v=1662072944')
    deo3 = Product(
        category='Deodorant', name = "Wood Barrel Bourbon Deodorant", description="A rugged and refined blend of spice, bourbon, and oak.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/20210415_WoodBarrel_ProductPhotos_IMG_4711.png?v=1631148399')
    deo4 = Product(
        category='Deodorant', name = "Alpine Sage Deodorant", description="A breezy and warm mix of cypress, patchouli and sage.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/AlpineSageDeo_1.png?v=1616619133')
    deo5 = Product(
        category='Deodorant', name = "Birchwood Breeze Deodorant", description="Fresh and woody with a crisp finish.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/BirhwoodDeo_1.png?v=1616617893')
    deo6 = Product(
        category='Deodorant', name = "Birchwood Breeze Deodorant", description="Fresh and woody with a crisp finish.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/BirhwoodDeo_1.png?v=1616617893')
    deo7 = Product(
        category='Deodorant', name = "Birchwood Breeze Deodorant", description="Fresh and woody with a crisp finish.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/BirhwoodDeo_1.png?v=1616617893')
    deo8 = Product(
        category='Deodorant', name = "Birchwood Breeze Deodorant", description="Fresh and woody with a crisp finish.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/BirhwoodDeo_1.png?v=1616617893')
    deo9 = Product(
        category='Deodorant', name = "Birchwood Breeze Deodorant", description="Fresh and woody with a crisp finish.", price=13.50, photos='https://www.drsquatch.com/cdn/shop/products/BirhwoodDeo_1.png?v=1616617893')



    soa1 = Product(
        category='Bar Soap', name= "Pine Tar", description="Rugged, woodsy, and strong, just like a Squatch man should be.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/PineTar_1.png?v=1616617621')
    soa2 = Product(
        category='Bar Soap', name= "Bay Rum", description="Intoxicatingly delightful cocktail of clove, cinnamon, pine, and citrus.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/BayRum_1.png?v=1616616258')
    soa3 = Product(
        category='Bar Soap', name= "Free Solo Scrub", description="Calm, Elevated, and Fearless, Just Like A Squatch Man Should Be.", price=8, photos='https://www.drsquatch.com/cdn/shop/files/Frame2967.png?v=1686231084')
    soa4 = Product(
        category='Bar Soap', name= "Cool Fresh Aloe", description="Go green with this aloe-built bar that cleans deep without drying you out.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/CoolFreshAloe_1.png?v=1632844339')
    soa5 = Product(
        category='Bar Soap', name= "Fresh Falls", description="Refreshing and clean with a hint of citrus.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/FreshFalls_1.png?v=1616616867')
    soa6 = Product(
        category='Bar Soap', name= "Fresh Falls", description="Refreshing and clean with a hint of citrus.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/FreshFalls_1.png?v=1616616867')
    soa7 = Product(
        category='Bar Soap', name= "Fresh Falls", description="Refreshing and clean with a hint of citrus.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/FreshFalls_1.png?v=1616616867')
    soa8 = Product(
        category='Bar Soap', name= "Fresh Falls", description="Refreshing and clean with a hint of citrus.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/FreshFalls_1.png?v=1616616867')
    soa9 = Product(
        category='Bar Soap', name= "Fresh Falls", description="Refreshing and clean with a hint of citrus.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/FreshFalls_1.png?v=1616616867')
    soa10 = Product(
        category='Bar Soap', name= "Fresh Falls", description="Refreshing and clean with a hint of citrus.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/FreshFalls_1.png?v=1616616867')



    fac1 = Product(
        category='Face Care', name= "Fresh Falls Face Wash", description="Cleanse and exfoliate with energizing scents of water, birch, and pine.", price=14, photos='https://www.drsquatch.com/cdn/shop/files/Frame2896_9e126e25-3812-4288-b412-0f5bcac9711a.png?v=1686237588')
    fac2 = Product(
        category='Face Care', name= "Fresh Falls Face Wash", description="Cleanse and exfoliate with energizing scents of water, birch, and pine.", price=14, photos='https://www.drsquatch.com/cdn/shop/files/Frame2896_9e126e25-3812-4288-b412-0f5bcac9711a.png?v=1686237588')
    fac3 = Product(
        category='Face Care', name= "Fresh Falls Face Wash", description="Cleanse and exfoliate with energizing scents of water, birch, and pine.", price=14, photos='https://www.drsquatch.com/cdn/shop/files/Frame2896_9e126e25-3812-4288-b412-0f5bcac9711a.png?v=1686237588')



    hai1 = Product(
        category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    hai2 = Product(
        category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    hai3 = Product(
        category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    hai4 = Product(
        category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    hai5 = Product(
        category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    hai6 = Product(
        category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    hai7 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai8 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai9 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai10 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai11 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai12 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai13 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai14 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai15 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai16 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')



    lot1 = Product(
        category='Lotion', name= "Pine Tar Lotion", description="Hydrate with ultra-manly scent of fresh-cut pine.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/Frame6_739d66ef-e486-4021-af8f-44c500db06d2.png?v=1688142913')
    lot2 = Product(
        category='Lotion', name= "Pine Tar Lotion", description="Hydrate with ultra-manly scent of fresh-cut pine.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/Frame6_739d66ef-e486-4021-af8f-44c500db06d2.png?v=1688142913')
    lot3 = Product(
        category='Lotion', name= "Pine Tar Lotion", description="Hydrate with ultra-manly scent of fresh-cut pine.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/Frame6_739d66ef-e486-4021-af8f-44c500db06d2.png?v=1688142913')



    too1 = Product(
        category='Toothpaste', name= "Citrus Mint - Morning", description="Squatch morning breath with citrus mint", price=12, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_Toothpaste_IMG_6082.png?v=1636391929')
    too2 = Product(
        category='Toothpaste', name= "Citrus Mint - Morning", description="Squatch morning breath with citrus mint", price=12, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_Toothpaste_IMG_6082.png?v=1636391929')
    too3 = Product(
        category='Toothpaste', name= "Citrus Mint - Morning", description="Squatch morning breath with citrus mint", price=12, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_Toothpaste_IMG_6082.png?v=1636391929')



    col1 = Product(
        category='Cologne', name= "Fireside Bourbon Cologne", description="Aromas of cedarwood, clove and patchouli.", price=59, photos='https://www.drsquatch.com/cdn/shop/products/Frame2015.png?v=1672765943')
    col2 = Product(
        category='Cologne', name= "Fireside Bourbon Cologne", description="Aromas of cedarwood, clove and patchouli.", price=59, photos='https://www.drsquatch.com/cdn/shop/products/Frame2015.png?v=1672765943')
    col3 = Product(
        category='Cologne', name= "Fireside Bourbon Cologne", description="Aromas of cedarwood, clove and patchouli.", price=59, photos='https://www.drsquatch.com/cdn/shop/products/Frame2015.png?v=1672765943')



    sho1 = Product(
        category='Shower Booster', name= "Shower Caddy", description="Handcrafted Squatch storage to level up your shower game.", price=35, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_ShowerCaddy_IMG_54442.png?v=1634164831')


    can1 = Product(
        category='Candle', name= "Fresh Falls Candle", description="A refreshing, watery blend of birch and pine.", price=30, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_FreshFalls_IMG_5107.png?v=1631224933')


    bea1 = Product(
        category='Beard', name= "Sandalwood Bourbon Beard Oil", description="A tastefully smooth sandalwood scent to quench any beard's thirst.", price=18, photos='https://www.drsquatch.com/cdn/shop/products/BeardOil_Sandlewood_1.png?v=1616629536')


    swa1 = Product(
        category='Swag', name= "Bath Robe", description="Step out of your shower and feel like a king. Fits sizes S-XL.", price=59, photos='https://www.drsquatch.com/cdn/shop/products/IMG_9081-V2.png?v=1640633619')
    swa2 = Product(
        category='Swag', name= "Corduroy Hat", description="Kickback, snapback and relax.", price=24, photos='https://www.drsquatch.com/cdn/shop/products/hat_1_TAN.png?v=1628787440')


    db.session.add_all([deo1, deo2, deo3, deo4, deo5, deo6, deo7, deo8, deo9])
    db.session.add_all([soa1, soa2, soa3, soa4, soa5, soa6, soa7, soa8, soa9, soa10,])
    db.session.add_all([fac1, fac2, fac3])
    db.session.add_all([hai1, hai2, hai3, hai4, hai5, hai6, hai7, hai8, hai9, hai10, hai11, hai12, hai13, hai14, hai15, hai16 ])
    db.session.add_all([lot1, lot2, lot3])
    db.session.add_all([too1, too2, too3])
    db.session.add_all([col1, col2, col3])
    db.session.add_all([sho1,])
    db.session.add_all([can1,])
    db.session.add_all([bea1,])
    db.session.add_all([swa1, swa2])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
