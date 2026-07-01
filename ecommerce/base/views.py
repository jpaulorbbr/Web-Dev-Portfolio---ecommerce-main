from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls.base import reverse

# Create your views here.

def home(request):
    #return HttpResponse("<h1>Hello World</h1>")
    return render(request, 'index.html')

"""
def exemplo_index(request):
    return render(request, "pages/index.html", context={})

def exemplo_parametro(request, usuario):
    context = {"usuario": usuario}
    return render(request, "pages/parametros.html", context=context)

def exemplo_parametro_fixo(request):
    context = {"usuario": "Usuário de valor fixo"}
    return render(request, "pages/parametros.html", context=context)

def redirecionar(request):
    #return redirect(reverse("exemplo_parametro", args=['mateus']))
    return redirect(reverse("exemplo_parametro", kwargs={'usuario':'mateus'}))
"""

def comment_test(request):
    return render(request, "pages/index.html", context={})
