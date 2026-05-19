# Rebuild trang Cấu hình AI Digital Twin

Bạn là một senior frontend engineer và UI/UX designer.

Tiếp tục làm việc bên trong project Next.js 15 App Router hiện có.

## Yêu cầu quan trọng

Sử dụng đúng casing của thư mục frontend hiện tại. Không tạo thêm thư mục trùng lặp như `Frontend` hoặc `FrontEnd`.

Không được làm hỏng các route hiện có:

- `/u/[username]`
- `/dashboard/profile-builder`
- `/dashboard/qr-manager`
- `/dashboard/inbox`
- `/login`
- `/register`

## Nhiệm vụ

Rebuild trang `/dashboard/ai-twin` dựa trên screenshot đã cung cấp.

Đây là trang cấu hình AI Digital Twin dành cho chủ thẻ.

Mục tiêu là dựng lại giao diện dashboard tối hiện tại, đồng thời chuyển toàn bộ text hiển thị trên UI sang tiếng Việt.

## Route

```txt
/dashboard/ai-twin
```

## Yêu cầu ngôn ngữ

Toàn bộ text hiển thị trên giao diện phải là tiếng Việt.

Code, tên component, tên biến, tên file có thể giữ tiếng Anh.

## Phạm vi backend

Không implement logic backend thật.

Chỉ dùng mock data và local React state.

Không kết nối database, authentication, AI API, upload file, huấn luyện AI thật, hoặc bất kỳ logic backend thật nào.

## Định hướng giao diện

Làm sát screenshot nhất có thể:

- Dashboard full-screen nền tối
- Sidebar bên trái có logo SEMINAR
- Sidebar items:
  - Manage Profile
  - Manage Persona
  - Manage QR
  - Manage Messages
- Main content ở bên phải
- Có tiêu đề trang và mô tả ngắn
- Có 2 tab:
  - Persona
  - Knowledge Base
- Card bo góc nền tối
- Border mỏng
- Active state màu xanh
- Input nền tối
- Giao diện dashboard tối giản, sạch, hiện đại

## Dịch sidebar sang tiếng Việt

- Manage Profile → Quản lý hồ sơ
- Manage Persona → Quản lý Persona
- Manage QR → Quản lý QR
- Manage Messages → Quản lý tin nhắn

Sidebar item đang active:

```txt
Quản lý Persona
```

## Header trang

Title:

```txt
Cấu hình AI Digital Twin
```

Subtitle:

```txt
Cấu hình cách trợ lý AI giới thiệu, phản hồi và sử dụng thông tin cá nhân của bạn.
```

## Tabs

Có 2 tab:

1. `Persona`
2. `Kho kiến thức`

Active tab dùng màu xanh và underline xanh.

---

# Tab 1: Persona

Tab này gồm 2 card chính.

## Card 1: Danh tính AI

Title:

```txt
Danh tính AI
```

Description:

```txt
Cấu hình cách AI giới thiệu bản thân với người truy cập.
```

### Field 1: Tên hiển thị công khai của AI

Label:

```txt
Tên hiển thị công khai của AI
```

Default value:

```txt
AI Twin của Anthony
```

Bind với field:

```ts
config.aiDisplayName
```

### Field 2: Tin nhắn chào mặc định

Label:

```txt
Tin nhắn chào mặc định
```

Default value:

```txt
Xin chào, tôi là AI Twin của Anthony. Bạn có thể hỏi tôi về kỹ năng, dự án, kinh nghiệm hoặc khả năng hợp tác.
```

Bind với field:

```ts
config.greetingMessage
```

## Card 2: Tính cách AI

Title:

```txt
Tính cách AI
```

Description:

```txt
Chọn phong cách phản hồi chính của trợ lý AI.
```

Tone options hiển thị trên UI:

- Chuyên nghiệp
- Thân thiện
- Ngắn gọn
- Chi tiết
- Kỹ thuật
- Tự tin
- Khiêm tốn

Mapping value trong code:

```ts
const toneOptions = [
  { label: 'Chuyên nghiệp', value: 'chuyenghiep' },
  { label: 'Thân thiện', value: 'thanthien' },
  { label: 'Ngắn gọn', value: 'ngangon' },
  { label: 'Chi tiết', value: 'chitiet' },
  { label: 'Kỹ thuật', value: 'kythuat' },
  { label: 'Tự tin', value: 'tutin' },
  { label: 'Khiêm tốn', value: 'khiemton' }
];
```

