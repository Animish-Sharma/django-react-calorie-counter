from django.urls import path
from .views import (ListItem,
DetailItem,
AddToCount,
CountDetailView,
CountDecreaseView,
TotalCountDeleteView,
DetailListView
)
urlpatterns=[
    path("items/",ListItem.as_view()),
    path("items/<slug>/",DetailItem.as_view()),
    path("add-to-list/",AddToCount.as_view()),
    path("list-summary/",CountDetailView.as_view()),
    path("items-list/delete/<pk>",TotalCountDeleteView.as_view()),
    path("count-decrease/update/",CountDecreaseView.as_view()),
    path("test/",DetailListView.as_view())
]