import BinaryMatrix from './binary-matrix';

export default function TeamIntro() {
  return (
    <section className="about-split-panel">
      <div className="about-split-panel-left">
        <BinaryMatrix />
      </div>
      <div className="about-split-panel-right">
        <div className="about-intro-text">
          <h2 className="intro-kicker">Những Nhân Viên</h2>
          <h3 className="intro-highlight">Có Kinh Nghiệm Nhất</h3>
          <h2 className="intro-secondary">Của Nhóm</h2>
          <p className="intro-description">
            Nhóm của chúng tôi là một động lực của những chuyên gia có kỹ năng cao, mỗi người là thạo nhân trong lĩnh vực của họ. Mặc dù chúng tôi duy trì quy mô nhỏ gọn, sức mạnh của chúng tôi nằm ở sự nhanh nhẹn và độ chính xác. Chúng tôi tự hào về cách tiếp cận tỉ mỉ với mọi chi tiết, đảm bảo rằng 'nhỏ' không bao giờ có nghĩa là thỏa hiệp về chất lượng hoặc tốc độ.
          </p>
        </div>
      </div>
    </section>
  );
}
