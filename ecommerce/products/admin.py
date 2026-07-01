from django.contrib import admin
from .models import Product, Category
from .forms import CategoryForm
# Register your models here.

"""
class CategoryForm(admin.ModelAdmin):
    form = CategoryForm
"""

"""
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    change_form_template = "admin/my_custom_change_form.html"
"""
"""
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',) #Customize what fields are shown in the list view
    search_fields = ('name',) #Enable searching by name
"""

class MyModelAdmin(admin.ModelAdmin):
    form = CategoryForm # Assign your custom form here
    list_display = ('name',) # Customize as needed

admin.site.register(Product)
admin.site.register(Category, MyModelAdmin)
#admin.site.register(Category, CategoryForm)
#admin.site.register(Category)
