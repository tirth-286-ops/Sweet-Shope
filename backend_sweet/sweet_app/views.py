# views.py
from rest_framework import generics, permissions
from .models import Sweet, PurchasedSweet
from .serializers import SweetSerializer,UserSerializer,PurchasedSweetSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

class SweetListCreate(ListCreateAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer

class SweetDetailUpdateDelete(RetrieveUpdateDestroyAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully."})
        except Exception as e:
            return Response({"error": str(e)}, status=400)



        
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "name": user.get_full_name() or user.username,
            "email": user.email,
        })
class PurchaseCreateAPIView(generics.CreateAPIView):
    queryset = PurchasedSweet.objects.all()
    serializer_class = PurchasedSweetSerializer  

