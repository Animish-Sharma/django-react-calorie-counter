from django.db import models
from django.template.defaultfilters import slugify
from django.conf import settings
import random
# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=300)
    image = models.FileField(upload_to="photos/%Y/%m/%d",default=None)
    value = models.IntegerField()
    calories = models.IntegerField()
    protein = models.FloatField()
    carbohydrates = models.FloatField()
    fats = models.FloatField()
    vitamin_a = models.FloatField(null=True,blank=True)
    vitamin_b = models.FloatField(null=True,blank=True)
    vitamin_c = models.FloatField(null=True,blank=True)
    vitamin_d = models.FloatField(null=True,blank=True)
    fiber = models.FloatField()
    fat = models.FloatField()
    sodium = models.IntegerField()
    cholestrol = models.IntegerField()
    slug = models.SlugField(default=False)

    def __str__(self):
        return f"{self.name} --{self.value}"

    def save(self,*args,**kwargs):
        slug_s = slugify(self.name)
        queryset = Item.objects.filter(slug__iexact = slug_s).count()
        count = 1
        slug = slug_s

        while(queryset):
            query = Item.objects.get(slug__iexact = slug)
            if(query.id == self.id):
                break
            slug = slug_s+"-"+str(count)+"-"+str(random.randint(0,35))
            count += 1
            queryset = Item.objects.filter(slug__iexact = slug).count()
        self.slug = slug
        super(Item,self).save(*args,**kwargs)

class ItemCount(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    item = models.ForeignKey(Item,on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.user.name} {self.item.name}"

    def get_all_calories(self):
        return self.quantity * self.item.calories


class TotalCount(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    items = models.ManyToManyField(ItemCount)

    def get_total(self):
        total = 0
        for order_items in self.items.all():
            total += order_items.get_all_calories()
        return total

    def __str__(self):
        return f"{self.user.email}"