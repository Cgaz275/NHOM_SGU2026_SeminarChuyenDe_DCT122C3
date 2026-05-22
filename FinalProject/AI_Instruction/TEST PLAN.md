# Test Plan

**Persona-Based Digital Twin Card System**

---

## 1. Introduction

### 1.1 Document Purpose

This Test Plan document provides comprehensive guidance for all testing activities for the Persona-Based Website for Digital Twin Card system.

The main objectives of this document are:

- Define clear testing objectives, scope, strategy, and methodologies
- Ensure the system fully meets functional and non-functional requirements specified in PRD and GUI Design documents
- Identify potential risks, especially issues related to AI Digital Twin (hallucinations, guardrails, persona accuracy)
- Provide a basis for tracking, evaluating quality, and reporting test results during development and before the seminar presentation
- Support the development team in fixing bugs promptly, ensuring stable, secure, and user-friendly system operation

### 1.2 Scope of Application

This document applies to all testing activities for the Persona-Based Digital Twin Card project within the Seminar Specialized Course framework (DCT122C3).

The testing scope includes:

- All main modules completed in the MVP (Minimum Viable Product) phase
- Primary user journeys: Card Owner, Public User (Visitor), and Administrator
- Strong focus on core features: AI Digital Twin, Public Digital Profile, Profile Builder, and Realtime Inbox

This document does **not** include testing for Out-of-Scope features mentioned in the PRD (Payment, Voice Chat, NFC integration, Advanced RAG with PDF, etc.).

### 1.3 Reference Documents

1. Product Requirement Document (PRD) - Persona-Based Website for Digital Twin Card
2. GUI Design Document - Persona-Based Website for Digital Twin Card
3. Architecture & Database Design Document
4. IEEE Standard 829-2008 – Standard for Software and System Test Documentation
5. Firebase Documentation (Firestore, Authentication, Cloud Storage)
6. OpenAI / OpenRouter API Documentation

### 1.4 System Overview

Persona-Based Digital Twin Card is a web platform that allows users to create deeply personalized Digital Business Cards. The system doesn't just display static information but integrates an AI Digital Twin – an intelligent chatbot serving as a digital clone of the card owner.

The main subsystems include:

- **Landing Page**: Project introduction and demo
- **Public Digital Profile**: Public profile page, shareable via QR Code or URL
- **Owner Dashboard**: Profile Builder, AI Configuration, QR Manager, Persona Inbox
- **AI Digital Twin**: Chatbot using RAG and Multi-layer Prompt to respond according to persona
- **Admin Panel**: User and report management
- **Support Features**: vCard save, Fallback form, Human Takeover, Realtime messaging

The system is built using Mobile-first approach with Next.js 15 (Frontend), Node.js + Express (Backend), Firebase (Auth, Firestore, Storage), and OpenAI (AI Digital Twin).

---

## 2. Testing Objectives

### 2.1 Overall Objectives

The primary goal of testing the Persona-Based Digital Twin Card system is to ensure overall product quality, helping the system achieve reliability, stability, and good user experience before presentation at the Seminar Specialized Course.

Specifically, testing aims to:

- Confirm the system operates correctly according to requirements specified in PRD and GUI Design documents
- Ensure accuracy, safety, and performance of AI Digital Twin – the project's core feature
- Detect early errors, security vulnerabilities, and UX issues
- Build trust with end users (card owners and visitors)
- Meet quality criteria for smooth and professional demo presentation

### 2.2 Specific Objectives

#### 2.2.1 Functional Testing Objectives

- Verify all primary user flows for Card Owner, Public User, and Admin
- Ensure Profile Builder enables accurate and smooth card creation and editing
- Confirm AI Digital Twin responds correctly according to persona, complies with guardrails, and minimizes hallucination
- Verify inbox storage, management, and real-time functionality of Persona Inbox & Human Takeover
- Ensure QR Code functionality is stable and vCard export follows standards
- Confirm Public Digital Profile displays beautifully, responsively on mobile devices

#### 2.2.2 Non-Functional Testing Objectives

