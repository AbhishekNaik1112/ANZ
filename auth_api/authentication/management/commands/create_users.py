from django.core.management.base import BaseCommand
from authentication.models import Role, User

class Command(BaseCommand):
    help = 'Creates initial admin and regular users'

    def handle(self, *args, **options):
        admin_role, _ = Role.objects.get_or_create(name=Role.ADMIN, description='Administrator')
        # moderator_role, _ = Role.objects.get_or_create(name=Role.MODERATOR, description='Moderator')
        user_role, _ = Role.objects.get_or_create(name=Role.USER, description='Regular user')

        admin, created = User.objects.get_or_create(
            email='admin@example.com',
            defaults={
                'password': 'admin123',
                'role': admin_role,
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin.set_password('admin123')
            admin.save()
            self.stdout.write(self.style.SUCCESS(f'Created admin user: {admin.email}'))
        else:
            self.stdout.write(self.style.WARNING(f'Admin user already exists: {admin.email}'))

        users = [
            {'email': 'user1@example.com', 'password': 'user123'},
            {'email': 'user2@example.com', 'password': 'user123'},
            {'email': 'user3@example.com', 'password': 'user123'},
            {'email': 'user4@example.com', 'password': 'user123'},
            {'email': 'user5@example.com', 'password': 'user123'},
            {'email': 'user6@example.com', 'password': 'user123'},
            {'email': 'user7@example.com', 'password': 'user123'},
            {'email': 'user8@example.com', 'password': 'user123'},
            {'email': 'user9@example.com', 'password': 'user123'},
            {'email': 'user10@example.com', 'password': 'user123'}
        ]

        for user_data in users:
            user, created = User.objects.get_or_create(
                email=user_data['email'],
                defaults={
                    'password': user_data['password'],
                    'role': user_role
                }
            )
            if created:
                user.set_password(user_data['password'])
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Created regular user: {user.email}'))
            else:
                self.stdout.write(self.style.WARNING(f'User already exists: {user.email}'))
