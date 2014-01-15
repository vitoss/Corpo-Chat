from django.conf.urls import patterns, include, url
from Frontend.views import homepage
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Frontend.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    
    url(r'^$', homepage),
    url(r'^admin/', include(admin.site.urls)),
)