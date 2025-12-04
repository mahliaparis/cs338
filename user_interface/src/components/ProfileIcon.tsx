import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProfileIcon() {
  const [isHovered, setIsHovered] = useState(false);

  // Mock doctor data
  const doctor = {
    name: "Dr. Sarah Mitchell",
    department: "Emergency Medicine",
    contact: "smitchell@nm.org",
    phone: "(555) 123-4567",
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer ring-2 ring-teal-300/70 hover:ring-teal-500 transition-all hover:shadow-lg hover:shadow-teal-300/50 hover:scale-105">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop"
          alt="Doctor profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Modal */}
      {isHovered && (
        <div className="absolute top-full right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-teal-200/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 px-5 py-4">
            <p className="text-white">{doctor.name}</p>
            <p className="text-teal-50">{doctor.department}</p>
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3 text-slate-700">
              <span className="text-slate-500">Email:</span>
              <span>{doctor.contact}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <span className="text-slate-500">Phone:</span>
              <span>{doctor.phone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
