from django.contrib import admin
from django.urls import path, include  # Используем include для подключения маршрутов из приложений

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),  # Подключение маршрутов из приложения accounts
]
