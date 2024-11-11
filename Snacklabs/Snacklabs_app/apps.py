from django.apps import AppConfig


class SnacklabsAppConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Snacklabs_app"

    def ready(self):
        import Snacklabs_app.signals  # 시그널 등록