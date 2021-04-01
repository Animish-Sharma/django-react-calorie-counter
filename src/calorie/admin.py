from django.contrib import admin
from .models import Item, ItemCount, TotalCount
# Register your models here.

class ItemAdmin(admin.ModelAdmin):
    list_display = ['name','slug','calories','protein']
    search_fields = ['name','slug','calories','protein']
    list_display_links= ['name','slug','calories','protein']
    exclude = ['slug']
admin.site.register(Item,ItemAdmin)
admin.site.register(ItemCount)
admin.site.register(TotalCount)