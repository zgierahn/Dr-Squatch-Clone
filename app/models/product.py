from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer)
    photos = db.Column(db.String(255))


    reviews = db.relationship(
        "Review",
        cascade="all, delete-orphan",
        back_populates="productsId"
    )

    orders = db.relationship(
        "Order",
        cascade="all, delete-orphan",
        back_populates="productsId"
    )


    def to_dict(self):
        return {
            'id': self.id,
            "category" : self.category,
            "name" : self.name,
            "description" : self.description,
            "price" : self.price,
            "photos" : self.photos,
            'reviews': [review.to_dict() for review in self.reviews]
        }
