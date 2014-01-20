from django.shortcuts import render
import urllib2
import json

def homepage(request):
	return render(request,'homepage.html')
