from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Sweet, PurchasedSweet

class SweetTestCase(TestCase):
    def setUp(self):
        # GREEN: Setup known good state for tests
        self.sweet = Sweet.objects.create(
            name="Gulab Jamun",
            category="MILK",  
            price=20,
            quantity=10
        )

    def test_sweet_creation(self):
        # GREEN: Verifying correct creation
        self.assertEqual(self.sweet.name, "Gulab Jamun")
        self.assertEqual(self.sweet.price, 20)

    def test_string_representation(self):
        # RED → GREEN: Add __str__ method → Make test pass
        self.assertEqual(str(self.sweet), "Gulab Jamun")

    def test_price_must_be_positive(self):
        # RED: Test fails because negative price is allowed
        sweet = Sweet(name="Rasgulla", category="MILK", price=-10, quantity=5)
        with self.assertRaises(ValidationError):
            sweet.full_clean()
        # GREEN: Add validation in model to restrict negative price

    def test_reduce_stock_on_purchase(self):
        # RED: Initially fails if no logic reduces stock
        PurchasedSweet.objects.create(
            sweet=self.sweet,
            buyer_name="test_user",
            quantity=2,
            price=40
        )
        self.sweet.refresh_from_db()
        self.assertEqual(self.sweet.quantity, 8)
        # GREEN: Add logic in model to subtract quantity
        # REFACTOR: Move logic to clean() or save()

    def test_prevent_over_purchase(self):
        # RED: Fails if no quantity validation exists
        with self.assertRaises(ValidationError):
            PurchasedSweet.objects.create(
                sweet=self.sweet,
                buyer_name="test_user",
                quantity=15,
                price=300
            )
        # GREEN: Add validation to prevent purchasing more than available

    def test_multiple_purchases_accumulate(self):
        # RED: Fails if quantity not updated properly across multiple purchases
        PurchasedSweet.objects.create(sweet=self.sweet, buyer_name="A", quantity=2, price=40)
        PurchasedSweet.objects.create(sweet=self.sweet, buyer_name="A", quantity=3, price=60)
        self.sweet.refresh_from_db()
        self.assertEqual(self.sweet.quantity, 5)  # 10 - 2 - 3
        # GREEN: Quantity deduction logic accumulates correctly

    def test_purchased_sweet_str(self):
        # RED: __str__ of PurchasedSweet not defined
        purchase = PurchasedSweet.objects.create(
            sweet=self.sweet,
            buyer_name="Tirth",
            quantity=1,
            price=20
        )
        self.assertEqual(str(purchase), "Tirth bought 1 of Gulab Jamun")
        # GREEN: Implement __str__ for PurchasedSweet
