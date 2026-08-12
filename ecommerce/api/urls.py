from django.urls import path 
from django.views.generic.base import RedirectView
from . import views

urlpatterns = [
    path('products/', views.product_list_create, name='api-products-list'),
    path('products/<int:pk>/', views.product_detail, name='api-product-detail'),
]