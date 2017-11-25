# urls.py inside the useraccounts app

#from django.conf.urls import url
#from django.contrib import admin
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'$', views.hello, name='hello'),
]
