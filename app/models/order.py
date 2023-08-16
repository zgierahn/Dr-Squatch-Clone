from .db import db, environment, SCHEMA, add_prefix_for_prod


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    created_at = db.Column(db.Date)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)


    user = db.relationship(
            "User",
            back_populates="orders"
        )

    productsId = db.relationship(
        "Product",
        back_populates="orders"
    )

    def to_dict(self):
        return {
            'id': self.id,
            "quantity" : self.quantity,
            "createdAt" : self.created_at,
            "userId" : self.user_id,
            "productId" : self.product_id
        }
