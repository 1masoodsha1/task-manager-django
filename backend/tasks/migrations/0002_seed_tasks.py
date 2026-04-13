from django.db import migrations
from django.utils import timezone
from datetime import timedelta


def seed_tasks(apps, schema_editor):
    Task = apps.get_model("tasks", "Task")

    if Task.objects.exists():
        return

    now = timezone.now()

    Task.objects.bulk_create([
        Task(
            title="Buy groceries",
            description="Milk, eggs, bread, fruit, and rice.",
            status="TODO",
            due_date=now + timedelta(days=1),
        ),
        Task(
            title="Do laundry",
            description="Wash clothes and fold them in the evening.",
            status="IN_PROGRESS",
            due_date=now + timedelta(hours=8),
        ),
        Task(
            title="Clean the room",
            description="Vacuum the floor and organize the desk.",
            status="TODO",
            due_date=now + timedelta(days=2),
        ),
        Task(
            title="Pay electricity bill",
            description="Check the online account and make the payment.",
            status="TODO",
            due_date=now + timedelta(days=3),
        )
    ])


def unseed_tasks(apps, schema_editor):
    Task = apps.get_model("tasks", "Task")
    Task.objects.filter(
        title__in=[
            "Buy groceries",
            "Do laundry",
            "Clean the room",
            "Pay electricity bill",
            "Call mom",
        ]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("tasks", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_tasks, unseed_tasks),
    ]