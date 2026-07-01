from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('index2/', views.comment_test, name='comment_test'),
    #path('index/', views.exemplo_index, name='index'),
    #path('parametros/fixo/', views.exemplo_parametro_fixo, name='exemplo_parametro_fixo'),
    #path('parametros/<str:usuario>/', views.exemplo_parametro, name='exemplo_parametro'),
    #path('redirecionar/', views.redirecionar, name='redirecionar'),
    #deixe sempre a URL específica em cima e a genérica embaixo.
    #path('parametros/<int:usuario>/', views.exemplo_parametro, name='exemplo_parametro'),
    #re_path(r"^parametros/(?P<usuario>[a-z]{4})/$", views.exemplo_parametro, name='exemplo_parametro'),
    #Reverse for 'exemplo_parametro' with no arguments not found. 1 pattern(s) tried: ['parametros/(?P<usuario>[^/]+)/\\Z']
]