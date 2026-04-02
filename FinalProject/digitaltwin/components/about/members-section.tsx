'use client';

import MemberCard from './member-card';

const MEMBERS = [
  {
    name: 'Châu Gia Anh',
    role: 'Leader - Fullstack / Designer',
    description:
      "As the driving force behind the team, Châu Gia Anh combines visionary leadership with deep technical expertise. Beyond her leadership role, she bridges the gap between design and development, crafting user-centric solutions that are as beautiful as they are functional. Her strategic thinking and execution skills keep the team focused and pushing boundaries.",
    imageSrc: '/team_members/cga.png',
    meetLabel: 'Meet Tâm',
  },
  {
    name: 'Đào Thị Thanh Tâm',
    role: 'Member - Business Analyst / Tester',
    description:
      "The heart of our workflows, Tâm ensures every aspect is analyzed and tested with precision. Her keen eye for detail catches issues before they become problems, while her analytical mindset helps shape product direction. She bridges business needs with technical implementation, making sure products not only work but deliver real value.",
    imageSrc: '/team_members/mun.jpeg',
    meetLabel: 'Meet Khánh',
  },
  {
    name: 'Dương Lê Khánh',
    role: 'Member - Fullstack',
    description:
      "Khánh is a dynamic and highly versatile Fullstack Developer who serves as the technical backbone. With deep expertise across the entire tech stack, he seamlessly builds from database to user interface, constantly improving technical standards and tackling any challenge that comes his way.",
    imageSrc: '/team_members/khanh.jpeg',
    meetLabel: 'Meet Đại',
  },
  {
    name: 'Phan Thành Đại',
    role: 'Member - AI Engineer',
    description:
      "Đại is the technical powerhouse of the team, specializing in AI systems. He brings cutting-edge solutions and explores innovations that push the boundaries of what's possible. His expertise in developing and deploying AI systems fills a critical gap in technology while keeping us ahead of the curve.",
    imageSrc: '/team_members/D.jpeg',
    meetLabel: 'Meet Đại',
  },
];

export default function MembersSection() {
  const handleMeetClick = (nextIndex: number) => {
    const targetCard = document.querySelector(
      `.member-card:nth-child(${nextIndex + 1})`
    );
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="bg-[#000000]">
      {MEMBERS.map((member, index) => (
        <MemberCard
          key={member.name}
          {...member}
          reversed={index % 2 === 0}
          showButton={index < 3}
          onMeetClick={() => handleMeetClick(index + 1)}
        />
      ))}
    </section>
  );
}