- **Performance**: Page load time < 2 seconds, AI chat response < 3 seconds (average)
- **Compatibility**: Works well on popular browsers and mobile devices (Mobile-first approach)
- **Security**: Ensure safe authentication, protect personal data, and prevent basic attacks (XSS, Prompt Injection)
- **Usability**: Intuitive interface, easy to use, complies with approved GUI Design
- **Reliability**: System handles errors well (fallback when AI fails, real-time synchronization)

#### 2.2.3 AI Digital Twin Specific Objectives

- Response accuracy according to persona ≥ 90%
- AI does not fabricate information (hallucination) and always complies with guardrails
- Human Takeover support functions smoothly
- Handles unusual inputs, toxic content, or prompt injection attempts well

### 2.3 Testing Success Criteria

| Criteria | Target |
|----------|--------|
| **Test Case Pass Rate** | ≥ 95% |
| **Critical & High Bugs** | 0 remaining bugs |
| **AI Response Accuracy** | ≥ 90% |
| **AI Chat Response Time** | ≤ 3 seconds (average) |
| **Lighthouse Score** | ≥ 90 (Performance + SEO + Accessibility) |
| **Feature Coverage Ratio** | 100% of main flows |

---

## 3. Testing Scope

### 3.1 Overall Scope

The testing scope focuses on verifying the quality of all features implemented in the MVP (Minimum Viable Product) version of the Persona-Based Digital Twin Card system.

Testing will comprehensively cover three primary user groups:

- **Card Owner (Chủ thẻ)**
- **Public User / Visitor (Khách truy cập)**
- **Administrator (Quản trị viên)**

### 3.2 In Scope (Features to be Tested)

#### 3.2.1 Card Owner Dashboard Subsystem

- Authentication & Authorization (Login, Register, Google OAuth)
- Profile Builder / Card Editor (create, edit, preview cards)
- AI Digital Twin Configuration (set persona, knowledge base, system prompt)
- QR Code Manager (create, download, manage QR codes)
- Persona Inbox & Human Takeover (view chat history, take over conversation)
- Basic Analytics (view count, interaction metrics)

#### 3.2.2 Public User Subsystem

- Public Digital Profile (display personalized information)
- AI Digital Twin Interaction (real-time chat)
- Save Contact (export vCard / vCard format)
- Fallback Form (contact form when AI is disabled or fails)
- Report Card / Feedback

#### 3.2.3 Landing Page Subsystem

- Project introduction interface and Digital Twin demo
- Navigation and user experience

#### 3.2.4 Admin Panel Subsystem

- User Management
- Violation Report Management (Reported Cards)
- System Overview

#### 3.2.5 Common Features

- Real-time messaging (Firestore)
- Responsive Design (Mobile-first)
- Dark mode & Design System
- Error Handling & Fallback mechanisms

### 3.3 Out of Scope (Features NOT to be Tested)

The following features are **not** in scope for this MVP version:

- Payment / Subscription integration
- Voice Chat with AI
- Upload PDF/DOCX for advanced RAG training
- Real NFC integration
- Advanced eKYC
- Detailed report export (PDF/CSV)
- Multi-language support
- Advanced Admin Template Builder
- Large-scale load testing (thousands of concurrent users)

### 3.4 Acceptance Criteria

A feature is considered "passed" when:

- ≥ 95% of Test Cases for that feature are completed successfully
- No remaining Critical or High severity bugs
- Fully meets requirements specified in PRD and GUI Design
- Meets performance and UX standards as proposed
- AI Digital Twin complies with guardrails and has high accuracy rate responding according to persona

---

## 4. Testing Objects

This chapter lists all objects (modules/features) to be tested within the project scope. Each object is classified by subsystem and testing priority level.

### 4.1 Authentication & Authorization Subsystem

- User registration (Email/Password and Google OAuth)
- Login / Logout
- Forgot password & Change password
- User authorization (Card Owner and Admin roles)
- Protected Routes (Dashboard, Admin Panel)
- Session management & Token expiration

### 4.2 Profile Builder / Card Editor Subsystem

- Create new Digital Card
- Edit personal information (Avatar, Cover, Bio, Contact info)
- Add/Edit/Delete sections: Experience, Skills, Projects, Social Links
- Real-time card Preview
- Save Draft and Publish Card
- Input data validation

### 4.3 AI Digital Twin Configuration Subsystem

