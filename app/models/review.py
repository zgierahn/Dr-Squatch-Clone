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
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)


    user = db.relationship(
        "User",
        back_populates="reviews"
    )


    productsId = db.relationship(
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
            "productId" : self.product_id,
            "user" : self.user.to_dict()
        }



'''
##! Relationships
    user = db.relationship('User', back_populates='comments')
    posts = db.relationship('Post', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'first_name':self.user.first_name,
            'last_name':self.user.last_name,
            'profile_image':self.user.profile_image,
            # 'user': self.user.to_dict(),
            'created_at': self.created_at,
            'updated_at': self.updated_at
    }
'''
