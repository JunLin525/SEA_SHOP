# Generated by Django 4.2 on 2023-08-20 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Restaurant', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='Photo',
            field=models.ImageField(blank=True, null=True, upload_to='Restaurant/Comment/'),
        ),
        migrations.AlterField(
            model_name='restaurants',
            name='Picture',
            field=models.ImageField(blank=True, null=True, upload_to='Restaurant/'),
        ),
    ]
