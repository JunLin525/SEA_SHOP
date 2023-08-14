from django.db import models
import uuid

# Create your models here.


class Restaurants(models.Model):

    Name = models.CharField(max_length=120)
    Country = models.CharField(max_length=50)
    Price = models.IntegerField()
    Rating = models.IntegerField()
    People = models.IntegerField(null=True, blank=True)
    Address = models.CharField(max_length=120)
    Introduction = models.TextField()
    Picture = models.ImageField(upload_to='Restaurant/')

    def __str__(self):
        return self.Name


class Comment(models.Model):
    Restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    Rating = models.IntegerField()
    Title = models.CharField(max_length=120)
    Body = models.TextField()
    Photo = models.ImageField(upload_to='Restaurant/Comment/')

    def __str__(self):
        return f"❰{self.Restaurant}❱- ❰{self.Title}❱"
