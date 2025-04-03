import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auth_api.settings')
django.setup()

from authentication.models import Role, User, UserManager

admin_role, _ = Role.objects.get_or_create(name=Role.ADMIN, description='Administrator')
moderator_role, _ = Role.objects.get_or_create(name=Role.MODERATOR, description='Moderator')
user_role, _ = Role.objects.get_or_create(name=Role.USER, description='Regular user')

admin = User.objects.create_user(
    email='admin@example.com',
    password='admin123',
    role=admin_role,
    is_staff=True,
    is_superuser=True
)
print(f"Created admin user: {admin.email}")

users = [
    {'email': 'user1@example.com', 'password': 'user123'},
    {'email': 'user2@example.com', 'password': 'user123'},
    {'email': 'user3@example.com', 'password': 'user123'}
]

for user_data in users:
    user = User.objects.create_user(
        email=user_data['email'],
        password=user_data['password'],
        role=user_role
    )
    print(f"Created regular user: {user.email}")
