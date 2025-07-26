from django.contrib import admin, messages
from .models import Sweet,PurchasedSweet
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from rest_framework import serializers

# Optional: customize Sweet display
@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity')
    search_fields = ('name', 'category')
    list_filter = ('category',)
    ordering = ('name',)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        # Admin popup messages based on quantity
        if obj.quantity == 0:
            self.message_user(
                request,
                f"⚠️ '{obj.name}' is now OUT OF STOCK!",
                level=messages.WARNING
            )
        elif obj.quantity <= 5:
            self.message_user(
                request,
                f"ℹ️ '{obj.name}' is LOW ON STOCK ({obj.quantity} left).",
                level=messages.INFO
            )

@admin.register(PurchasedSweet)
class PurchasedSweetAdmin(admin.ModelAdmin):
    list_display = ('buyer_name','sweet', 'quantity', 'price', 'purchase_date')
    list_filter = ('purchase_date',)
    search_fields = ('sweet__name',)
    readonly_fields = ('purchase_date',)

