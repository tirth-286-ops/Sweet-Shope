from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Sweet(models.Model):
    CATEGORY_CHOICES = [
        ('MILK', 'Milk Based'),
        ('DRY', 'Dry Fruit'),
        ('SUGAR', 'Sugar Based'),
        ('BENGALI', 'Bengali Sweets'),
        ('CHOCOLATE', 'Chocolate Sweets'),
        ]
    
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    unit_type = models.CharField(max_length=3,default='PCS')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.PositiveIntegerField()
    image = models.ImageField(upload_to='sweet_images/', null=True, blank=True)

    def __str__(self):
        return self.name
    @property
    def is_out_of_stock(self):
        return self.quantity == 0

class PurchasedSweet(models.Model):
    sweet = models.ForeignKey(Sweet, on_delete=models.CASCADE)
    buyer_name = models.CharField(max_length=100, null=True, blank=True)
    quantity = models.PositiveIntegerField(null=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    purchase_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if self.pk is None:  # Only when creating a new purchase
            if self.sweet.quantity < self.quantity:
                raise ValidationError("Not enough stock available for this sweet.")

            self.sweet.quantity -= self.quantity
            self.sweet.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.buyer_name} bought {self.quantity} of {self.sweet.name}"
    
  