from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date)
    edited_at = db.Column(db.Date)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)


    user = db.relationship(
        "User",
        back_populates="reviews"
    )


    productId = db.relationship(
        "Product",
        back_populates="reviews"
    )

    def to_dict(self):
        return {
            'id': self.id,
            "title" : self.title,
            "body" : self.body,
            "rating" : self.rating,
            "createdAt" : self.created_at,
            "editedAt" : self.edited_at,
            "userId" : self.userId,
            "productId" : self.productId,
            "user" : [person.to_dict() for person in self.user]
        }
