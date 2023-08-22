from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from Custom_User.models import CustomUser
# Create your models here.


class Restaurants(models.Model):

    Name = models.CharField(max_length=120)
    Country = models.CharField(max_length=50)
    Price = models.IntegerField(
        default=50,
        validators=[
            MaxValueValidator(10000),
            MinValueValidator(1)
        ]
    )
    Rating = models.IntegerField(
        default=1,
        validators=[
            MaxValueValidator(10),
            MinValueValidator(1)
        ]
    )
    People = models.IntegerField(
        default=1,
        validators=[
            MaxValueValidator(50),
            MinValueValidator(1)
        ])
    Address = models.CharField(max_length=120)
    Introduction = models.TextField(blank=True, null=True)
    Picture = models.ImageField(upload_to='Restaurant/', blank=True, null=True)

    def __str__(self):
        return self.Name


class Comment(models.Model):
    user_pk = models.ForeignKey(CustomUser,  null=False,
                                on_delete=models.CASCADE)
    Restaurant = models.ForeignKey(Restaurants, on_delete=models.CASCADE)
    Rating = models.IntegerField()
    Title = models.CharField(max_length=120)
    Body = models.TextField()
    Photo = models.ImageField(
        upload_to='Restaurant/Comment/', blank=True, null=True)

    def __str__(self):
        return f"<{self.user}>-❰{self.Restaurant}❱- ❰{self.Title}❱"
