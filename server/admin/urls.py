from django.urls import path
from . import views, consumers

urlpatterns = [
	path('', views.index, name='index'),
]