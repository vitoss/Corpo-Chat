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
		result.append({"isLogged":request.session['isLogged'], "username":request.session['username'], "email":request.session['email'], "avatar":request.session['avatar']})
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

	if ('email' in request.GET and request.GET['email']):
        	email = request.GET['email']
	else:
		email = ""

	if ('avatar' in request.GET and request.GET['avatar']):
        	avatar = request.GET['avatar']
	else:
		avatar = ""

	if ('isLogged' in request.session):
		result.append({"isLogged":request.session['isLogged'], "username":request.session['username'], "email":request.session['email'], "avatar":request.session['avatar']})
		return HttpResponse(simplejson.dumps(result), mimetype='application/json')
	else:
		request.session['isLogged'] = True
		request.session['username'] = username
		request.session['email'] = email
		request.session['avatar'] = avatar
		return HttpResponse("You have logged in successfully")

def logout(request):
	request.session.flush()
	return HttpResponse("CU next time")