Behavior:

- User có thể chọn 1 tone.
- Tone đang được chọn phải có border/background accent màu xanh.
- Tone đang được chọn có check icon.
- Default selected tone: `chuyenghiep`.

---

# Tab 2: Kho kiến thức

Tab này gồm 4 card chính:

1. Kỹ năng
2. Kinh nghiệm
3. Dự án
4. Dịch vụ

Không render FAQ trong UI hiện tại.

Tuy nhiên, trong type và mock data vẫn phải giữ `faqs: []` để đúng shape `KnowledgeBase` đầy đủ.

## Card 1: Kỹ năng

Title:

```txt
Kỹ năng
```

Add button:

```txt
Thêm kỹ năng
```

Empty state:

```txt
Chưa có kỹ năng nào được thêm.
```

Example existing item:

```txt
React.js
```

Actions:

- Edit icon
- Delete icon

List item cần dùng field:

```ts
id
name
level
description
```

Ghi chú: UI list có thể chỉ hiển thị `name`, nhưng modal edit vẫn cần đủ `level` và `description`.

## Card 2: Kinh nghiệm

Title:

```txt
Kinh nghiệm
```

Add button:

```txt
Thêm kinh nghiệm
```

Empty state:

```txt
Chưa có kinh nghiệm nào được thêm.
```

Actions:

- Edit icon
- Delete icon

List item cần dùng field:

```ts
id
companyName
role
startDate
endDate
description
```

## Card 3: Dự án

Title:

```txt
Dự án
```

Add button:

```txt
Thêm dự án
```

Empty state:

```txt
Chưa có dự án nào được thêm.
```

Actions:

- Edit icon
- Delete icon

List item cần dùng field:

```ts
id
projectName
startDate
endDate
description
projectUrl
tags
```

`tags` bắt buộc là `string[]`.

## Card 4: Dịch vụ

Title:

```txt
Dịch vụ
```

Add button:

```txt
Thêm dịch vụ
```

Empty state:

```txt
Chưa có dịch vụ nào được thêm.
```

Actions:

- Edit icon
- Delete icon

List item cần dùng field:

```ts
id
serviceName
description
pricingNote
callToAction
```

---

# Chỉ implement các section visible trong screenshot

Chỉ render các phần sau trên UI:

- Persona tab
- Knowledge Base tab
- AI Identity card
- AI Personality card
- Skills card
- Experience card
- Projects card
- Services card

## Không implement các phần sau

Không implement:

- Prompt Rules
- Guardrails UI
- Test Chat
- Publish AI
- Train AI
- AI status bar
- FAQ section
- PDF upload
- DOCX upload
- RAG upload
- Real AI API
- Real database
- Real backend
- Voice chat
- Payment
- Booking
- NFC integration

## Lưu ý quan trọng về type và mock data

UI chỉ render các section visible ở trên.

Tuy nhiên, mock data và TypeScript types vẫn phải giữ shape đầy đủ của `AITwinConfig`, bao gồm:

- `systemPrompt`
- `guardrails`
- `status`
- `isPublicEnabled`
- `lastTrainedAt`
- `updatedAt`
- `knowledgeBase.faqs`

Các field này không cần render ra UI trong task hiện tại. Chúng chỉ tồn tại để giữ tương thích với state và cấu trúc AI Twin hiện có.

---

# Add/Edit behavior

Dùng modal form đơn giản để thêm và chỉnh sửa item.

## Add Skill Modal

Title khi thêm:

```txt
Thêm kỹ năng
```

Title khi sửa:

```txt
Chỉnh sửa kỹ năng
```

Fields:

- Tên kỹ năng
- Trình độ
- Mô tả

Level options:

- Sơ cấp → `Beginner`
- Trung cấp → `Intermediate`
- Cao cấp → `Advanced`
- Chuyên gia → `Expert`

Buttons:

- Hủy
- Lưu

Submit payload:

```ts
{
  name: string,
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
  description: string
}
```

## Add Experience Modal

Title khi thêm:

```txt
Thêm kinh nghiệm
```

Title khi sửa:

```txt
Chỉnh sửa kinh nghiệm
```

Fields:

- Tên công ty
- Vai trò
- Ngày bắt đầu
- Ngày kết thúc
- Mô tả

Dùng date input cho ngày bắt đầu và ngày kết thúc.

Lưu date dưới dạng string format:

```txt
YYYY-MM-DD
```

Buttons:

