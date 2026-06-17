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
| 1 | User Interaction Module | [ChatbotPage.jsx](src/pages/chatbot/ChatbotPage.jsx) |
| 2 | Knowledge Base Module | [KnowledgeBasePage.jsx](src/pages/chatbot/KnowledgeBasePage.jsx) |
| 3 | Learning & Development Module | [LearningDevPage.jsx](src/pages/chatbot/LearningDevPage.jsx) |

### Queue & Kiosk Operations — Muhammad Aniq

| Sprint | Module | Frontend Script |
|--------|--------|----------------|
| 1 | Queue Ticketing Module | [QueueTicketPage.jsx](src/pages/queue/QueueTicketPage.jsx) |
| 2 | Queue Manager Module | [QueueManagerPage.jsx](src/pages/queue/QueueManagerPage.jsx) |
| 3 | Feedback & Rating Module | [FeedbackPage.jsx](src/pages/queue/FeedbackPage.jsx) |
| 4 | Notice Board Module | [NoticeBoardPage.jsx](src/pages/queue/NoticeBoardPage.jsx) |

### Request & Service Management — Irfan Syahmi

| Sprint | Module | Frontend Script |
|--------|--------|----------------|
| 1 | Appointment Booking Module | [AppointmentPage.jsx](src/pages/requests/AppointmentPage.jsx) |
| 2 | Complaint Submission Module | [ComplaintPage.jsx](src/pages/requests/ComplaintPage.jsx) |

### Analytics & Insight — Muhammad Amirul Hady

| Sprint | Module | Frontend Script |
|--------|--------|----------------|
| 1 | View User Statistics | [UserStatisticsPage.jsx](src/pages/analytics/UserStatisticsPage.jsx) |
| 2 | Pattern Recognition | [PatternRecognitionPage.jsx](src/pages/analytics/PatternRecognitionPage.jsx) |
| 3 | Predictive Forecasting | [PredictiveForecastPage.jsx](src/pages/analytics/PredictiveForecastPage.jsx) |

---

## Running the Project

```bash
npm install
npm run dev
```
