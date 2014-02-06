from django.conf.urls import patterns, include, url
from Frontend.views import homepage, login, logout, userIsLogged
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Frontend.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    url(r'^admin/', include(admin.site.urls)),
    url(r'^[\w]*$', homepage),
    url(r'^login/', login),
    url(r'^logout/', logout),
    url(r'^userIsLogged/', userIsLogged)

)
