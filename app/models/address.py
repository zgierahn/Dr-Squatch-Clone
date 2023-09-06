from .db import db, environment, SCHEMA, add_prefix_for_prod


class Address(db.Model):
    __tablename__ = 'addresses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    address1 = db.Column(db.String(255))
    address2 = db.Column(db.String(255))
    address3 = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    country = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)

    user = db.relationship(
        "User",
        back_populates="address"
    )

    def to_dict(self):
        return {
            'id': self.id,
            "address1" : self.address1,
            "address2" : self.address2,
            "address3" : self.address3,
            "city" : self.city,
            "state" : self.state,
            "country" : self.country,
            "userId" : self.user.id,
        }
