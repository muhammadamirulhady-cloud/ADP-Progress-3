# AI-FrontDesk MPS
AI-powered self-service kiosk system for Majlis Perbandaran Segamat (MPS)

> SCSE2243: Application Development I | Group 06 | Section 03  
> Lecturer: Dr Alif Ridzuan bin Khairuddin

---

## Team Members

| Name | Matric No | Subsystem |
|------|-----------|-----------|
| Muhammad Aniq bin Ahmad Iskander | A24CS0276 | Queue Ticketing, Queue Manager, Feedback & Rating, Notice Board |
| Muhammad Harith bin Lukman | A24CS0280 | Chatbot Subsystem |
| Muhammad Amirul Hady bin Zainol Hady | A24CS0125 | Analytics & Insight |
| Irfan Syahmi bin Azman | A24CS0254 | Request & Service Management |

---

## Module to Frontend Script Mapping

### Chatbot Subsystem — Muhammad Harith

| Sprint | Module | Frontend Script |
|--------|--------|----------------|
| 1 | User Interaction Module | [AskQuestionScreen.tsx](src/app/components/AskQuestionScreen.tsx) |
| 2 | Knowledge Base Module | [AdminChatbotKnowledgeManager.tsx](src/app/components/AdminChatbotKnowledgeManager.tsx) |
| 3 | Learning & Development Module | [AdminLearningDevelopment.tsx](src/app/components/AdminLearningDevelopment.tsx) |

### Queue & Kiosk Operations — Muhammad Aniq

| Sprint | Module | Frontend Script |
|--------|--------|----------------|
| 1 | Queue Ticketing Module | [QueueScreen.tsx](src/app/components/QueueScreen.tsx) |
| 2 | Queue Manager Module | [QueueManagerScreen.tsx](src/app/components/QueueManagerScreen.tsx) |
| 3 | Feedback & Rating Module | [FeedbackScreen.tsx](src/app/components/FeedbackScreen.tsx) |
| 4 | Notice Board Module | [NoticeCarousel.tsx](src/app/components/NoticeCarousel.tsx) |

### Request & Service Management — Irfan Syahmi

| Sprint | Module | Frontend Script |
|--------|--------|----------------|
| 1 | Appointment Booking Module | [BookAppointmentScreen.tsx](src/app/components/BookAppointmentScreen.tsx) |
| 2 | Complaint Submission Module | [SubmitComplaintScreen.tsx](src/app/components/SubmitComplaintScreen.tsx) |
| 3 | Admin Appointment Dashboard | [AdminAppointmentDashboard.tsx](src/app/components/AdminAppointmentDashboard.tsx) |
| 4 | Admin Complaint Dashboard | [AdminComplaintDashboard.tsx](src/app/components/AdminComplaintDashboard.tsx) |

### Analytics & Insight — Muhammad Amirul Hady

| Sprint | Module | Frontend Script |
|--------|--------|----------------|
| 1 | Analytics Dashboard | [AnalyticsDashboard.tsx](src/app/components/analytics/AnalyticsDashboard.tsx) |
| 2 | User Activity Dashboard | [UserActivityDashboard.tsx](src/app/components/analytics/UserActivityDashboard.tsx) |
| 3 | Visitor Tracking | [VisitorTrackingAnalytics.tsx](src/app/components/analytics/VisitorTrackingAnalytics.tsx) |
| 4 | Pattern Recognition | [ComplaintPatternDetection.tsx](src/app/components/analytics/ComplaintPatternDetection.tsx) |
| 5 | Predictive Forecasting | [PeakHourPrediction.tsx](src/app/components/analytics/PeakHourPrediction.tsx) |

---

## Running the Project

```bash
npm install
npm run dev
```
