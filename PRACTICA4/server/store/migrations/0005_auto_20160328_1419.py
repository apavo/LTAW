# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-28 14:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20160328_0951'),
    ]

    operations = [
        migrations.AddField(
            model_name='bikes',
            name='price',
            field=models.CharField(default=0, max_length=10),
        ),
        migrations.AddField(
            model_name='books',
            name='price',
            field=models.CharField(default=0, max_length=10),
        ),
        migrations.AddField(
            model_name='music',
            name='price',
            field=models.CharField(default=0, max_length=10),
        ),
    ]
