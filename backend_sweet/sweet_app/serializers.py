# serializers.py
from rest_framework import serializers
from .models import Sweet,PurchasedSweet
from django.contrib.auth.models import User


class SweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sweet
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        return user
class PurchasedSweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchasedSweet
        fields = '__all__'
        read_only_fields = ['purchase_date']

    
