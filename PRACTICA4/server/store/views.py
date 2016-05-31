# python manage.py runserver puerto 8000 http://localhost:8000/store/
#admin_store

from django.template import Context, Template;
from django.http import HttpResponse, Http404;
from django.template.loader import get_template;
from .forms import BikeForm
from django.shortcuts import render
from store.models import bikes,books,music
from django.shortcuts import redirect
from django.db.models import Q

def index(request):

		return render(request,"index.html",{})

def bikes_view(request):
	bikeslist = bikes.objects.all();
	return render(request,'bikes.html', {'bikeslist':bikeslist});

def books_view(request):
	booklist = books.objects.all();
	return render(request,'books.html', {'booklist':booklist});

def music_view(request):
	musiclist = music.objects.all();
	return render(request,'music.html', {'musiclist':musiclist});

def order_view(request):
	#si envio formulario POST sino GET y se devuelve vacio
	if request.method == "POST":
		form = BikeForm(request.POST)
		if form.is_valid():
			purchase = form.save(commit=False)
			purchase.save()
	else:
		form = BikeForm();
		#renderizo order html con los datos de form
	return render(request, 'order.html', {'form': form})

def search_view(request):
	 
	query =  request.GET.get("search","") #el search viene del html (search.html) del formulario
	if query:
		#creo las querys y filtro en base de datos
		qbike = (Q(model__icontains=query));
		qbook_music = (Q(author__icontains=query)) | Q(title__icontains=query);
		results_bike = bikes.objects.filter(qbike).distinct();
		results_book = books.objects.filter(qbook_music).distinct();
		results_music= music.objects.filter(qbook_music).distinct();
	
	return render(request,"search.html", {
	"results_bike": results_bike,
	"results_book":results_book,
	"results_music":results_music,
	"query": query
	})
