from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    template = models.CharField(max_length=500, unique=True, null=True)
    #slug = models.SlugField(unique=True, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Categories" #Correct pluralization in admin

    def __str__(self):
        return self.name
    
    """
    def get_aboslute_url(self):
        from django.urls import reverse
        return reverse('category_detail', kwargs={'slug': self.slug})
    """

class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to='products/') # 'products/' is a subdirectory within MEDIA_ROOT
