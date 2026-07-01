from base.models import CustomUser
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required, user_passes_test
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import redirect, render, get_object_or_404, get_list_or_404
from products.models import Product
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.http import Http404, HttpResponse

from .forms import ProductFormAdmin, RegisterUserFormAdmin, UserEditInfoForm


# Create your views here.
def admin_login(request):
    if request.user.is_authenticated:
        redirect('admin_already_authenticated')

    if request.method == "POST" and not request.user.is_authenticated:
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # request.session['admin_staff'] = False
            if request.user.is_superuser or request.user.admin_staff:
                return redirect("admin_home")
            else:
                messages.success(
                    request,
                    (
                        "Successful login! However, you don't have access to the admin area"
                    ),
                )
                return redirect("admin_no_access_area")
        else:
            messages.success(
                request, ("There was an error loggin in, please try again.")
            )
            return redirect("admin_login")
    elif request.method == "POST" and request.user.is_authenticated:
        return redirect("admin_already_authenticated")
    else:
        return render(request, "custom-admin/auth/login.html", context={})


def admin_logout(request):
    if not request.user.is_authenticated:
        redirect(admin_no_access)
    
    logout(request)
    messages.success(request, ("You were logged out!"))
    return redirect("admin_home")


def admin_register(request):
    """
    request.session['is_superuser'] = False
    is_superuser = request.session.get('is_superuser')
    """
    if not request.user.is_superuser:
        return redirect("admin_no_access")

    if request.method == "POST" and request.user.is_superuser:
        #print(request.POST, request.FILES)
        form = RegisterUserFormAdmin(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            username = form.cleaned_data["username"]
            password = form.cleaned_data["password1"]
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(
                request,
                (
                    "Registration Successful! Wait until one of the admins confirm you as part of the staff"
                ),
            )
            return redirect("admin_login")
    else:
        form = RegisterUserFormAdmin()
    return render(
        request,
        "custom-admin/auth/admin_register.html",
        context={
            "form": form,
        },
    )


def admin_users(request):
    if not request.user.is_superuser:
        return redirect("admin_login")
    
    users_list = CustomUser.objects.all()
    items_per_page = 9
    paginator = Paginator(users_list, items_per_page)
    page_number = request.GET.get('page')

    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)

    return render(
        request,
        "custom-admin/admin_index.html",
        context={
            "users_list": users_list,
            "page_obj": page_obj,
            "panel_title": "Gerenciar Usuários",
        },
        status=200,
    )


def admin_user_detail(request, slug):
    if not request.user.is_superuser and not request.user.admin_staff:
        return redirect("admin_login")
    elif request.user.admin_staff:
        return redirect('admin_user_detail_staff')
    
    user_detail = get_object_or_404(
        CustomUser,
        username=slug
    )
    
    return render(
        request,
        "custom-admin/profile/admin_user_detail.html",
        context={
            "user_detail": user_detail,
        },
        status=200,
    )

def admin_users_staff(request):
    #staff_users_2 = CustomUser.objects.filter(admin_staff=True)
    #staff_users_list = get_list_or_404(staff_users_2)

    staff_users = CustomUser.objects.filter(admin_staff=True)
    items_per_page = 9
    paginator = Paginator(staff_users, items_per_page)
    page_number = request.GET.get('page')

    try:
        page_obj = paginator.page(page_number)
    except PageNotAnInteger:
        page_obj = paginator.page(1)
    except EmptyPage:
        page_obj = paginator.page(paginator.num_pages)

    #print(staff_users_list[0].profile_picture.url)

    if not request.user.is_authenticated:
        return redirect('admin_login')

    if not request.user.is_superuser:
        return redirect('admin_no_access')

    context = {
        #"staff_users_list": staff_users_list,
        "page_obj": page_obj,
        "panel_title": "Gerenciar Staff",
    }
    
    return render(request, "custom-admin/admin_index.html", context)

