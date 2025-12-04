import { PatientData } from "../App";

interface PatientInfoProps {
  patient: PatientData;
  probability: number | null;
  onComputeProbability: (patient: PatientData) => void;
  isLoading: boolean;
}

export function PatientInfo({
  patient,
  probability,
  onComputeProbability,
  isLoading,
}: PatientInfoProps) {
  const formatLabel = (key: string): string => {
    // Convert snake_case to Title Case
    key = key.toLowerCase();
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderValue = (key: any, value: any): string => {
    if (key === "gender") {
      return value ? "Female" : "Male";
    }
    if (key === "gcs_available") {
      return value ? "Yes" : "No";
    }
    return String(value);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-teal-200/50 shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 px-6 py-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <h2 className="text-white relative z-10">Patient information</h2>
        <p className="text-teal-50 mt-1 relative z-10 text-sm">
          IR ID: {patient.ir_id}
        </p>
      </div>

      <div className="p-6">
        {/* Patient Data Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {Object.entries(patient).map(([key, value]) => (
            <div
              key={key}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-200/50 hover:border-teal-400/60 transition-all hover:shadow-md hover:shadow-teal-200/30 group"
            >
              <dt className="text-slate-600 mb-1 text-sm group-hover:text-teal-700 transition-colors">
                {formatLabel(key)}
              </dt>
              <dd className="text-slate-900 text-sm">
                {renderValue(key, value)}
              </dd>
            </div>
          ))}
        </div>

        {/* Compute Button */}
        <div className="flex flex-col justify-center items-center pt-4 border-t border-teal-200/50">
          <button
            onClick={() => onComputeProbability(patient)}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white rounded-xl hover:shadow-xl hover:shadow-teal-400/40 hover:scale-[1.02] transition-all relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isLoading ? "Computing..." : "Run ORacle"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </button>

          {/* Probability Result */}
          {probability !== null && (
            <div className="mt-6 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-300/50 shadow-lg">
              <p className="text-slate-900 mb-3">
                {probability > 0.5
                  ? `Patient with IR ID ${patient.ir_id} requires an exploratory laparotomy.`
                  : `Patient with IR ID ${patient.ir_id} does not require an exploratory laparotomy.`}
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                The model predicts this patient has a{" "}
                {(probability * 100).toFixed(0)}% probability of requiring
                exploratory laparotomy based on their vital signs, transfusion
                history, and demographics. Patients with similar profiles
                historically required XLAP in {(probability * 100).toFixed(0)}%
                of cases.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
