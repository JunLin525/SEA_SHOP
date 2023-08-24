from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = (
            'User_name',
            'email',
            'company',
            'natioality',
            'gender',
            'cell_phone',

        )


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = (
            'User_name',
            'email',
            'company',
            'natioality',
            'gender',
            'cell_phone',

        )
