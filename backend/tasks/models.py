from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone


class Task(models.Model):
    class Status(models.TextChoices):
        TODO = 'TODO', 'TODO'
        IN_PROGRESS = 'IN_PROGRESS', 'IN_PROGRESS'
        DONE = 'DONE', 'DONE'

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.TODO)
    due_date = models.DateTimeField(blank=True, null=True)

    def clean(self):
        if self.due_date and self.status != self.Status.DONE and self.due_date < timezone.now():
            raise ValidationError('Past due date/time is only allowed for completed tasks.')

    def __str__(self):
        return self.title
