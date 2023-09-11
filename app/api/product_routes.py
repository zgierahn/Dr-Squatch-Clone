from flask import Blueprint
from app.models import Product


product_routes = Blueprint('products', __name__)


#Get Products
@product_routes.route('/')
def products():
    products = Product.query.all()
    # print('products', products)
    return [product.to_dict() for product in products]


#Get Product by Id
@product_routes.route('/<int:id>')
def single_product(id):
    product = Product.query.get(id)
    # print('show me the product',  product.to_dict())
    return product.to_dict()
