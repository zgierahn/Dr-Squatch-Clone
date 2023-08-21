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
        category='Bar Soap', name= "Alpine Sage", description="New name! Same refreshing mix of cypress, lavender, and sage.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/AlpinsSage_1.png?v=1616617440')
    soa7 = Product(
        category='Bar Soap', name= "Wood barrel Bourbon", description="An old fashioned blend of spice, bourbon, and oak.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/WoodBarrelBourbon_1.png?v=1616616812')
    soa8 = Product(
        category='Bar Soap', name= "Deep Sea Goats Milk", description="Rejuvenate and moisturize your skin with the nectar of the goats.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/DeepSeaGoatsMilk_1.png?v=1616617993')
    soa9 = Product(
        category='Bar Soap', name= "Cold Brew Cleanse", description="A robust and caffeine infused soap bar for a cause.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/ColdBrew_1.png?v=1616617758')
    soa10 = Product(
        category='Bar Soap', name= "Birchwood Breeze", description="Fresh and woody with a crisp finish.", price=8, photos='https://www.drsquatch.com/cdn/shop/products/Front.png?v=1619122823')



    fac1 = Product(
        category='Face Care', name= "Fresh Falls Face Wash", description="Cleanse and exfoliate with energizing scents of water, birch, and pine.", price=14, photos='https://www.drsquatch.com/cdn/shop/files/Frame2896_9e126e25-3812-4288-b412-0f5bcac9711a.png?v=1686237588')
    fac2 = Product(
        category='Face Care', name= "Cool Fresh Aloe Face Wash", description="Cleanse and refresh with the energizing scent of aloe.", price=14, photos='https://www.drsquatch.com/cdn/shop/files/Frame2878_c6f8fd65-55af-40ca-8dcb-336a725c2aea.png?v=1686237357')
    fac3 = Product(
        category='Face Care', name= "Pine Tar Face Wash", description="Cleanse and exfoliate with the rugged scent of fresh-cut pine.", price=14, photos='https://www.drsquatch.com/cdn/shop/files/Frame2881_30d832b9-4d8d-4dc1-b4a8-af695320d1b9.png?v=1686237771')



    hai1 = Product(
        category='Hair Care', name= "Coconut Castaway Shampoo", description="A tranquil and exotic scent of toasted coconut.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-7.png?v=1683091341')
    hai2 = Product(
        category='Hair Care', name= "Cool Fresh Aloe Shampoo", description="Cleanse your cut with the cool, refreshing scent of aloe.", price=16, photos='https://www.drsquatch.com/cdn/shop/products/DrSquatch_coolfreshaloe_haircare_1200PNG_0001_1.png?v=1667948186')
    hai3 = Product(
        category='Hair Care', name= "Cypress Coast Shampoo", description="Fresh like an ocean breeze", price=16, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q3_DrSquatch_ProductPhotos_HairCareBottles_IMG_3228.png?v=1635192909')
    hai4 = Product(
        category='Hair Care', name= "Fresh Falls Shampoo", description="Cleanse your hair with this refreshing scent", price=16, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q3_DrSquatch_ProductPhotos_HairCareBottles_IMG_3198.png?v=1635193271')
    hai5 = Product(
        category='Hair Care', name= "Pine Tar Shampoo", description="Suds your strands and soothe your scalp with this rugged, manly scent.", price=16, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q3_DrSquatch_ProductPhotos_HairCareBottles_IMG_3178.png?v=1634066961')
    hai6 = Product(
        category='Hair Care', name= "Summer Citrus Shampoo", description="Suds your strands with a bright, refreshing scent.", price=16, photos='https://www.drsquatch.com/cdn/shop/products/Frame9.png?v=1662072973')
    hai7 = Product(
        category='Hair Care', name= "Coconut Castaway Conditioner", description="A tranquil and exotic scent of toasted coconut.", price=17, photos='https://www.drsquatch.com/cdn/shop/files/coconutcastaway-2.png?v=1683091355')
    hai8 = Product(
        category='Hair Care', name= "Cool Citrus Conditioner", description="A cool and crisp burst of hydration", price=17, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q3_DrSquatch_ProductPhotos_HairCareBottles_IMG_3208_f046f223-744c-482c-98c4-7c0350dd2f03.png?v=1633996175')
    hai9 = Product(
        category='Hair Care', name= "Cool Fresh Aloe Conditioner", description="Moisturize and revitalize with Mother Natures finest plus the refreshing scent of aloe.", price=17, photos='https://www.drsquatch.com/cdn/shop/products/DrSquatch_coolfreshaloe_haircare_1200PNG_0004.png?v=1648140674')
    hai10 = Product(
        category='Hair Care', name= "Fresh Falls Conditioner", description="Revitalize your locks with scents of water and wood", price=17, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q3_DrSquatch_ProductPhotos_HairCareBottles_IMG_3190_93eccf54-3ee9-4283-aac6-d3ac3c2063ea.png?v=1633997453')
    hai11 = Product(
        category='Hair Care', name= "Pine Tar Conditioner", description="Moisturize your mane with the rugged scent of an old growth forest.", price=17, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q3_DrSquatch_ProductPhotos_HairCareBottles_IMG_3164.png?v=1634066915')
    hai12 = Product(
        category='Hair Care', name= "Summer Citrus Conditioner", description="Rejuvenate those locks with this freshly-squeezed scent.", price=17, photos='https://www.drsquatch.com/cdn/shop/products/Frame12.png?v=1662072959')
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
        category='Lotion', name= "Fresh Falls Lotion", description="Revitalize your skin with a fresh, cooling scent.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/Frame5_f5d0d1f5-c916-4589-8467-0acce13cf0c6.png?v=1688142548')
    lot3 = Product(
        category='Lotion', name= "Cool Fresh Aloe Lotion", description="Soothe and cool your skin with a fresh aloe scent.", price=16, photos='https://www.drsquatch.com/cdn/shop/files/Frame4_dd9c2dba-0865-48d6-9a7e-14cae3b62b45.png?v=1688142512')



    too1 = Product(
        category='Toothpaste', name= "Citrus Mint - Morning", description="Squatch morning breath with citrus mint", price=12, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_Toothpaste_IMG_6082.png?v=1636391929')
    too2 = Product(
        category='Toothpaste', name= "Soothing Spearmint - Night", description="Unwind with stain-fighting spearmint", price=12, photos='https://www.drsquatch.com/cdn/shop/products/2021_Q2_DrSquatch_ProductPhotos_Toothpaste_IMG_6085.png?v=1636391995')
    too3 = Product(
        category='Toothpaste', name= "Toothpast Kit", description="Morning + night! Give your mouth what it needs, when it needs it.", price=22, photos='https://www.drsquatch.com/cdn/shop/products/toothpaste_kit_1.png?v=1636406989')



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
