from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
# Create your models here.

class UserAccountsManager(BaseUserManager):
    def create_user(self,name,email,password=None):
        if not email:
            raise ValueError("User Must have an Email")
        email = self.normalize_email(email)
        user = self.model(email=email,name=name)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,name,email,password):
        user = self.create_user(name,email,password)
        user.is_superuser=True
        user.is_staff = True
        user.save()
        return user
        

class Account(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(max_length=250,unique=True)
    name = models.CharField(max_length=250)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserAccountsManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return f"{self.email} "
    
