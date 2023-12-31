# Generated by Django 4.2.3 on 2023-08-13 13:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurants',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=120)),
                ('Country', models.CharField(max_length=50)),
                ('Price', models.IntegerField()),
                ('Rating', models.IntegerField()),
                ('People', models.IntegerField(blank=True, null=True)),
                ('Address', models.CharField(max_length=120)),
                ('Introduction', models.TextField()),
                ('Picture', models.ImageField(upload_to='Restaurant/')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Rating', models.IntegerField()),
                ('Title', models.CharField(max_length=120)),
                ('Body', models.TextField()),
                ('Photo', models.ImageField(upload_to='Restaurant/Comment/')),
                ('Restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Restaurant.restaurants')),
            ],
        ),
    ]
