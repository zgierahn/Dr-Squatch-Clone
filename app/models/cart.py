from .db import db, environment, SCHEMA, add_prefix_for_prod


class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)


    user = db.relationship(
            "User",
            back_populates="carts"
        )

    productId = db.relationship(
        "Product",
        cascade="all, delete-orphan",
        back_populates="carts"
    )

    def to_dict(self):
        return {
            'id': self.id,
            "quantity" : self.quantity,
            "userId" : self.userId,
            "productId" : self.productId
        }