- System Prompt configuration
- Knowledge Base management (Persona Data)
- Tone of Voice & Personality settings
- Guardrails & Safety Settings
- Test chat with AI in configuration environment
- Enable/Disable AI Digital Twin

### 4.4 Public Digital Profile Subsystem

- Display card information publicly via Slug/URL
- Responsive on mobile and desktop
- Chat Widget interaction with AI Digital Twin
- Save Contact button (Export vCard)
- Fallback Contact Form
- Report / Feedback form
- 404 Page & Inactive Card handling

### 4.5 QR Code Manager Subsystem

- Generate QR Code for card
- Download QR Code (PNG/SVG)
- Manage multiple QR Codes (if applicable)
- Verify QR Code scan redirects correctly

### 4.6 Persona Inbox & Human Takeover Subsystem

- Display real-time conversation list
- View detailed chat history
- Human Takeover functionality (take over from AI)
- Send message from Inbox
- Mark as Read/Unread
- Filter and search conversations
- Lead capture (potential customers)

### 4.7 Admin Panel Subsystem

- Dashboard overview
- User management (View, Suspend, Delete)
- Violation report management
- View system statistics
- Approve / Reject cards

### 4.8 Common Features & System

- Real-time synchronization (Firestore)
- Error Handling & Fallback mechanisms
- Toast Notifications
- Loading States & Skeleton UI
- Dark Mode consistency
- Accessibility (ARIA labels, Keyboard navigation)
- Performance & Page Load Speed

---

## 5. Testing Strategy

### 5.1 Testing Strategy Overview

The testing strategy for Persona-Based Digital Twin Card system is built on Risk-Based Testing and Mobile-First approach, with strong focus on the quality of AI Digital Twin core feature and user experience.

We combine manual and automated testing at levels appropriate for student project timelines.

### 5.2 Types of Testing to Be Performed

| # | Testing Type | Description | Priority |
|---|---|---|---|
| 1 | **Functional Testing** | Verify features according to PRD requirements | High |
| 2 | **UI/UX Testing** | Verify interface, responsiveness, GUI Design compliance | High |
| 3 | **AI-Specific Testing** | Verify persona accuracy, guardrails, hallucination, RAG | Very High |
| 4 | **Integration Testing** | Test Frontend - Backend - Firebase - AI integration | High |
| 5 | **Real-time Testing** | Test chat sync, inbox, Human Takeover | High |
| 6 | **API Testing** | Test backend APIs (Postman) | Medium |
| 7 | **Performance Testing** | Page load time, AI response time, Lighthouse | Medium |
| 8 | **Security Testing** | XSS, Prompt Injection, Authentication, Authorization | High |
| 9 | **Compatibility Testing** | Browser and mobile device compatibility | Medium |
| 10 | **Usability Testing** | Real user experience | High |

### 5.3 Testing Techniques

- **Black-box Testing**: Primary approach for Functional and UI/UX testing
- **Grey-box Testing**: For integration testing with Database and AI
- **Exploratory Testing**: Strong application for AI Digital Twin (testing unexpected cases)
- **Regression Testing**: Execute after major bug fixes

### 5.4 Test Exit Criteria

- All Critical and High severity Test Cases pass
- No Critical or High bugs remaining
- Test Case Pass Rate ≥ 95%
- AI Accuracy ≥ 90% on test data set
- Performance criteria met (Lighthouse ≥ 90, AI response ≤ 3 seconds average)
- Testing completed on at least 3 different mobile devices

### 5.5 Test Suspension Criteria

- System is inaccessible due to environment or Firebase errors
- Blocker bugs exist affecting primary user flow (e.g., cannot chat with AI)
- AI API call costs are too high (need to optimize prompts before continuing)

### 5.6 AI Digital Twin Testing Approach

- Use diverse Test Scenarios: Normal cases, Edge cases, Adversarial cases (prompt injection, toxic input)
- Compare AI responses with knowledge provided in Knowledge Base
- Verify Guardrails: AI refuses to answer sensitive information, doesn't fabricate experience
- Human Takeover: Verify smooth transition between AI and card owner

---

## 6. Testing Environment

### 6.1 Testing Environment Overview

The testing environment is set up to closely simulate the Production environment while maximally supporting development and automation testing. The system uses Firebase Emulator for local environment and specialized tools to test each application layer.

