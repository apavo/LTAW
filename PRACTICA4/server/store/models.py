#add un campo a un modelo primero python manage.py makemigrations
#despues python manage.py migrate

from django.db import models

class bikes (models.Model):
	model = models.CharField(max_length= 30);
	color = models.CharField(max_length= 30);
	photo = models.ImageField(upload_to= 'store/static/images');
	price = models.CharField(max_length= 10,default=0);
	archive= models.CharField(max_length= 30,default=0);

class books(models.Model):

	author = models.CharField(max_length= 30);
	title = models.CharField(max_length= 30);
	descrition= models.TextField(default='');
	photo = models.ImageField(upload_to= 'store/static/images');
	price = models.CharField(max_length= 10,default=0);
	archive = models.CharField(max_length= 30,default=0);

class music(models.Model):
	author = models.CharField(max_length= 30);
	title = models.CharField(max_length= 30);
	photo = models.ImageField(upload_to= 'store/static/images');
	price = models.CharField(max_length= 10,default=0);
	archive = models.CharField(max_length= 30,default=0);

class purchase(models.Model):
	name = models.CharField(max_length= 30);
	category = models.CharField(max_length= 30);
	product = models.CharField(max_length= 30);