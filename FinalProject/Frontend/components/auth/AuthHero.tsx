import Image from 'next/image';

export function AuthHero() {
  return (
    <div className="max-w-xl mx-auto w-full h-full flex flex-col justify-center">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight mb-6">
          CHÀO MỪNG BẠN TRỞ LẠI VỚI DIGITAL TWIN
        </h1>
        <p className="text-[#B7B7B7] text-lg leading-relaxed max-w-md">
          Quản lý thẻ cá nhân số và AI Persona của bạn trong một không gian duy nhất.
        </p>
      </div>
      
      <div className="relative w-full aspect-square max-h-[500px] rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(35,103,162,0.15)] border border-white/5">
        <Image
          src="/login/ai.jpg"
          alt="AI Digital Twin"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient for better blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>
    </div>
  );
}