- Hủy
- Lưu

Submit payload:

```ts
{
  companyName: string,
  role: string,
  startDate: string,
  endDate: string,
  description: string
}
```

## Add Project Modal

Title khi thêm:

```txt
Thêm dự án
```

Title khi sửa:

```txt
Chỉnh sửa dự án
```

Fields:

- Tên dự án
- Ngày bắt đầu
- Ngày kết thúc
- Mô tả
- Liên kết dự án
- Thẻ

Với field Thẻ:

- Dùng input phân tách bằng dấu phẩy.
- Convert input thành `string[]`.
- Ví dụ: `React, Node.js, AI` thành `['React', 'Node.js', 'AI']`.

Buttons:

- Hủy
- Lưu

Submit payload:

```ts
{
  projectName: string,
  startDate: string,
  endDate: string,
  description: string,
  projectUrl?: string,
  tags: string[]
}
```

## Add Service Modal

Title khi thêm:

```txt
Thêm dịch vụ
```

Title khi sửa:

```txt
Chỉnh sửa dịch vụ
```

Fields:

- Tên dịch vụ
- Mô tả
- Ghi chú giá
- Lời kêu gọi hành động

Default call to action:

```txt
Liên hệ với tôi để biết thêm chi tiết
```

Buttons:

- Hủy
- Lưu

Submit payload:

```ts
{
  serviceName: string,
  description: string,
  pricingNote?: string,
  callToAction: string
}
```

---

# Delete behavior

Delete có thể dùng confirmation modal đơn giản.

## Delete confirmation modal

Title:

```txt
Xóa mục này?
```

Message:

```txt
Hành động này không thể hoàn tác.
```

Buttons:

- Hủy
- Xóa

---

# Toast messages

Dùng toast tiếng Việt:

- `Đã lưu thay đổi.`
- `Đã thêm thành công.`
- `Đã cập nhật thành công.`
- `Đã xóa thành công.`
- `Tải cấu hình AI thất bại.`
- `Lưu cấu hình thất bại.`

---

# Suggested file structure

```txt
app/dashboard/ai-twin/page.tsx
components/dashboard/DashboardSidebar.tsx
components/ai-twin/AITwinConfigPage.tsx
components/ai-twin/AITwinTabs.tsx
components/ai-twin/PersonaSection.tsx
components/ai-twin/ToneSelector.tsx
components/ai-twin/KnowledgeBaseSection.tsx
components/ai-twin/KnowledgeCard.tsx
components/ai-twin/KnowledgeItemModal.tsx
components/ai-twin/ConfirmDeleteModal.tsx
components/ui/Toast.tsx
types/ai-twin.ts
lib/mock-ai-twin-api.ts
```

Có thể tái sử dụng component UI hiện có nếu project đã có sẵn.

Không tạo component trùng lặp nếu component tương đương đã tồn tại.

---

# Types

Create or update:

```txt
types/ai-twin.ts
```

Dùng đúng shape sau để UI state, modal, list và mock API đồng bộ với nhau.

```ts
export type ToneOption =
  | 'chuyenghiep'
  | 'thanthien'
  | 'ngangon'
  | 'chitiet'
  | 'kythuat'
  | 'tutin'
  | 'khiemton';

export type AITwinStatus =
  | 'AI Draft'
  | 'AI Training'
  | 'AI Ready'
  | 'AI Error'
  | 'AI Disabled'
  | 'Prompt Too Long';

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  description: string;
}

export interface ExperienceItem {
  id: string;
  companyName: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  projectName: string;
  startDate: string;
  endDate: string;
  description: string;
  projectUrl?: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  serviceName: string;
  description: string;
  pricingNote?: string;
  callToAction: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface KnowledgeBase {
  skills: SkillItem[];
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  faqs: FAQItem[];
}

export type KnowledgeItemType =
  | 'skill'
  | 'experience'
  | 'project'
  | 'service'
  | 'faq';

export interface GuardrailSettings {
  noMadeUpInfo: boolean;
  noExactPrices: boolean;
  alwaysIntroduceAsAI: boolean;
  askForContactInfo: boolean;
  refuseUnsafeRequests: boolean;
  noPrivateSystemPrompt: boolean;
  noPrivateContactInfo: boolean;
}

export interface SystemPromptConfig {
  tone: ToneOption;
  greetingMessage: string;
  aiDisplayName: string;
  systemPrompt: string;
}

export interface AITwinConfig extends SystemPromptConfig {
  id: string;
  ownerName: string;
  knowledgeBase: KnowledgeBase;
  guardrails: GuardrailSettings;
  status: AITwinStatus;
  isPublicEnabled: boolean;
  lastTrainedAt?: string;
  updatedAt: string;
}

export interface TestChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AITwinValidationError {
  field: string;
  message: string;
}
```

