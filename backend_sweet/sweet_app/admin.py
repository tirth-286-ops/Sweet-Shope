from django.contrib import admin, messages
from .models import Sweet,PurchasedSweet
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from rest_framework import serializers

# Optional: customize Sweet display
@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity','unit_type')
    search_fields = ('name', 'category')
    list_filter = ('category',)
    ordering = ('name',)

    def changelist_view(self, request, extra_context=None):
        # Load sweets with low or zero stock
        out_of_stock = Sweet.objects.filter(quantity=0)
        low_stock = Sweet.objects.filter(quantity__gt=0, quantity__lte=5)

        for sweet in out_of_stock:
            self.message_user(
                request,
                f"'{sweet.name}' is now OUT OF STOCK!",
                level=messages.WARNING
            )
        for sweet in low_stock:
            self.message_user(
                request,
                f"'{sweet.name}' is LOW ON STOCK ({sweet.quantity} left).",
                level=messages.INFO
            )
        return super().changelist_view(request, extra_context)
@admin.register(PurchasedSweet)
class PurchasedSweetAdmin(admin.ModelAdmin):
    list_display = ('buyer_name','sweet', 'quantity', 'price', 'purchase_date')
    list_filter = ('purchase_date',)
    search_fields = ('sweet__name',)
    readonly_fields = ('purchase_date',)


