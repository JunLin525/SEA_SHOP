# Generated by Django 4.2 on 2023-08-22 16:45

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurant', '0004_alter_restaurants_introduction_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurants',
            name='Price',
            field=models.IntegerField(default=50, validators=[django.core.validators.MaxValueValidator(10000), django.core.validators.MinValueValidator(1)]),
        ),
    ]