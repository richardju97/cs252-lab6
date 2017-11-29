# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse

from django.template import loader

# Create your views here.
def hello(request):
#    text = """<h1>This is our Web App Project (Lab 6) for CS 252 at Purdue University. Enjoy :)</hi>"""
#    return HttpResponse(text)
    template = loader.get_template('useraccounts/index.html')
    context = {
        'hello': "hello there ^_^, please login",
    }
    return HttpResponse(template.render(context, request))

