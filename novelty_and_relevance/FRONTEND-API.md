Ниже приведены **TypeScript-интерфейсы** всех сущностей, которые возвращает API. 

```typescript
// ========== Общие типы ==========
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// ========== Пользователь (User) ==========
interface User {
  id: string;               // UUID
  email: string;
  full_name: string;
  role: 'psychologist' | 'supervisor' | 'admin';
  specialty?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;       // ISO datetime
}

// ========== Пациент (Patient) ==========
interface Patient {
  id: string;
  external_id: string;      // например "#0041"
  full_name: string;
  date_of_birth?: string;   // ISO date
  age?: number;             // вычисляемое поле
  gender?: 'male' | 'female' | 'other';
  phone?: string;
  email?: string;
  address?: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'paused' | 'completed' | 'archived';
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Сокращённый объект для списка пациентов
interface PatientListItem {
  id: string;
  external_id: string;
  full_name: string;
  age: number;
  risk_level: Patient['risk_level'];
  status: Patient['status'];
  diagnosis?: string;       // первый диагноз (кратко)
  ai_score?: number;
  last_session?: string;    // ISO datetime
  next_appointment?: string; // ISO datetime
}

// Статистика пациентов (GET /patients/stats)
interface PatientsStats {
  total: number;
  critical: number;
  attention: number;
  stable: number;
}

// ========== Диагноз (Diagnosis) ==========
interface Diagnosis {
  id: string;
  patient_id: string;
  diagnosis_text: string;
  icd_code?: string;
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
  accuracy?: number;        // 0–100
  status: 'pending' | 'confirmed' | 'rejected';
  created_by?: string;      // user id
  confirmed_by?: string;
  created_at: string;
  updated_at: string;
}

// Расширенный диагноз для списка (с вложенным пациентом)
interface DiagnosisWithPatient extends Diagnosis {
  patient: {
    id: string;
    external_id: string;
    full_name: string;
    age: number;
  };
}

// Статистика диагнозов (GET /diagnoses/stats)
interface DiagnosesStats {
  total: number;
  pending: number;
  critical: number;
  confirmed: number;
  ai_accuracy: number;
}

// ========== Приём (Appointment) ==========
interface Appointment {
  id: string;
  patient_id: string;
  doctor_id?: string;
  start_time: string;       // ISO datetime
  end_time: string;         // ISO datetime
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  type?: 'initial' | 'follow_up' | 'emergency' | 'group';
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Расширенный приём для календаря
interface AppointmentWithDetails extends Appointment {
  patient: {
    id: string;
    external_id: string;
    full_name: string;
    risk_level: Patient['risk_level'];
    diagnosis?: string;
  };
  doctor?: {
    id: string;
    full_name: string;
  };
}

// ========== Мониторинг (MonitoringRecord) ==========
interface MonitoringRecord {
  id: string;
  patient_id: string;
  anxiety_level?: number;   // 0–100
  mood_level?: number;      // 0–100
  sleep_hours?: number;
  steps?: number;
  heart_rate?: number;
  recorded_at: string;      // ISO datetime
}

// Для ленты мониторинга (с пациентом)
interface MonitoringLiveItem {
  patient: {
    id: string;
    external_id: string;
    full_name: string;
    risk_level: Patient['risk_level'];
  };
  anxiety_level?: number;
  mood_level?: number;
  sleep_hours?: number;
  steps?: number;
  heart_rate?: number;
  recorded_at: string;
}

// Статистика мониторинга (GET /monitoring/stats)
interface MonitoringStats {
  active_sessions: number;
  online_patients: number;
  alerts: number;
  stable: number;
  avg_anxiety: number;
  avg_sleep: number;
  avg_activity: number;
  avg_social: number;
  ai_risk_forecast: number;
}

// ========== Событие (Event) ==========
interface Event {
  id: string;
  patient_id?: string;
  type: 'critical_alert' | 'medication_miss' | 'ai_diagnosis' | 'session_completed' | 'system_update' | 'improvement';
  title: string;
  description?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  created_by?: string;
  created_at: string;
}

// Событие с пациентом (для ленты)
interface EventWithPatient extends Event {
  patient?: {
    id: string;
    external_id: string;
    full_name: string;
  };
}

// Статистика событий (GET /events/stats)
interface EventsStats {
  total: number;
  critical: number;
  warnings: number;
  ai_events: number;
  comments: number;
}

// ========== Аналитика ==========
interface AnalyticsOverview {
  avg_sleep: number;
  active_patients: number;
  total_patients: number;
  therapy_effectiveness: number;   // процент
  avg_anxiety: number;
  ai_accuracy: number;
}

interface AnalyticsTrend {
  week: number;
  anxiety: number;
  mood: number;
}

interface DiagnosisDistribution {
  label: string;
  count: number;
  percent: number;
}

interface Prediction {
  type: string;
  title: string;
  count: number;
  patients?: string[];
  details?: string;
}

// ========== Дашборд ==========
interface DashboardStats {
  total_patients: number;
  new_patients_week: number;
  attention_required: number;
  attention_today: number;
  diagnoses_pending: number;
  diagnoses_new_today: number;
  ai_accuracy: number;
  ai_accuracy_change: number;
  ai_insights: {
    critical: { count: number; text: string };
    warning: { count: number; text: string };
    positive: { count: number; text: string };
  };
}

// ========== Для отправки (тело запроса) ==========
interface CreatePatientRequest {
  full_name: string;
  date_of_birth?: string;
  gender?: Patient['gender'];
  phone?: string;
  email?: string;
  address?: string;
  risk_level?: Patient['risk_level'];
  status?: Patient['status'];
  notes?: string;
}

interface CreateDiagnosisRequest {
  patient_id: string;
  diagnosis_text: string;
  icd_code?: string;
  risk_level?: Diagnosis['risk_level'];
  accuracy?: number;
}

interface CreateAppointmentRequest {
  patient_id: string;
  doctor_id?: string;
  start_time: string;
  end_time: string;
  type?: Appointment['type'];
  notes?: string;
}

interface CreateMonitoringRequest {
  patient_id: string;
  anxiety_level?: number;
  mood_level?: number;
  sleep_hours?: number;
  steps?: number;
  heart_rate?: number;
}

interface CreateEventRequest {
  patient_id?: string;
  type: Event['type'];
  title: string;
  description?: string;
  severity?: Event['severity'];
}
```

## Как пользоваться

- Скопируйте этот код в файл `src/types/api.ts` (или `src/api-types.ts`) во фронтенд-проекте.
- Импортируйте нужные интерфейсы для типизации ответов от `fetch` или `axios`.

Пример использования:

```typescript
import { ApiResponse, PatientListItem } from './types/api';

fetch('/patients?page=1')
  .then(res => res.json() as Promise<ApiResponse<PatientListItem[]>>)
  .then(data => {
    if (data.success) {
      console.log(data.data); // массив пациентов
    }
  });
```