### 6.2 Hardware & Software Environment

- **Operating Systems**: Windows 11 / macOS / Linux (Ubuntu)
- **Browsers**: Google Chrome (latest), Firefox, Safari
- **Test Devices**:
  - Desktop (1920x1080 and 1366x768 resolutions)
  - Mobile: iPhone 12/13/14, Samsung Galaxy S21/S23 (using Chrome DevTools emulation)
- **Network**: Stable internet connection (including weak network scenarios)

### 6.3 Testing Support Tools

| Tool | Purpose | Version / Notes |
|------|---------|-----------------|
| **Cypress** | E2E Testing, UI/UX Testing, Real-time Testing | v13.x (primary) |
| **Jest** | Unit Testing, Component Testing (React/Next.js) | v29.x |
| **Postman** | API Testing, Collection & Environment Management | Latest version |
| **Lighthouse** | Performance, SEO, Accessibility, Best Practices | Chrome DevTools + Lighthouse CI |
| **Firebase Emulator Suite** | Local testing (Firestore, Auth, Storage) | Official Firebase Tools |
| **React Testing Library** | Component Testing | With Jest integration |
| **Chrome DevTools** | Debugging, Performance Profiling, Responsive testing | Built-in |
| **GitHub** | Version Control & CI/CD (optional) | - |

### 6.4 Primary Tool Usage Details

#### 6.4.1 Cypress

- Used to write and execute E2E Test Cases for all user flows
- Testing priorities:
  - Public Digital Profile + AI Chat flows
  - Profile Builder & Preview
  - Human Takeover
  - Responsive Design on multiple viewports
- Integration with screenshot and video recording on test failures

#### 6.4.2 Jest

- Perform Unit Tests and Component Tests for important Frontend components (Next.js)
- Focus on form handling logic, validation, state management, and utility functions

#### 6.4.3 Postman

- Test all RESTful APIs of the Backend (Node.js + Express)
- Create separate Collections for each module: Auth, Cards, Chat, Inbox, Admin
- Use Environment variables (Local, Staging, Production)
- Verify Response Time, Status Code, Schema Validation

#### 6.4.4 Lighthouse

- Evaluate overall quality of main pages:
  - Landing Page
  - Public Digital Profile
  - Dashboard
- Target criteria: Performance + Accessibility + SEO ≥ 90
- Run periodically after major deployments

### 6.5 Test Data Environment

- Simulated data (Test Accounts, Sample Cards, Sample Knowledge Base)
- Sensitive data is mocked or anonymized
- Separate dataset for testing AI Digital Twin (standard question sets and adversarial inputs)

### 6.6 Environment Configuration

- **Local Development**: `firebase emulators:start`
- **Staging**: Deploy to Firebase Hosting + Functions
- Use `.env.local` for API keys and configuration management

---

## 7. Deliverables

### 7.1 List of Documents to be Delivered

During and after testing completion, the team will produce and deliver the following documents:

| # | Document Name | Description | Status |
|---|---|---|---|
| 1 | **Test Plan** | Overall testing strategy guideline (this document) | Complete |
| 2 | **Test Cases** | Detailed test cases for all functions | In Progress |
| 3 | **Test Execution Report** | Test run results report (Pass/Fail, bug count) | To Be Done |
| 4 | **Bug Report / Defect Log** | List of detected bugs, severity levels, resolution status | To Be Done |
| 5 | **AI Testing Report** | In-depth report on AI Digital Twin testing (Accuracy, Hallucination, Guardrails) | To Be Done |
| 6 | **Lighthouse Reports** | Performance, Accessibility, and SEO reports of main pages | To Be Done |
| 7 | **Test Summary Report** | Final summary report for Seminar presentation | To Be Done |
| 8 | **Test Data** | Test data set (accounts, cards, knowledge base) | Complete |

### 7.2 Document Format and Storage

- All testing documents are managed on Google Drive and GitHub Repository
- Test Cases are written as Excel/Google Sheets tables and Cypress test scripts
- Bug Reports use standard template (Bug ID, Severity, Priority, Steps to Reproduce, Actual Result, Expected Result, Screenshot/Video)
- All reports have version numbers and update dates