---

# Mock API

Create or update:

```txt
lib/mock-ai-twin-api.ts
```

Chỉ dùng local in-memory mock data.

Không kết nối backend, database, authentication, OpenAI API hoặc logic training thật.

Export các Promise-based mock functions:

- `getAITwinConfig()`
- `saveAITwinConfig(config)`
- `addKnowledgeItem(type, item)`
- `updateKnowledgeItem(type, itemId, item)`
- `deleteKnowledgeItem(type, itemId)`

## Mock config chuẩn

Mock config phải follow đầy đủ shape `AITwinConfig`:

```ts
import {
  AITwinConfig,
  KnowledgeBase,
  KnowledgeItemType
} from '@/types/ai-twin';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

let mockAITwinConfig: AITwinConfig = {
  id: 'ai-twin-001',
  ownerName: 'Anthony',

  aiDisplayName: 'AI Twin của Anthony',
  greetingMessage:
    'Xin chào, tôi là AI Twin của Anthony. Bạn có thể hỏi tôi về kỹ năng, dự án, kinh nghiệm hoặc khả năng hợp tác.',
  tone: 'chuyenghiep',
  systemPrompt:
    'Bạn là AI Digital Twin đại diện cho Anthony. Chỉ trả lời dựa trên thông tin đã được cung cấp trong kho kiến thức.',

  knowledgeBase: {
    skills: [
      {
        id: 'skill-001',
        name: 'React.js',
        level: 'Advanced',
        description:
          'Có kinh nghiệm xây dựng giao diện web hiện đại bằng React.js, component-based UI và state management.'
      }
    ],
    experiences: [
      {
        id: 'exp-001',
        companyName: 'Công ty A',
        role: 'Frontend Developer',
        startDate: '2025-01-01',
        endDate: '2025-06-01',
        description:
          'Tham gia phát triển dashboard, tối ưu trải nghiệm người dùng và tích hợp giao diện với mock API.'
      }
    ],
    projects: [
      {
        id: 'project-001',
        projectName: 'Personal Digital Card',
        startDate: '2025-08-01',
        endDate: '2025-12-01',
        description:
          'Nền tảng hồ sơ cá nhân công khai tích hợp AI Digital Twin để hỗ trợ khách truy cập tìm hiểu thông tin.',
        projectUrl: 'https://example.com',
        tags: ['Next.js', 'React', 'AI', 'Digital Twin']
      }
    ],
    services: [
      {
        id: 'service-001',
        serviceName: 'Thiết kế landing page',
        description:
          'Thiết kế và phát triển landing page hiện đại, responsive, phù hợp cho portfolio hoặc sản phẩm cá nhân.',
        pricingNote: '500000',
        callToAction: 'Liên hệ với tôi để trao đổi yêu cầu cụ thể'
      }
    ],
    faqs: []
  },

  guardrails: {
    noMadeUpInfo: true,
    noExactPrices: true,
    alwaysIntroduceAsAI: true,
    askForContactInfo: true,
    refuseUnsafeRequests: true,
    noPrivateSystemPrompt: true,
    noPrivateContactInfo: true
  },

  status: 'AI Draft',
  isPublicEnabled: false,
  lastTrainedAt: undefined,
  updatedAt: new Date().toISOString()
};

const knowledgeKeyMap: Record<KnowledgeItemType, keyof KnowledgeBase> = {
  skill: 'skills',
  experience: 'experiences',
  project: 'projects',
  service: 'services',
  faq: 'faqs'
};

const cloneConfig = () => structuredClone(mockAITwinConfig);

export async function getAITwinConfig(): Promise<AITwinConfig> {
  await delay();
  return cloneConfig();
}

export async function saveAITwinConfig(config: AITwinConfig): Promise<AITwinConfig> {
  await delay();
  mockAITwinConfig = {
    ...config,
    updatedAt: new Date().toISOString()
  };
  return cloneConfig();
}

export async function addKnowledgeItem(
  type: KnowledgeItemType,
  item: any
): Promise<AITwinConfig> {
  await delay();

  const key = knowledgeKeyMap[type];
  const newItem = {
    ...item,
    id: `${type}-${Date.now()}`
  };

  mockAITwinConfig = {
    ...mockAITwinConfig,
    knowledgeBase: {
      ...mockAITwinConfig.knowledgeBase,
      [key]: [...mockAITwinConfig.knowledgeBase[key], newItem]
    },
    updatedAt: new Date().toISOString()
  };

  return cloneConfig();
}

export async function updateKnowledgeItem(
  type: KnowledgeItemType,
  itemId: string,
  item: any
): Promise<AITwinConfig> {
  await delay();

  const key = knowledgeKeyMap[type];

  mockAITwinConfig = {
    ...mockAITwinConfig,
    knowledgeBase: {
      ...mockAITwinConfig.knowledgeBase,
      [key]: mockAITwinConfig.knowledgeBase[key].map(existingItem =>
        existingItem.id === itemId
          ? { ...existingItem, ...item, id: itemId }
          : existingItem
      )
    },
    updatedAt: new Date().toISOString()
  };

  return cloneConfig();
}

export async function deleteKnowledgeItem(
  type: KnowledgeItemType,
  itemId: string
): Promise<AITwinConfig> {
  await delay();

  const key = knowledgeKeyMap[type];

  mockAITwinConfig = {
    ...mockAITwinConfig,
    knowledgeBase: {
      ...mockAITwinConfig.knowledgeBase,
      [key]: mockAITwinConfig.knowledgeBase[key].filter(
        existingItem => existingItem.id !== itemId
      )
    },
    updatedAt: new Date().toISOString()
  };

  return cloneConfig();
}
```

