from django.shortcuts import render
import urllib2
import json

def homepage(request):
	rooms = json.load(urllib2.urlopen("http://web2.mydevil.net:9615/rooms"))
		
	return render(request,'homepage.html', {'rooms' : rooms})
