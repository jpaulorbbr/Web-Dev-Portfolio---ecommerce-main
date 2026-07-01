from django.shortcuts import render, redirect, get_object_or_404
from .forms import CategoryForm
from .models import Product, Category

# Create your views here.
def store(request):
    return render(request, "store/store.html", context={}, status=200)

def dynamic_category_view(request, category_slug):
    status_code = 200
    is_it_there_objects = False
    
    """
    category_slug_formatting = category_slug
    for i in range(len(category_slug_formatting)):
        if category_slug_formatting[i] == "_":
            category_slug_formatting[i] = " "
        global category_slug_formatting_final
        category_slug_formatting_final += category_slug_formatting[i]   
    """

    objects = Product.objects.filter(category__name__iexact=category_slug)
    list_of_dicts = objects.values('category_id')
    
    for item_dict in list_of_dicts:
        value_of_category_id = item_dict['category_id']
        
        for key, value in item_dict.items():
            if value == value_of_category_id:
                global objects_category_id
                objects_category_id = value
    
    objects_category = Category.objects.filter(id=objects_category_id)
    list_of_dicts_category = objects_category.values('name')
    
    for item_dict_category in list_of_dicts_category:
        value_of_name = item_dict_category['name']

        for key, value in item_dict_category.items():
            if value == value_of_name: 
                global objects_category_model_name
                objects_category_model_name = value
    
    if category_slug == objects_category_model_name.lower():
        is_it_there_objects = True
    else: 
        status_code = 404
    
    if is_it_there_objects:
        template_name = "store/category/" + category_slug.lower() + ".html"
    else:
        status_code = 404
    context = {'objects': objects, 'category': category_slug}
    return render(request, template_name, context, status=status_code)

"""
def dynamic_category_view(request, category_slug):
    status_code = 200
    is_it_there_objects = False
    objects = Product.objects.filter(category__name__iexact=category_slug)
    list_of_dicts = objects.values('id', 'name', 'category_id', 'description', 'image')
    #print(list_of_dicts)
    for item_dict in list_of_dicts:
        value_of_id = item_dict['id']
        value_of_name = item_dict['name']
        value_of_category_id = item_dict['category_id']
        value_of_description = item_dict['description']
        value_of_image = item_dict['image']

        for key, value in item_dict.items():
            if value == value_of_category_id:
                global objects_category_id
                objects_category_id = value
    print(objects_category_id)
    objects_category = Category.objects.filter(id=objects_category_id)
    list_of_dicts_category = objects_category.values('name')
    print(list_of_dicts_category)
    for item_dict_category in list_of_dicts_category:
        value_of_name = item_dict_category['name']

        for key, value in item_dict_category.items():
            if value == value_of_name: 
                global objects_category_model_name
                objects_category_model_name = value
    if category_slug == objects_category_model_name.lower():
        is_it_there_objects = True
    else: 
        status_code = 404
    if is_it_there_objects:
        template_name = "store/category/" + category_slug.lower() + ".html"
    else:
        status_code = 404
    context = {'objects': objects, 'category': category_slug}
    return render(request, template_name, context, status=status_code)
"""

"""
def category_list(request):
    categories = Cateogry.objects.all()
    return render(request, 'store/category_list.html', {'categories': categories})

def category_detail(request, slug):
    category = get_object_or_404(Category, slug=slug)
    return render(request, 'store/category_detail.html', {'category': category})
"""
"""
def create_category_and_template(request):
    object = Category.objects.filter()
    with open(f'/templates/store/{template_name}', 'w') as f:
        f.write('Test')
"""

def custom_model_form_view(request):
    if request.method == "POST":
        form = CategoryForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('success_page') #Redirect after successful submission
    else:
        form = CategoryForm()
    return render(request, 'products/custom_form_template.html', {'form': form})
"""
def test_derivative_url(request):
    return render(request, "store/test_derivative_url.html", context={}, status=200)
"""