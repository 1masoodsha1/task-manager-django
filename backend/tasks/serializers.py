from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    dueDate = serializers.DateTimeField(source='due_date', allow_null=True, required=False)

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'dueDate']

    def validate(self, attrs):
        status = attrs.get('status', getattr(self.instance, 'status', Task.Status.TODO))
        due_date = attrs.get('due_date', getattr(self.instance, 'due_date', None))
        if due_date and status != Task.Status.DONE:
            from django.utils import timezone
            if due_date < timezone.now():
                raise serializers.ValidationError(
                    {'dueDate': 'Past due date/time is only allowed for completed tasks.'}
                )
        return attrs
