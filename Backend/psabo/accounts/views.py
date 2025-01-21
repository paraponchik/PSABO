from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import User
from .models import Service


# Пользовательские страницы
@login_required
def services_view(request):
    if request.user.is_superuser:
        return redirect('admin_services')  # Администратор перенаправляется на админскую страницу
    return render(request, 'accounts/user/services.html')  # Панель пользователя


@login_required
def calendar_view(request):
    if request.user.is_superuser:
        return redirect('admin_calendar')  # Администратор перенаправляется на админскую страницу
    return render(request, 'accounts/user/calendar.html')


@login_required
def access_view(request):
    if request.user.is_superuser:
        return redirect('admin_access')  # Администратор перенаправляется на админскую страницу
    return render(request, 'accounts/user/access.html')


@login_required
def problems_view(request):
    if request.user.is_superuser:
        return redirect('admin_problems')  # Администратор перенаправляется на админскую страницу
    return render(request, 'accounts/user/problems.html')


# Админские страницы
@login_required
def admin_services_view(request):
    if not request.user.is_superuser:
        return redirect('services')  # Перенаправить обычного пользователя

    # Обработка добавления/редактирования сервиса
    if request.method == 'POST':
        service_id = request.POST.get('service_id')  # ID для обновления
        name = request.POST.get('name')  # Название сервиса
        url = request.POST.get('url')  # URL сервиса

        if not name or not url:
            messages.error(request, 'Название и ссылка обязательны!')
            return redirect('admin_services')

        try:
            if service_id:  # Обновление существующего сервиса
                service = Service.objects.get(id=service_id)
                service.name = name
                service.url = url
                service.save()
                messages.success(request, 'Сервис успешно обновлён!')
            else:  # Создание нового сервиса
                Service.objects.create(name=name, url=url)
                messages.success(request, 'Сервис успешно добавлен!')
        except Service.DoesNotExist:
            messages.error(request, 'Сервис не найден.')

        return redirect('admin_services')

    # Отображение всех сервисов
    services = Service.objects.all()
    return render(request, 'accounts/admin/servicesAdmin.html', {'services': services})


@login_required
def admin_calendar_view(request):
    if not request.user.is_superuser:
        return redirect('services')
    return render(request, 'accounts/admin/calendarAdmin.html')


@login_required
def admin_access_view(request):
    if not request.user.is_superuser:
        return redirect('services')
    return render(request, 'accounts/admin/accessAdmin.html')


@login_required
def admin_accounting_view(request):
    if not request.user.is_superuser:
        return redirect('services')
    return render(request, 'accounts/admin/accountingAdmin.html')


@login_required
def admin_users_view(request):
    if not request.user.is_superuser:
        return redirect('services')
    return render(request, 'accounts/admin/usersAdmin.html')


@login_required
def admin_problems_view(request):
    if not request.user.is_superuser:
        return redirect('services')
    return render(request, 'accounts/admin/problemsAdmin.html')


@login_required
def admin_dashboard_view(request):
    if not request.user.is_superuser:
        return redirect('services')
    return render(request, 'accounts/admin/dashboardAdmin.html')


# Авторизация и регистрация
def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user:
            login(request, user)
            if user.is_superuser:  # Проверяем поле is_superuser
                return redirect('admin_services')  # Перенаправление на панель администратора
            return redirect('services')  # Перенаправление на пользовательскую панель
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
        department = request.POST.get('department')

        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered.')
            return render(request, 'accounts/auth/register.html')

        user = User.objects.create_user(
            email=email,
            password=password,
            full_name=full_name,
            department=department
        )
        user.save()

        login(request, user)
        return redirect('services')

    return render(request, 'accounts/auth/register.html')


@login_required
def logout_view(request):
    logout(request)
    return redirect('login')
