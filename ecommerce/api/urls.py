from django.urls import path 
from django.views.generic.base import RedirectView
from . import views

urlpatterns = [
    path('products/', views.list_products, name='api-products'),
]