### 7.3 Document Quality Standards

- Test Cases must include: Test Case ID, Description, Preconditions, Steps, Expected Result, Actual Result, Status
- Each bug must have clear severity level (Critical, High, Medium, Low)
- Final reports must be easy to understand with charts and illustrative screenshots

### 7.4 Document Approval

All output documents will be internally reviewed by the team and approved by the faculty advisor (TS. Đỗ Như Tài) before use in the Seminar presentation.

---

## 8. Bug Classification & Severity Levels

### 8.1 Severity Levels

| Level | Definition | Example | Impact |
|-------|-----------|---------|--------|
| **Critical** | System crashes, core function completely broken | AI chat endpoint returns 500 error, cannot create card | Blocks testing, prevents demo |
| **High** | Major function broken, significant impact on UX | Login fails intermittently, chat response never arrives | Requires immediate fix |
| **Medium** | Function works with minor issues, affects UX | Minor styling issue, slow loading | Schedule fix in current sprint |
| **Low** | Cosmetic issue, minimal impact | Typo in help text, color slightly off | Can defer to future release |

### 8.2 Priority Levels

- **P1 (Critical)**: Fix immediately
- **P2 (High)**: Fix before milestone release
- **P3 (Medium)**: Fix in current sprint
- **P4 (Low)**: Fix when time permits

---

## 9. Test Timeline

### 9.1 Testing Phases

| Phase | Duration | Activities | Deliverable |
|-------|----------|-----------|-------------|
| **Phase 1: Planning & Preparation** | Week 1-2 | Test case design, environment setup, tool configuration | Test Cases document |
| **Phase 2: Functional Testing** | Week 3-4 | Execute functional test cases, log bugs | Bug Report v1 |
| **Phase 3: Integration Testing** | Week 4-5 | Integration & real-time testing, AI-specific testing | Integration Test Report |
| **Phase 4: Performance & Security** | Week 5-6 | Lighthouse analysis, security testing, compatibility | Performance Report |
| **Phase 5: Regression & Final Testing** | Week 6-7 | Bug fix verification, regression testing, final QA | Test Execution Report |
| **Phase 6: Test Summary & Demo** | Week 7-8 | Prepare test summary report, final demo | Test Summary Report |

---

## 10. Roles & Responsibilities

| Role | Responsibilities |
|------|-----------------|
| **QA Lead** | Overall testing strategy, test planning, risk assessment |
| **Test Automation Engineer** | Create and maintain Cypress E2E tests and Jest unit tests |
| **Functional Tester** | Design and execute manual test cases, explore edge cases |
| **AI Tester** | Specialized testing for AI Digital Twin (accuracy, guardrails, adversarial cases) |
| **Performance Tester** | Lighthouse analysis, load testing, performance optimization |
| **DevOps/Environment Support** | Setup and maintain testing environments, Firebase Emulator |

---

## 11. Appendix

### 11.1 Sample Test Case Template

```
Test Case ID: TC_001
Title: User Registration with Email
Priority: High
Preconditions: User is on Registration page
Steps:
  1. Enter valid email address
  2. Enter strong password
  3. Click Register button
Expected Result: User account created, redirected to Dashboard
Actual Result: [To be filled during testing]
Status: [Pass/Fail/Blocked]
```

### 11.2 Sample Bug Report Template

```
Bug ID: BUG_001
Title: AI Chat returns empty response
Severity: High
Priority: P1
Steps to Reproduce:
  1. Go to public digital profile
  2. Send chat message to AI
  3. Wait for response
Expected Result: AI returns relevant response within 3 seconds
Actual Result: Empty response or timeout error
Environment: Chrome 120, Windows 11
Screenshot: [Attached]
Status: Open
```

### 11.3 Key Performance Indicators (KPIs)

- **Test Coverage**: ≥ 95% of features
- **Test Execution Rate**: ≥ 80% of planned test cases executed
- **Defect Detection Rate**: Critical & High bugs detected before production
- **Test Effectiveness**: Bug escape rate < 5%

---

**Document Version**: 1.0  
**Last Updated**: 2026  
**Status**: Active ✅

*This document serves as the testing guide for all QA activities. Any changes to the testing strategy must be reflected here immediately.*
