# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from django.template import loader

# Create your views here.
def index(request):
#    text = """<h1>This is our Web App Project (Lab 6) for CS 252 at Purdue University. Enjoy :)</hi>"""
#    return HttpResponse(text)
    template = loader.get_template('useraccounts/index.html')
    context = {
        'hello': "hello there ^_^, please select your option",
    }
    return HttpResponse(template.render(context, request))

def create(request):
    template = loader.get_template('useraccounts/create.html')
    context = {
        'hello': "hello there ^_^, please create your account",
    }
    return HttpResponse(template.render(context, request))

def login(request):
    template = loader.get_template('useraccounts/login.html')
    context = {
        'hello': "hello there ^_^, please login",
    }
    return HttpResponse(template.render(context, request))

