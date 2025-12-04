import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { PatientInfo } from "./components/PatientInfo";
import { ProfileIcon } from "./components/ProfileIcon";
import { OracleLogo } from "./components/OracleLogo";
import {
  SageMakerRuntimeClient,
  InvokeEndpointCommand,
} from "@aws-sdk/client-sagemaker-runtime";

export interface PatientData {
  encounter_emergency_key: string;
  gender: number;
  age: number;
  ir_id: string;
  encounter_id: string;
  total_qty: number;
  BP_DIASTOLIC: number;
  RESPIRATIONS: number;
  SP02: number;
  TEMPERATURE: number;
  Cryo: number;
  FFP: number;
  Platelets: number;
  RBCs: number;
  Transfuse_Cryoprecipitate: number;
  Transfuse_Emergency_RBC: number;
  Transfuse_FFP: number;
  Transfuse_Platelet_Pheresis: number;
  Transfuse_Plt_Pheresis_Irradiated: number;
  Transfuse_RBC: number;
  Transfuse_RBC_Autologous: number;
  gcs_available: number;
}

export default function App() {
  const [patient, setPatient] = useState<PatientData | null>(null);
  const [probability, setProbability] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (irId: string) => {
    // Mock patient data
    const mockPatients: Record<string, PatientData> = {
      // patient that needs xlap id(4943650)
      "4943650": {
        encounter_emergency_key: "5731925157",
        gender: 0,
        age: 38,
        ir_id: "4943650",
        encounter_id: "200159877908",
        total_qty: 2,
        BP_DIASTOLIC: 70,
        RESPIRATIONS: 33,
        SP02: 99,
        TEMPERATURE: 99.5,
        Cryo: 0,
        FFP: 0,
        Platelets: 0,
        RBCs: 0,
        Transfuse_Cryoprecipitate: 0,
        Transfuse_Emergency_RBC: 0,
        Transfuse_FFP: 0,
        Transfuse_Platelet_Pheresis: 0,
        Transfuse_Plt_Pheresis_Irradiated: 0,
        Transfuse_RBC: 1,
        Transfuse_RBC_Autologous: 0,
        gcs_available: 0,
      },
      "67890": {
        encounter_emergency_key: "ENC_2024_002",
        gender: 1,
        age: 62,
        ir_id: "67890",
        encounter_id: "E2024002",
        total_qty: 12,
        BP_DIASTOLIC: 68,
        RESPIRATIONS: 22,
        SP02: 94,
        TEMPERATURE: 99.1,
        Cryo: 1,
        FFP: 4,
        Platelets: 2,
        RBCs: 6,
        Transfuse_Cryoprecipitate: 1,
        Transfuse_Emergency_RBC: 3,
        Transfuse_FFP: 4,
        Transfuse_Platelet_Pheresis: 2,
        Transfuse_Plt_Pheresis_Irradiated: 0,
        Transfuse_RBC: 3,
        Transfuse_RBC_Autologous: 0,
        gcs_available: 1,
      },
    };

    const foundPatient = mockPatients[irId];
    if (foundPatient) {
      setPatient(foundPatient);
      setProbability(null); // Reset probability when new patient is loaded
    } else {
      setPatient(null);
      setProbability(null);
      alert("Patient not found.");
    }
  };

  const handleComputeProbability = async (patientData: PatientData) => {
    if (!patientData) return;

    setIsLoading(true);

    try {
      const client = new SageMakerRuntimeClient({
        region: "us-east-2",
        credentials: {
          accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID!,
          secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY!,
        },
      });

      // Prepare payload - ENSURE ALL NUMBERS ARE ACTUALLY NUMBERS
      const payload = {
        encounter_emergency_key: Number(patientData.encounter_emergency_key),
        gender: Number(patientData.gender),
        age: Number(patientData.age),
        ir_id: Number(patientData.ir_id),
        encounter_id: Number(patientData.encounter_id),
        total_qty: Number(patientData.total_qty),
        BP_DIASTOLIC: Number(patientData.BP_DIASTOLIC),
        RESPIRATIONS: Number(patientData.RESPIRATIONS),
        SP02: Number(patientData.SP02),
        TEMPERATURE: Number(patientData.TEMPERATURE),
        Cryo: Number(patientData.Cryo),
        FFP: Number(patientData.FFP),
        Platelets: Number(patientData.Platelets),
        RBCs: Number(patientData.RBCs),
        Transfuse_Cryoprecipitate: Number(
          patientData.Transfuse_Cryoprecipitate
        ),
        Transfuse_Emergency_RBC: Number(patientData.Transfuse_Emergency_RBC),
        Transfuse_FFP: Number(patientData.Transfuse_FFP),
        Transfuse_Platelet_Pheresis: Number(
          patientData.Transfuse_Platelet_Pheresis
        ),
        Transfuse_Plt_Pheresis_Irradiated: Number(
          patientData.Transfuse_Plt_Pheresis_Irradiated
        ),
        Transfuse_RBC: Number(patientData.Transfuse_RBC),
        Transfuse_RBC_Autologous: Number(patientData.Transfuse_RBC_Autologous),
        gcs_available: patientData.gcs_available ? 1 : 0,
      };

      // DEBUG: Log the exact payload
      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const command = new InvokeEndpointCommand({
        EndpointName: "xgboost-xlap-endpoint-v3",
        ContentType: "application/json",
        Body: JSON.stringify(payload),
      });

      const response = await client.send(command);
      const result = JSON.parse(new TextDecoder().decode(response.Body));

      console.log("Received result:", result);
      setProbability(result.predictions[0]);
    } catch (error) {
      console.error("Error calling SageMaker:", error);
      alert("Failed to compute probability. Please check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-teal-200/50 px-6 py-5 shadow-lg sticky top-0 z-40 relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <OracleLogo className="w-12 h-12 drop-shadow-lg" />
            <h1 className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
              ORacle
            </h1>
          </div>
          <ProfileIcon />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {!patient ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <SearchBar onSearch={handleSearch} />
          </div>
        ) : (
          <div className="space-y-8">
            <SearchBar onSearch={handleSearch} />
            <PatientInfo
              patient={patient}
              probability={probability}
              onComputeProbability={handleComputeProbability}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>
    </div>
  );
}
