from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(25), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer)
    photos = db.Column(db.Text)


    reviews = db.relationship(
        "Review",
        cascade="all, delete-orphan",
        back_populates="productId"
    )

    carts = db.relationship(
        "Cart",
        cascade="all, delete-orphan",
        back_populates="productId"
    )


    def to_dict(self):
        return {
            'id': self.id,
            "category" : self.category,
            "name" : self.name,
            "price" : self.price,
            "photos" : self.photos
        }
