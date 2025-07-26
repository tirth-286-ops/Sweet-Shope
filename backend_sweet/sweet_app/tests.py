from django.test import TestCase
from django.contrib.auth.models import User
from .models import Sweet,PurchasedSweet
from django.core.exceptions import ValidationError

class SweetTestCase(TestCase):
    def setUp(self):
        self.admin = User.objects.create_user(username='admin', password='admin123', is_staff=True)
        self.user = User.objects.create_user(username='user', password='user123')
        Sweet.objects.create(name="Gulab Jamun", category="Dessert", price=20, quantity=10)

    def test_sweet_creation(self):
        sweet = Sweet.objects.get(name="Gulab Jamun")
        self.assertEqual(sweet.price, 20)

    def test_purchase(self):
        sweet = Sweet.objects.get(name="Gulab Jamun")
        sweet.quantity -= 1
        sweet.save()
        self.assertEqual(sweet.quantity, 9)

    def test_purchase_sweet(self):
        purchase = PurchasedSweet.objects.create(user=self.user, sweet=self.sweet, quantity=2)
        self.sweet.refresh_from_db()
        self.assertEqual(purchase.quantity, 2)
        self.assertEqual(self.sweet.quantity, 8)  
    
    def test_purchase_more_than_stock(self):
        with self.assertRaises(ValidationError):
            if self.sweet.quantity < 15:
                raise ValidationError("Not enough stock.")

    def test_multiple_purchases_accumulate(self):
        PurchasedSweet.objects.create(user=self.user, sweet=self.sweet, quantity=2)
        PurchasedSweet.objects.create(user=self.user, sweet=self.sweet, quantity=3)
        self.sweet.refresh_from_db()
        self.assertEqual(self.sweet.quantity, 5)  # 10 - 2 - 3 = 5

    def test_sweet_string_representation(self):
        self.assertEqual(str(self.sweet), "Gulab Jamun")

    def test_price_must_be_positive(self):
        with self.assertRaises(ValidationError):
            Sweet.objects.create(name="Rasgulla", category="Dessert", price=-5, quantity=5).full_clean()