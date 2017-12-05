# urls.py inside the useraccounts app

#from django.conf.urls import url
#from django.contrib import admin
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'create', views.create, name='create'),
    url(r'login', views.login, name='login'),
    url(r'$', views.index, name='index'),
]
