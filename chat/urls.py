# urls.py inside chat app

from django.conf.urls import url
from . import views

urlpatterns = [
               url(r'^(?P<label>[\w-]{,50})/$', views.chat_room, name='chat_room'),
               ]
