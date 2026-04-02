interface MemberCardProps {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  meetLabel: string;
  reversed?: boolean;
  showButton?: boolean;
  onMeetClick?: () => void;
}

export default function MemberCard({
  name,
  role,
  description,
  imageSrc,
  meetLabel,
  reversed = false,
  showButton = true,
  onMeetClick,
}: MemberCardProps) {
  return (
    <div className={`member-card ${reversed ? 'reversed' : ''}`}>
      <div className="member-card-photo">
        <img src={imageSrc} alt={name} />
      </div>
      <div className="member-card-body">
        <h3 className="member-card-name">{name}</h3>
        <p className="member-card-role">{role}</p>
        <p className="member-card-description">{description}</p>
        {showButton && (
          <button className="meet-btn" onClick={onMeetClick}>
            {meetLabel}
            <span className="meet-btn-icon">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