def admin_user_detail_staff(request, slug):
    user_detail_staff = CustomUser.objects.filter(username=slug)
    user_request = request.user
    item = get_object_or_404(CustomUser, username=slug)
    if item.admin_staff:
        status = 200
    else:
        status = 404
        raise Http404("Not found.")

    form_new_user = None

    if request.method == 'POST':
        form = UserEditInfoForm(request.POST, request.FILES, instance=item, request=request)
        if form.is_valid():
            form.save()
            form_new_user = form.cleaned_data["username"]
            return redirect('admin_user_detail_staff', slug=item.username)
    else:
        form_new_user = item.username
        form = UserEditInfoForm(instance=item, request=request) 

    context = {
        "user_detail_staff": user_detail_staff,
        "user_request": user_request,
        "form": form,
        "form_new_user": form_new_user,
        "item": item,
    }
    
    return render(request, "custom-admin/profile/staff/admin_user_detail_staff.html", context=context, status=status)

"""

def admin_user_detail_staff_edit(request, pk):
    item = get_object_or_404(UserEditInfoForm, pk=pk)
    if request.method == 'POST':
        form = UserEditInfoForm(request.POST, request.FILES, instance=item)
        if form.is_valid():
            form.save()
            return redirect('admin_user_detail_staff')

"""

def admin_no_access(request):
    user = request.user
    context = {
        "user": user,
    }
    return render(request, "custom-admin/auth/no_access.html", context, status=200)


def admin_already_authenticated(request):
    requested_user = request.user

    admin_staff_two = None
    is_anon = None

    if not request.user.is_authenticated:
        request.session["admin_staff_two"] = False
        admin_staff = request.session.get("admin_staff_two")

    if request.user.is_authenticated:
        is_anon = False
    elif admin_staff == False:
        is_anon = True

    context = {
        "requested_user": requested_user,
        "is_anon": is_anon,
    }

    return render(
        request, "custom-admin/auth/already_authenticated.html", context, status=200
    )


def admin_no_access_area(request):
    requested_user = request.user
    return render(
        request,
        "custom-admin/auth/admin_no_access_area.html",
        context={"requested_user": requested_user},
    )


# @login_required
#@user_passes_test(lambda u: u.is_staff)
def admin(request):
    admin_staff_status = None

    if not request.user.is_authenticated:
        request.session["admin_staff"] = False
        admin_staff_status = request.session.get("admin_staff")

    if (
        admin_staff_status == None
        and not request.user.admin_staff
        and not request.user.is_superuser
    ):
        let_him_pass = False
    elif admin_staff_status == False:
        let_him_pass = False
    elif request.user.admin_staff or request.user.is_superuser:
        let_him_pass = True
    else:
        return HttpResponse("Forbidden", status=403)

    # Comente ou remova temporariamente esta parte para teste:
    # if not let_him_pass:
    #     messages.success(request, ("You are not of the admin team."))
    #     return redirect("admin_no_access")
    
    context = {
        "panel_title": "Store Control Center",
    }

    return render(request, "custom-admin/admin_index.html", context)

"""
def admin(request):
    return HttpResponse("<h1>TESTE - ADMIN VIEW ESTÁ SENDO EXECUTADA</h1>")
"""
    
def admin_profile(request):
    admin_staff_status = None

    if not request.user.is_authenticated:
        request.session["admin_staff"] = False
        admin_staff_status = request.session.get("admin_staff")

    if (
        admin_staff_status == None
        and not request.user.admin_staff
        and not request.user.is_superuser
    ):
        let_him_pass = False
    elif admin_staff_status == False:
        let_him_pass = False
    elif request.user.admin_staff or request.user.is_superuser:
        let_him_pass = True
    else:
        return HttpResponse("Forbidden", status=403)

    if not let_him_pass:
        messages.success(request, ("You are not of the admin team."))
        return redirect("admin_no_access")
    
    user_logged_in = request.user
    user_selected = CustomUser.objects.filter(username=user_logged_in)
    
    return render(
        request,
        "custom-admin/profile/admin_profile.html",
        context={"user_selected": user_selected},
        status=200,
    )


def admin_categories_of_products_view(request):
    # return HttpResponse("<h1>Hello World</h1>")
    return render(
        request, "custom-admin/categories-of-products.html", context={}, status=200
    )


def admin_products(request):
    products_list = Product.objects.all()
    return render(
        request,
        "custom-admin/products/admin-products.html",
        context={"products_list": products_list},
        status=200,
    )

def admin_users_react(request):
    context = {
        "panel_title": "Gerenciar Usuários",
    }
    return render(request, "custom-admin/admin_index.html", context)

def admin_products_react(request):
    context = {
        "panel_title": "Gerenciar Produtos",
    }
    return render(request, "custom-admin/admin_index.html", context)
