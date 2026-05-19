'use client';

import MemberCard from './member-card';

const MEMBERS = [
  {
    name: 'Châu Gia Anh',
    role: 'Lãnh đạo - Fullstack / Designer',
    description:
      "Là lực đẩy chính đứng sau nhóm, Châu Gia Anh kết hợp tầm nhìn lãnh đạo với chuyên môn kỹ thuật sâu. Ngoài vai trò lãnh đạo, cô còn là cầu nối giữa thiết kế và phát triển, tạo ra các giải pháp tập trung vào người dùng vừa đẹp vừa chức năng. Tư duy chiến lược và kỹ năng thực thi của cô giữ nhóm tập trung và vượt qua giới hạn.",
    imageSrc: '/team_members/cga.png',
    meetLabel: 'Gặp Tâm',
  },
  {
    name: 'Đào Thị Thanh Tâm',
    role: 'Thành viên - Business Analyst / Tester',
    description:
      "Tim là trái tim của quy trình làm việc của chúng tôi, đảm bảo mọi khía cạnh được phân tích và kiểm tra một cách chính xác. Mắt tinh tế của cô bắt được các vấn đề trước khi chúng trở thành vấn đề, trong khi tư duy phân tích giúp định hình hướng sản phẩm. Cô là cầu nối giữa nhu cầu kinh doanh và triển khai kỹ thuật, đảm bảo sản phẩm không chỉ hoạt động mà còn mang lại giá trị thực.",
    imageSrc: '/team_members/mun.jpeg',
    meetLabel: 'Gặp Khánh',
  },
  {
    name: 'Dương Lê Khánh',
    role: 'Thành viên - Fullstack',
    description:
      "Khánh là một Fullstack Developer năng động và linh hoạt cao, đóng vai trò là xương sống kỹ thuật. Với chuyên môn sâu trên toàn bộ tech stack, anh xây dựng liền mạch từ cơ sở dữ liệu đến giao diện người dùng, liên tục cải thiện các tiêu chuẩn kỹ thuật và giải quyết mọi thách thức phía trước.",
    imageSrc: '/team_members/khanh.jpeg',
    meetLabel: 'Gặp Đại',
  },
  {
    name: 'Phan Thành Đại',
    role: 'Thành viên - AI Engineer',
    description:
      "Đại là nguồn lực kỹ thuật của nhóm, chuyên về các hệ thống AI. Anh mang đến các giải pháp tiên tiến và khám phá những đổi mới vượt qua ranh giới của những gì có thể. Chuyên môn của anh trong phát triển và triển khai các hệ thống AI lấp đầy một khoảng trống quan trọng trong công nghệ đồng thời giữ chúng tôi dẫn đầu.",
    imageSrc: '/team_members/D.jpeg',
    meetLabel: 'Gặp Đại',
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
