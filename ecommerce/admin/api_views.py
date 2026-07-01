from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from base.models import CustomUser
from products.models import Product
from .serializers import CustomUserSerializer, ProductAdminSerializer

from django.db.models import Q

from rest_framework.views import APIView

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def admin_users_list(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_products_list(request):
    products = Product.objects.all()
    serializer = ProductAdminSerializer(products, many=True)
    return Response(serializer.data)

class StaffUsersAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.is_superuser:
            return Response(
                {
                    "detail": "Acesso negado."
                },
                status=403
            )

        users = CustomUser.objects.filter(
            Q(admin_staff=True) |
            Q(is_superuser=True)
        ).distinct()

        serializer = CustomUserSerializer(
            users,
            many=True
        )

        return Response(serializer.data)