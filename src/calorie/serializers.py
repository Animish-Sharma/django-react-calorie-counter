from django.db import models
from django.db.models import fields
from rest_framework import serializers
from .models import Item, ItemCount,TotalCount



class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            "id",
            "name",
            "image",
            'value',
            'calories',
            'protein',
            'carbohydrates',
            'fats',
            'vitamin_a',
            'vitamin_b',
            'vitamin_c',
            'vitamin_d',
            'fiber',
            'fat',
            'sodium',
            'cholestrol',
            "slug"
        ]
        lookup_field = "slug"

class ItemCountSerializer(serializers.ModelSerializer):
    all_calories = serializers.SerializerMethodField()
    item = serializers.SerializerMethodField()
    lookup_field = "slug"
    class Meta:
        model = ItemCount
        fields = [
            "id",
            "item",
            "all_calories",
            "quantity"
        ]
    def get_all_calories(self,obj):
        return obj.get_all_calories()

    def get_item(self,obj):
        return ItemSerializer(obj.item).data

class TotalCountSerializer(serializers.ModelSerializer):
    total = serializers.SerializerMethodField()
    list_items = serializers.SerializerMethodField()
    class Meta:
        model = TotalCount
        fields = [
            "id",
            "items",
            "total",
            "list_items"
        ]
    def get_total(self,obj):
        return obj.get_total()
    def get_list_items(self,obj):
        return ItemCountSerializer(obj.items.all(),many=True).data