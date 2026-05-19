"use client";

import { useState, useRef } from "react";
import { MediaData } from "@/types/profile-builder";
import { mockUploadAvatar } from "@/services/cardService";
import { UploadCloud, Loader2, User, X } from "lucide-react";
import Image from "next/image";

interface MediaUploadSectionProps {
	data: MediaData;
	onChange: (data: MediaData) => void;
}

export function MediaUploadSection({
	data,
	onChange,
}: MediaUploadSectionProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setError(null);
		setIsUploading(true);

		try {
			// The mock function validates 5MB limit and image type
			const url = await mockUploadAvatar(file);
			onChange({ ...data, avatarUrl: url });
		} catch (err: any) {
			setError(err.message || "Tải ảnh lên thất bại.");
		} finally {
			setIsUploading(false);
			if (fileInputRef.current) {
				fileInputRef.current.value = ""; // Reset input
			}
		}
	};

	const handleRemove = () => {
		onChange({ ...data, avatarUrl: "" });
	};

	return (
		<div className="flex flex-col gap-6 bg-[#101010] border border-white/10 rounded-xl p-6">
			<div>
				<h2 className="text-lg font-semibold text-white">Hình ảnh</h2>
				<p className="text-sm text-white/50 mt-1">
					Tải lên ảnh đại diện cho thẻ số của bạn.
				</p>
			</div>

			<div className="flex flex-col gap-4">
				<label className="text-sm font-medium text-white/90">
					Ảnh đại diện
				</label>

				<div className="flex items-center gap-6">
					{/* Avatar Preview */}
					<div className="relative shrink-0 w-24 h-24 rounded-full overflow-hidden border border-white/10 bg-gradient-to-br from-[#1A1A1A] to-[#0B0B0B] flex items-center justify-center">
						{isUploading ? (
							<Loader2 className="w-8 h-8 text-[#008FEA] animate-spin" />
						) : data.avatarUrl ? (
							<Image
								src={data.avatarUrl}
								alt="Xem trước ảnh đại diện"
								fill
								className="object-cover"
								unoptimized // for blob URLs
							/>
						) : (
							<User className="w-10 h-10 text-white/20" />
						)}

						{data.avatarUrl && !isUploading && (
							<button
								onClick={handleRemove}
								className="absolute top-1 right-1 bg-black/60 p-1 rounded-full text-white/80 hover:text-white hover:bg-[#E5484D] transition-colors"
								title="Xóa ảnh đại diện">
								<X size={14} />
							</button>
						)}
					</div>

					{/* Upload Controls */}
					<div className="flex flex-col gap-2">
						<input
							type="file"
							accept="image/*"
							className="hidden"
							ref={fileInputRef}
							onChange={handleFileChange}
						/>
						<button
							onClick={() => fileInputRef.current?.click()}
							disabled={isUploading}
							className="flex items-center gap-2 bg-[#2367A2]/20 hover:bg-[#2367A2]/30 text-[#008FEA] border border-[#2367A2]/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-fit">
							<UploadCloud size={16} />
							{isUploading ? "Đang tải..." : "Tải ảnh lên"}
						</button>

						<p className="text-xs text-white/40 max-w-[250px]">
							Khuyên dùng: 400x400px. Chỉ chấp nhận file ảnh. Tối đa 5MB.
						</p>

						{error && <p className="text-xs text-[#E5484D] mt-1">{error}</p>}
					</div>
				</div>
			</div>
		</div>
	);
}
