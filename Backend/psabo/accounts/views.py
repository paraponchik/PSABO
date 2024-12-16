from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user:
            login(request, user)
            return redirect('services')  # Перенаправление на страницу с сервисами
        else:
            return render(request, 'accounts/auth/login.html', {
                'error_message': 'Invalid email or password',
            })
    return render(request, 'accounts/auth/login.html')

def register_view(request):
    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        email = request.POST.get('email')
        password = request.POST.get('password')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return render(request, 'accounts/auth/register.html')

        # Создание пользователя
        user = User.objects.create_user(email=email, password=password)
        user.full_name = full_name  # Установите дополнительные поля
        user.save()

        login(request, user)  # Автоматически вход после регистрации
        return redirect('services')  # Перенаправление на страницу сервисов

    return render(request, 'accounts/auth/register.html')

@login_required
def services_view(request):
    return render(request, 'accounts/user/services.html')
