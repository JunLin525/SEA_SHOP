from django.db import models
import uuid
from Custom_User.models import CustomUser

# Create your models here.


class Settlement(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    AreaName = models.CharField(max_length=120)
    Address = models.CharField(max_length=120)
    PublicTransportation = models.CharField(max_length=120)
    Country = models.CharField(max_length=50)
    Introduction = models.TextField()
    Picture = models.ImageField(upload_to='Settlement/')

    def __str__(self):
        return self.AreaName


class Reply(models.Model):
    user_pk = models.ForeignKey(CustomUser,  null=True, blank=True,
                            on_delete=models.CASCADE)
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False)
    Area = models.ForeignKey(Settlement, on_delete=models.CASCADE)
    Title = models.CharField(max_length=80)
    Body = models.TextField()

    def __str__(self):
        return self.Title
