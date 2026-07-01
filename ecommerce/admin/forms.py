from django.contrib.auth.forms import UserCreationForm, UserChangeForm 
from django.contrib.auth.models import User
from base.models import CustomUser
from phonenumber_field.formfields import PhoneNumberField
from django import forms
from products.models import Product 

"""
class AdminStaffWidget(forms.MultiWidget):
    def __init__(self, attrs=None):
        widgets = (
            forms.TextInput(attrs={'class': 'form-control'}),
            forms.Select(choices=[(True, 'Yes'), (False, 'No')]),
        )
        super().__init__(widgets, attrs)
    
    def decompress(self, value):
        if value:
            return value 
        return [None, None]

class AdminStaffField(forms.MultiValueField):
    widget = AdminStaffWidget

    def __init__(self, *args, **kwargs):
        fields = (
            forms.CharField(),
            forms.ChoiceField(choices=[(True, 'Yes'), (False, 'No')], required=True)
        )
        super().__init__(fields=fields,*args, **kwargs)

    def compress(self, data_list):
        if data_list:
            return (data_list[0], data_list[1])
        return (None, None)

    def clean(self, value):
        text_value, choice_value = super().clean(value)
        if text_value and not text_value.strip():
            raise forms.ValidationError("Contact detail cannot be empty if provided.")
        if not text_value and choice_value == 'yes':
            raise forms.ValidationError("You must provide a contact detail if 'Yes' is selected.")
        return (text_value, choice_value)

#field in RegisterUserFormAdmin()
admin_staff = AdminStaffField(label="Is for the staff?", required=True)
#end

"""

class RegisterUserFormAdmin(UserCreationForm):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control'}))
    first_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class': 'form-control'}))
    phone_number = PhoneNumberField(
        required=True,
        label='Phone Number',
        help_text='Enter a phone number (e.g., +1 234-567-8900)',
        widget=forms.TextInput(attrs={'class': 'form-control','placeholder': 'Enter phone number'})
    )
    profile_picture = forms.ImageField(
        label='Profile Picture', 
        required=False, 
        widget=forms.FileInput(attrs={
            'accept': 'image/*',
            'class': 'form-control'
        }) # Restrict to image files
    )   
    admin_staff = forms.BooleanField(
        widget=forms.Select(
            choices=[(False, 'No'), (True, 'Yes')],
            attrs={'class': 'form-control form-select'}
        ),
        required=False,
        initial=False
    )

    class Meta:
        model = CustomUser 
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'date_of_birth', 'profile_picture', 'admin_staff', 'password1', 'password2')

    def __init__(self, *args, **kwargs):    
        super(RegisterUserFormAdmin, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] = 'form-control'
        self.fields['password1'].widget.attrs['class'] = 'form-control'
        self.fields['password2'].widget.attrs['class'] = 'form-control'
        self.fields['date_of_birth'].widget = forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date'
        },
        format='%d/%m/%Y'
        )
        self.fields['date_of_birth'].input_formats = ['%Y-%m-%d', '%d/%m/%Y']

class UserEditInfoForm(forms.ModelForm):
    email = forms.EmailField(widget=forms.EmailInput(attrs={'class': 'form-control'}))
    first_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class': 'form-control'}))
    phone_number = PhoneNumberField(
        required=True,
        label='Phone Number',
        help_text='Enter a phone number (e.g., +1 234-567-8900)',
        widget=forms.TextInput(attrs={'class': 'form-control','placeholder': 'Enter phone number'})
    )
    profile_picture = forms.ImageField(
        label='Profile Picture', 
        required=False, 
        widget=forms.FileInput(attrs={
            'accept': 'image/*',
            'class': 'form-control'
        }) # Restrict to image files
    )   
    admin_staff = forms.BooleanField(
        widget=forms.Select(
            choices=[(False, 'No'), (True, 'Yes')],
            attrs={'class': 'form-control form-select'}
        ),
        required=False,
        initial=False
    )
    password1 = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(
            attrs={'class': 'form-control'}
        ),
        required=False,
        help_text="Leave blank to keep the current password"
    )
    password2 = forms.CharField(
        label="Password confirmation",
        widget=forms.PasswordInput(
            attrs={'class': 'form-control'}
        ),
        required=False,
        help_text="Enter the same password as above, for verification."
    )

    class Meta:
        model = CustomUser 
        fields = ('username', 'first_name', 'last_name', 'email', 'phone_number', 'date_of_birth', 'profile_picture', 'password1', 'password2', 'admin_staff')
        #fields = UserCreationForm.Meta.fields + ('your_extra_field1', 'your_extra_field2',)  # Add any custom fields if needed
        # Optional: exclude = ['some_field']
        widgets = {
            'password1': forms.PasswordInput(
                render_value=True,
                attrs={'class': 'form-control'}
            ),
            'password2': forms.PasswordInput(
                render_value=True,
                attrs={'class': 'form-control'}
            ), # If allowing password changes manually
            'date_of_birth': forms.DateInput(
                format='%Y-%m-%d',
                attrs={'type': 'date', 'class': 'form-control'}
            ),
        }
    
    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match.")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        password1 = self.cleaned_data.get("password1")
        if password1:
            user.set_password(password1)
        if commit:
            user.save()
        return user

    def __init__(self, *args, **kwargs):    
        self.request = kwargs.pop('request', None)
        super(UserEditInfoForm, self).__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] = 'form-control'
        #self.fields['password1'].widget.attrs['class'] = 'form-control'
        #self.fields['password2'].widget.attrs['class'] = 'form-control'
        #self.fields['date_of_birth'].widget = forms.DateInput(attrs={
            #'class': 'form-control',
            #'type': 'date'
        #},
        #format='%d/%m/%Y'
        #)
        self.fields['date_of_birth'].input_formats = ['%Y-%m-%d', '%d/%m/%Y']
        if self.request and self.request.user.is_superuser:
            self.fields['admin_staff'].widget.attrs.update({'class': 'superuser-only'})
        else:
            self.fields['admin_staff'].widget.attrs.update({'disabled': True})

class ProductFormAdmin(forms.ModelForm):
    class Meta:
        model = Product
        fields = ('name', 'category', 'description', 'image')