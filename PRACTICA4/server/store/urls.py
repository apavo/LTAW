from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^bikes/$', views.bikes_view, name='bikes'),
    url(r'^order/$',views.order_view,name='order'),
    url(r'^books/$',views.books_view,name='books'),
    url(r'^music/$',views.music_view,name='music'),
    url(r'^search/$',views.search_view,name='search'),
]
