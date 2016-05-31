#cuenta administrador --> admin_store login: admin_store
from django.contrib import admin
from .models import bikes,books,music,purchase
admin.site.register(bikes);
admin.site.register(books);
admin.site.register(music);
admin.site.register(purchase);


