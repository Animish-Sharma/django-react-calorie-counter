from django.http.response import Http404
from rest_framework.generics import (ListAPIView,
RetrieveAPIView,
UpdateAPIView,
DestroyAPIView)
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from .models import Item,ItemCount,TotalCount
from .serializers import ItemSerializer,ItemCountSerializer,TotalCountSerializer
# Create your views here.

class ListItem(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    lookup_field = "slug"


class DetailItem(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()
    lookup_field = "slug"


class AddToCount(APIView):
    def post(self,request,format=None):
        if request.method == 'POST':
            slug = self.request.data['slug']
            if slug is None:
                return Response({"error":"An Error Occured"})
            item = get_object_or_404(Item,slug = slug)

            item_count_qs = ItemCount.objects.filter(item=item,user = request.user)

            if item_count_qs.exists():
                item_count = item_count_qs.first()
                item_count.quantity += 1 
                item_count.save()

            else:
                item_count = ItemCount.objects.create(item=item,user=request.user)
                item_count.save()

            total_qs = TotalCount.objects.filter(user = request.user)
            if total_qs.exists():
                total = total_qs[0]
                if not total.items.filter(item__id = item_count.id).exists():
                    total.items.add(item_count)


            else:
                order = TotalCount.objects.create(user=request.user)
                order.items.add(item_count)
                order.save()
            return Response({"success":"Item Added to list"},status=status.HTTP_200_OK)

class CountDetailView(RetrieveAPIView):
    serializer_class = TotalCountSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_object (self):
        try:
            count = TotalCount.objects.get(user = self.request.user)
            return count
        except:
            return None

class CountDecreaseView(APIView):
    def post(self,request,format=None):
        slug = self.request.data['slug']
        if slug is None:
            return Response({"error":"Invalid Data"})
        
        item = get_object_or_404(Item,slug=slug)
        total_count_qs = TotalCount.objects.filter(user=self.request.user)
        if total_count_qs.exists():
            total_count = total_count_qs[0]
            if total_count.items.filter(item__slug=item.slug).exists():
                count = ItemCount.objects.filter(item=item,user=self.request.user)[0]
                if count.quantity > 1 :
                    count.quantity -= 1
                    count.save()
                    return Response({"success":"Item's quantity Decreased"})
                else:
                    total_count.items.remove(count)
                    count.delete()
                    if total_count.items.length == 0:
                        total_count.delete()
                    return Response({"success":"Item Removed Successfully"})
            else:
                return Response({"error":"This Item was not in yout list"})
        else:
            return Response({"error":"You do not have an active list"})

class TotalCountDeleteView(DestroyAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = ItemCount.objects.all()


class DetailListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request,format=None):
        list_items = [total for total in TotalCount.objects.filter(user=self.request.user)]
        serializer = TotalCountSerializer(list_items,many=True)
        return Response(serializer.data)