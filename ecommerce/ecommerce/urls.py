from django.urls import path, include, re_path
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Redirecionadores para trailing slash
    path('admin', RedirectView.as_view(url='/admin/', permanent=True)),

    path('admin/', include('admin.urls')),

    path('api/', include('api.urls')),
    path('products/', include('products.urls')),
    path('members/', include('members.urls')),
    path('members/', include('django.contrib.auth.urls')),

    path('', include('base.urls')),

    # Catch-all FINAL
    re_path(r'^(?!admin/|static/|media/).*$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)