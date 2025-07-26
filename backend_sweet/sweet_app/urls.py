
from django.urls import path
from .views import SweetListCreate, SweetDetailUpdateDelete, RegisterUserView,UserProfileView,PurchaseCreateAPIView
urlpatterns = [
    path('sweets/', SweetListCreate.as_view(), name='sweet-list'),
    path('sweets/<int:pk>/', SweetDetailUpdateDelete.as_view(), name='sweet-detail'),
    path('auth/user/', UserProfileView.as_view()),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('purchases/', PurchaseCreateAPIView.as_view()),

]
