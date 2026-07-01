from django.urls import path
from . import views, api_views
from .api_views import StaffUsersAPIView

urlpatterns = [
    # Dashboard inicial com React
    path('', views.admin, name='admin_home'),

    # Rotas de staff (mais específicas primeiro)
    path('users/staff/', views.admin_users_staff, name='admin_users_staff'),
    path('users/staff/<str:slug>/', views.admin_user_detail_staff, name='admin_user_detail_staff'),

    #APIs
    path('api/users/', api_views.admin_users_list, name='admin_api_users'),
    path('api/products/', api_views.admin_products_list, name='admin_api_products'),
    path('api/staff-users/', StaffUsersAPIView.as_view(), name='admin_api_staff_users'),

    # Rotas que agora vão usar React (em vez de template Django)
    path('products/', views.admin_products_react, name='admin_products'),

    # Páginas que vão usar templates Django tradicionais
    path('login/', views.admin_login, name='admin_login'),
    path('logout/', views.admin_logout, name='admin_logout'),
    path('register/', views.admin_register, name='admin_register'),
    path('profile/', views.admin_profile, name='admin_profile'),
    
    path('users/', views.admin_users, name='admin_users'),
    path('users/<str:slug>/', views.admin_user_detail, name='admin_user_detail'),
    
    path('categories-of-products/', views.admin_categories_of_products_view, name='categories_of_products'),
    
    # Páginas de acesso
    path('no-access/', views.admin_no_access, name='admin_no_access'),
    path('already-authenticated/', views.admin_already_authenticated, name='admin_already_authenticated'),
    path('no-access-area/', views.admin_no_access_area, name='admin_no_access_area'),
]