## Mock API rules

- Dùng artificial delay.
- Không tạo random error.
- Mock API phải đơn giản, dễ thay bằng API thật sau này.
- Sau mỗi lần save/add/update/delete, luôn update `updatedAt`.
- Khi add knowledge item, tạo id đơn giản như `${type}-${Date.now()}`.
- UI dùng singular `KnowledgeItemType`, còn `knowledgeBase` dùng plural array keys.
- Bắt buộc map như sau:

```ts
const knowledgeKeyMap: Record<KnowledgeItemType, keyof KnowledgeBase> = {
  skill: 'skills',
  experience: 'experiences',
  project: 'projects',
  service: 'services',
  faq: 'faqs'
};
```

---

# Layout details

## Desktop

- Sidebar width khoảng `220px`.
- Main content căn giữa với max-width khoảng `900px` đến `1000px`.
- Spacing gần giống screenshot.
- Card nền tối, bo góc, border nhẹ.
- Input nền tối, text sáng.
- Active tab dùng text xanh và underline xanh.

## Mobile

- Sidebar collapse hoặc chuyển thành top navigation.
- Main content có padding hợp lý.
- Cards stack dọc.
- Modal responsive.

---

# Manual verification checklist

Sau khi implementation, tôi phải có thể:

1. Mở `/dashboard/ai-twin`.
2. Thấy dark dashboard layout.
3. Thấy sidebar tiếng Việt.
4. Thấy `Quản lý Persona` là sidebar item active.
5. Thấy title và subtitle tiếng Việt.
6. Chuyển qua lại giữa `Persona` và `Kho kiến thức`.
7. Sửa tên hiển thị công khai của AI.
8. Sửa tin nhắn chào mặc định.
9. Chọn tone AI.
10. Thấy tone đang chọn được highlight màu xanh.
11. Thấy các section Knowledge Base:
    - Kỹ năng
    - Kinh nghiệm
    - Dự án
    - Dịch vụ
12. Add, edit, delete kỹ năng.
13. Add, edit, delete kinh nghiệm.
14. Add, edit, delete dự án.
15. Add, edit, delete dịch vụ.
16. Thấy empty state tiếng Việt.
17. Thấy toast message tiếng Việt.
18. Kiểm tra mobile layout không bị vỡ.
19. Kiểm tra mock data có đủ full `AITwinConfig` shape.
20. Kiểm tra `knowledgeBase.faqs` tồn tại dù FAQ không render.
21. Kiểm tra add/update/delete dùng đúng mapping singular type sang plural key.

---

# Final notes

Giữ implementation thực tế, gọn, và sát screenshot.

Không overbuild ngoài những gì xuất hiện trong screenshot.

Không nối API thật.

Không tự ý thêm tính năng ngoài phạm vi.

Ưu tiên code rõ ràng, dễ thay mock API bằng API thật sau này.
