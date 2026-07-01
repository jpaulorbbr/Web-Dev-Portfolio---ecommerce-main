from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import RegexValidator

# Create your models here.
class CustomUser(AbstractUser):
    phone_number = PhoneNumberField(
        blank=True, 
        null=True, 
        unique=True, 
        verbose_name="Phone Number",
    )
    date_of_birth = models.DateField(blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to='profile_pics/',
        default='profile_pics/default.png', #optional default image 
        blank=True, 
        null=True)
    admin_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.username
