from django.urls import path, re_path
from products import views 

urlpatterns = [
    path('', views.store, name='products_store'), 
    #That in the line below is a derivative URL because things will appear this way: "store/appear_here"
    #path('test_derivative_url/', views.test_derivative_url, name='test_derivative_url'),
    path('categories/<slug:category_slug>/', views.dynamic_category_view, name='dynamic_category'),
    #path('<slug:slug>/', views.category_detail, name='category_detail'),
    path('my-custom-form/', views.custom_model_form_view, name='custom_model_form')
]