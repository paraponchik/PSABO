from django.urls import path
from . import views

urlpatterns = [
    # Авторизация
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    
    # Пользовательские страницы
    path('services/', views.services_view, name='services'),
    path('calendar/', views.calendar_view, name='calendar'),
    path('access/', views.access_view, name='access'),
    path('problems/', views.problems_view, name='problems'),
    
    # Админские страницы
    path('admin/services/', views.admin_services_view, name='admin_services'),
    path('admin/calendar/', views.admin_calendar_view, name='admin_calendar'),
    path('admin/access/', views.admin_access_view, name='admin_access'),
    path('admin/accounting/', views.admin_accounting_view, name='admin_accounting'),
    path('admin/users/', views.admin_users_view, name='admin_users'),
    path('admin/problems/', views.admin_problems_view, name='admin_problems'),
    path('admin/dashboard/', views.admin_dashboard_view, name='admin_dashboard'),
]
