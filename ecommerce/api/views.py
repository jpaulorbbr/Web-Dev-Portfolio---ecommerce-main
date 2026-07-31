from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from products.models import Product 
from .serializers import ProductSerializer 

@api_view(['GET'])
def list_products(request):
    """
    Endpoint que lista todos os produtos cadastrados para o frontend
    """
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

# Create your views here.
