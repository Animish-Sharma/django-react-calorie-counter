from django.contrib import admin
from .models import Account
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    model = Account

admin.site.register(Account,UserAdmin)