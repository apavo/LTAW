# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-28 19:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_purchase'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='books',
            name='gender',
        ),
    ]
