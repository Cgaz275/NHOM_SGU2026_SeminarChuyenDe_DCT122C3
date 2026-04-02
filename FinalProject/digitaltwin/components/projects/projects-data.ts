export interface Project {
  id: string;
  title: string;
  dateRange: string;
  description: string;
  image: string;
  tags: string[];
  projectUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'workshop-copilot',
    title: 'Workshop Copilot',
    dateRange: '01.2026 - 02.2026',
    description:
      'This project explores GitHub Copilot through the Vibe Coding approach, including environment setup, Python backend, JavaScript frontend, and migration to Java and .NET. The team also implemented containerization and produced structured reports for each module. The outcome demonstrates a multi-stack development workflow and highlights how AI tools can effectively support modern software engineering practices.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fc29dcdfcda6a4875a39e63b4c04309e52fb1916?width=320',
    tags: ['PYTHON'],
    projectUrl:
      'https://github.com/Cgaz275/NHOM_SGU2026_SeminarChuyenDe_DCT122C3/tree/main/Exercises/Week1_WorkshopCopilot',
  },
  {
    id: 'n8n',
    title: 'N8N',
    dateRange: '03.2026 - 03.2026',
    description:
      'This project focuses on learning n8n/dify for building AI agents to automate personal workflows. The system was deployed using Docker and included use cases such as a Telegram chatbot for movie recommendations and cinema selection. The result provides practical insight into integrating AI with automation tools to improve efficiency in real-world scenarios.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fc29dcdfcda6a4875a39e63b4c04309e52fb1916?width=320',
    tags: ['PYTHON', 'N8N', 'DIFY.AI'],
    projectUrl:
      'https://github.com/Cgaz275/NHOM_SGU2026_SeminarChuyenDe_DCT122C3/tree/main/Exercises/Week2_N8N',
  },
  {
    id: 'genai-intro',
    title: 'Cơ sở lập trình với GenAI',
    dateRange: '03.2026 - 03.2026',
    description:
      'This project covers the fundamentals of programming with GenAI, including how LLMs work, basic prompt engineering, and code understanding. The team completed multiple labs and summarized key concepts from the reference materials. The outcome strengthens the ability to leverage AI tools for assisting coding tasks and improving development productivity.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fc29dcdfcda6a4875a39e63b4c04309e52fb1916?width=320',
    tags: ['PYTHON', 'GENAI'],
    projectUrl:
      'https://github.com/Cgaz275/NHOM_SGU2026_SeminarChuyenDe_DCT122C3/tree/main/Exercises/Week05_C%C6%A1%20s%E1%BB%9F%20l%E1%BA%ADp%20tr%C3%ACnh%20v%E1%BB%9Bi%20GenAI',
  },
  {
    id: 'genai-advanced',
    title: 'Nâng cao lập trình với GenAI',
    dateRange: '03.2026 - 03.2026',
    description:
      'This project extends GenAI knowledge with advanced techniques such as prompt engineering, code refactoring, and model fine-tuning. The team conducted hands-on labs and explored how LLMs can optimize complex programming tasks. The result demonstrates the ability to apply AI effectively in more advanced and practical development scenarios.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fc29dcdfcda6a4875a39e63b4c04309e52fb1916?width=320',
    tags: ['PYTHON', 'GENAI'],
    projectUrl:
      'https://github.com/Cgaz275/NHOM_SGU2026_SeminarChuyenDe_DCT122C3/tree/main/Exercises/Week06_N%C3%A2ng%20cao%20l%E1%BA%ADp%20tr%C3%ACnh%20v%E1%BB%9Bi%20GenAI',
  },
  {
    id: 'genai-product',
    title: 'Xây dựng sản phẩm phần mềm dùng GenAI',
    dateRange: '03.2026 - 03.2026',
    description:
      'This project focuses on integrating GenAI into the full software development lifecycle, including documentation, unit testing, monitoring, and logging. The team explored system design and runtime optimization using AI. The outcome reflects a shift from coding to building production-ready systems enhanced by AI capabilities.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fc29dcdfcda6a4875a39e63b4c04309e52fb1916?width=320',
    tags: ['PYTHON', 'GENAI'],
    projectUrl:
      'https://github.com/Cgaz275/NHOM_SGU2026_SeminarChuyenDe_DCT122C3/tree/main/Exercises/Week07_X%C3%A2y%20d%E1%BB%B1ng%20s%E1%BA%A3n%20ph%E1%BA%A9m%20ph%E1%BA%A7n%20m%E1%BB%81m%20d%C3%B9ng%20GenAI',
  },
  {
    id: 'ai-digital-twin',
    title: 'PERSONAL WEBSITE WITH AN AI DIGITAL TWIN',
    dateRange: '04.2026 - 04.2026',
    description:
      'This project involves creating a personal website enhanced with an AI digital twin. The digital twin serves as a virtual representation of the user, interacting with visitors and providing personalized experiences. The implementation includes natural language processing and machine learning techniques to enable intelligent interactions.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fc29dcdfcda6a4875a39e63b4c04309e52fb1916?width=320',
    tags: ['PYTHON', 'GENAI'],
    projectUrl:
      'https://github.com/Cgaz275/NHOM_SGU2026_SeminarChuyenDe_DCT122C3/tree/main/FinalProject/digitaltwin',
  },
];
