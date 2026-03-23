import { useEffect, useMemo, useState } from 'react';
import type { Task, TaskCreateOrUpdate, TaskStatus } from '../models/task';

interface TaskFormProps {
  initialTask: Task | null;
  onSubmitTask: (task: TaskCreateOrUpdate) => void;
  onCancelEdit: () => void;
}

interface FormState {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

const statuses: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'DONE'];

function toDateTimeLocalValue(value?: string | null): string {
  if (!value) return '';
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function TaskForm({
  initialTask,
  onSubmitTask,
  onCancelEdit,
}: TaskFormProps) {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    status: 'TODO',
    dueDate: '',
  });

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title,
        description: initialTask.description ?? '',
        status: initialTask.status,
        dueDate: toDateTimeLocalValue(initialTask.dueDate),
      });
      return;
    }

    setForm({
      title: '',
      description: '',
      status: 'TODO',
      dueDate: '',
    });
  }, [initialTask]);

  const hasPastDueDateError = useMemo(() => {
    if (!form.dueDate || form.status === 'DONE') return false;
    return new Date(form.dueDate).getTime() < new Date().getTime();
  }, [form.dueDate, form.status]);

  const isTitleInvalid = form.title.trim().length === 0;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isTitleInvalid || hasPastDueDateError) return;

    const payload: TaskCreateOrUpdate = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      status: form.status,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };

    onSubmitTask(payload);
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div>
        <label>Title</label>
        <input
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
        />
        {isTitleInvalid && <div className="error">Title is required</div>}
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(event) =>
            setForm((current) => ({ ...current, description: event.target.value }))
          }
        />
      </div>

      <div>
        <label>Status</label>
        <select
          value={form.status}
          onChange={(event) =>
            setForm((current) => ({ ...current, status: event.target.value as TaskStatus }))
          }
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Due date &amp; time</label>
        <input
          type="datetime-local"
          value={form.dueDate}
          onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))}
        />
        {hasPastDueDateError && (
          <div className="error">Past due date/time is only allowed for completed tasks.</div>
        )}
      </div>

      <div className="buttons">
        <button type="submit" disabled={isTitleInvalid || hasPastDueDateError}>
          Save
        </button>
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      </div>
    </form>
  );
}
