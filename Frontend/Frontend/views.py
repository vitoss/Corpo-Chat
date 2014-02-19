from django.shortcuts import render
from django.utils import simplejson
from django.http import HttpResponse
import urllib2
import json

def homepage(request):
	return render(request,'homepage.html')

def userIsLogged(request):
	result = []	
	if ('isLogged' in request.session):
		result.append({"isLogged":request.session['isLogged'], "username":request.session['username']})
		return HttpResponse(simplejson.dumps(result), mimetype='application/json')
	else:
		result.append({"isLogged":False})
		return HttpResponse(simplejson.dumps(result), mimetype='application/json')

def login(request):
	result = []
	
	if ('username' in request.GET and request.GET['username']):
        	username = request.GET['username']
	else:
		username = ""

	if ('isLogged' in request.session):
		result.append({"isLogged":request.session['isLogged'], "username":request.session['username']})
		return HttpResponse(simplejson.dumps(result), mimetype='application/json')
	else:
		request.session['isLogged'] = True
		request.session['username'] = username
		return HttpResponse("You have logged in successfully")

def logout(request):
	request.session.flush()
	return HttpResponse("CU next time")

