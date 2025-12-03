import { useState, useEffect } from "react";
import { PatientHeader } from "./components/PatientHeader";
import { VitalsForm, VitalsData } from "./components/VitalsForm";
import { LabResultsForm, LabResultsData } from "./components/LabResultsForm";
import { PredictionResult, PredictionData, PredictionHistoryEntry } from "./components/PredictionResult";
import { VitalsMonitor } from "./components/VitalsMonitor";
import { ImagingSummary } from "./components/ImagingSummary";
import { ActionButtons } from "./components/ActionButtons";
import { CaseTimeline } from "./components/CaseTimeline";
import { VitalsDetailPage } from "./components/VitalsDetailPage";
import { LabResultsDetailPage } from "./components/LabResultsDetailPage";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Activity } from "lucide-react";
import { Toaster } from "./components/ui/sonner";

// Mock patient data
const mockPatient = {
  id: "T-2024-1042",
  name: "John Doe",
  age: 42,
  sex: "Male",
  mrn: "MRN-8847291",
  admissionTime: "Oct 25, 2025 14:32",
  chiefComplaint: "Motor vehicle collision, abdominal trauma"
};

// Mock imaging studies
const mockImagingStudies = [
  {
    type: "CT Abdomen/Pelvis with Contrast",
    timestamp: "15:45",
    imageUrl: "https://images.unsplash.com/photo-1706065638524-eb52e7165abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwQ1QlMjBzY2FufGVufDF8fHx8MTc2MTM1NDMwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    findings: [
      "Moderate free fluid in pelvis",
      "Splenic laceration grade III",
      "No active extravasation"
    ],
    status: "positive" as const
  },
  {
    type: "FAST Exam",
    timestamp: "14:38",
    imageUrl: "https://images.unsplash.com/photo-1706065264583-55f1a8549769?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bHRyYXNvdW5kJTIwbWVkaWNhbHxlbnwxfHx8fDE3NjEzNTQzMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    findings: [
      "Positive in Morrison's pouch",
      "Fluid in splenorenal recess",
      "Pericardium negative"
    ],
    status: "positive" as const
  },
  {
    type: "Chest X-Ray",
    timestamp: "14:35",
    imageUrl: "https://images.unsplash.com/photo-1706065638524-eb52e7165abf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwQ1QlMjBzY2FufGVufDF8fHx8MTc2MTM1NDMwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    findings: [
      "No pneumothorax",
      "No hemothorax",
      "Normal mediastinum"
    ],
    status: "negative" as const
  }
];

// Mock timeline events
const mockTimelineEvents = [
  {
    timestamp: "16:05",
    type: "action" as const,
    title: "OR Notification Sent",
    description: "Surgical team alerted for potential exploratory laparotomy",
    user: "Dr. Smith (Trauma)",
    critical: true
  },
  {
    timestamp: "15:58",
    type: "alert" as const,
    title: "Prediction Alert: High Risk",
    description: "System predicted 87% probability of needing surgical intervention",
    critical: true
  },
  {
    timestamp: "15:45",
    type: "imaging" as const,
    title: "CT Scan Completed",
    description: "Positive for splenic laceration and free fluid",
    user: "Radiology Dept"
  },
  {
    timestamp: "15:30",
    type: "lab" as const,
    title: "Lab Results Critical",
    description: "Hemoglobin dropped to 8.2 g/dL, Lactate elevated at 5.1 mmol/L",
    critical: true
  },
  {
    timestamp: "15:15",
    type: "vitals" as const,
    title: "Vital Signs Deteriorating",
    description: "Systolic BP 78 mmHg, HR 132 bpm",
    critical: true
  },
  {
    timestamp: "14:38",
    type: "imaging" as const,
    title: "FAST Exam Positive",
    description: "Free fluid identified in Morrison's pouch and splenorenal recess",
    user: "Dr. Johnson (EM)"
  },
  {
    timestamp: "14:32",
    type: "alert" as const,
    title: "Trauma Alert Activated",
    description: "Level 1 trauma activation for MVC with high-speed impact",
    user: "EMS"
  }
];

// Prediction algorithm
function calculatePrediction(vitals: VitalsData, labs: LabResultsData): PredictionData {
  const riskFactors: string[] = [];
  let riskScore = 0;

  const hr = parseFloat(vitals.heartRate);
  const sbp = parseFloat(vitals.systolicBP);
  const hgb = parseFloat(labs.hemoglobin);
  const lactate = parseFloat(labs.lactate);
  const baseDeficit = parseFloat(labs.baseDeficit);
  const gcs = parseFloat(vitals.gcs);

  if (sbp < 90 && !isNaN(sbp)) {
    riskFactors.push("Hypotension (SBP < 90 mmHg) - indicates possible hemorrhagic shock");
    riskScore += 25;
  }

  if (hr > 120 && !isNaN(hr)) {
    riskFactors.push("Tachycardia (HR > 120 bpm) - compensatory response to blood loss");
    riskScore += 15;
  }

  if (hgb < 9 && !isNaN(hgb)) {
    riskFactors.push("Low hemoglobin (< 9 g/dL) - suggests significant blood loss");
    riskScore += 20;
  }

  if (lactate > 4 && !isNaN(lactate)) {
    riskFactors.push("Elevated lactate (> 4 mmol/L) - indicates tissue hypoperfusion");
    riskScore += 20;
  }

  if (baseDeficit < -6 && !isNaN(baseDeficit)) {
    riskFactors.push("Severe base deficit (< -6 mEq/L) - metabolic acidosis from shock");
    riskScore += 15;
  }

  if (gcs < 13 && !isNaN(gcs)) {
    riskFactors.push("Decreased GCS (< 13) - may indicate severe injury");
    riskScore += 10;
  }

  if (labs.peritonealSigns) {
    riskFactors.push("Peritoneal signs present - concerning for intra-abdominal injury");
    riskScore += 25;
  }

  if (labs.fastPositive) {
    riskFactors.push("FAST positive - free fluid in abdomen suggesting bleeding");
    riskScore += 30;
  }

  const confidence = Math.min(95, Math.max(60, riskScore > 50 ? riskScore : 100 - riskScore));
  const needsLaparotomy = riskScore >= 50;

  let recommendation = "";
  if (needsLaparotomy) {
    if (riskScore >= 75) {
      recommendation = "High risk for intra-abdominal injury requiring surgical intervention. Immediate surgical consultation recommended.";
    } else {
      recommendation = "Moderate-high risk for intra-abdominal injury. Consider surgical consultation and continued monitoring.";
    }
  } else {
    if (riskScore >= 30) {
      recommendation = "Low-moderate risk. Continue close monitoring with serial examinations and repeat imaging as indicated.";
    } else {
      recommendation = "Low risk for surgical intervention. Conservative management with observation is appropriate.";
    }
  }

  return {
    needsLaparotomy,
    confidence,
    riskFactors,
    recommendation,
    riskScore
  };
}

// Get status helper
const getStatus = (riskScore: number): "critical" | "warning" | "stable" => {
  if (riskScore >= 75) return "critical";
  if (riskScore >= 40) return "warning";
  return "stable";
};

export default function App() {
  const [vitals, setVitals] = useState<VitalsData>({
    heartRate: "",
    systolicBP: "",
    diastolicBP: "",
    respiratoryRate: "",
    temperature: "",
    spO2: "",
    gcs: ""
  });

  const [labResults, setLabResults] = useState<LabResultsData>({
    hemoglobin: "",
    lactate: "",
    whiteBloodCells: "",
    baseDeficit: "",
    platelets: "",
    inr: "",
    peritonealSigns: false,
    fastPositive: false
  });

  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistoryEntry[]>([
    { timestamp: "14:45", probability: 45, riskScore: 45, status: "warning" },
    { timestamp: "15:00", probability: 58, riskScore: 58, status: "warning" },
    { timestamp: "15:15", probability: 72, riskScore: 72, status: "warning" },
    { timestamp: "15:30", probability: 87, riskScore: 87, status: "critical" }
  ]);

  // Mock vitals history data
  const vitalsHistory = [
    { time: "14:30", heartRate: 110, systolicBP: 95, spO2: 96, respiratoryRate: 18 },
    { time: "14:45", heartRate: 118, systolicBP: 88, spO2: 94, respiratoryRate: 22 },
    { time: "15:00", heartRate: 125, systolicBP: 82, spO2: 93, respiratoryRate: 24 },
    { time: "15:15", heartRate: 132, systolicBP: 78, spO2: 91, respiratoryRate: 28 }
  ];

  // Mock vital signs monitor data
  const vitalSignsData = [
    {
      name: "Heart Rate",
      value: vitals.heartRate || "132",
      unit: "bpm",
      change: 7,
      desiredRange: "60-100",
      trend: "up" as const,
      status: "critical" as const
    },
    {
      name: "Systolic BP",
      value: vitals.systolicBP || "78",
      unit: "mmHg",
      change: -4,
      desiredRange: "90-140",
      trend: "down" as const,
      status: "critical" as const
    },
    {
      name: "Diastolic BP",
      value: vitals.diastolicBP || "45",
      unit: "mmHg",
      change: -3,
      desiredRange: "60-90",
      trend: "down" as const,
      status: "warning" as const
    },
    {
      name: "Respiratory Rate",
      value: vitals.respiratoryRate || "28",
      unit: "bpm",
      change: 4,
      desiredRange: "12-20",
      trend: "up" as const,
      status: "warning" as const
    },
    {
      name: "SpO2",
      value: vitals.spO2 || "91",
      unit: "%",
      change: -2,
      desiredRange: "95-100",
      trend: "down" as const,
      status: "warning" as const
    },
    {
      name: "Temperature",
      value: vitals.temperature || "36.2",
      unit: "°C",
      change: -0.3,
      desiredRange: "36.5-37.5",
      trend: "down" as const,
      status: "warning" as const
    },
    {
      name: "Glasgow Coma Scale",
      value: vitals.gcs || "12",
      unit: "",
      change: -1,
      desiredRange: "15",
      trend: "down" as const,
      status: "warning" as const
    }
  ];

  // Mock lab results data
  const labResultsData = [
    {
      test: "Hemoglobin",
      currentValue: labResults.hemoglobin || "8.2",
      unit: "g/dL",
      previousValue: "9.8",
      normalRange: "13.5-17.5",
      status: "critical" as const,
      trend: "down" as const
    },
    {
      test: "Lactate",
      currentValue: labResults.lactate || "5.1",
      unit: "mmol/L",
      previousValue: "3.2",
      normalRange: "0.5-2.0",
      status: "critical" as const,
      trend: "up" as const
    },
    {
      test: "Base Deficit",
      currentValue: labResults.baseDeficit || "-7.2",
      unit: "mEq/L",
      previousValue: "-4.5",
      normalRange: "-2 to +2",
      status: "critical" as const,
      trend: "down" as const
    },
    {
      test: "White Blood Cells",
      currentValue: labResults.whiteBloodCells || "16.5",
      unit: "×10³/µL",
      previousValue: "14.2",
      normalRange: "4.5-11.0",
      status: "warning" as const,
      trend: "up" as const
    },
    {
      test: "Platelets",
      currentValue: labResults.platelets || "165",
      unit: "×10³/µL",
      previousValue: "180",
      normalRange: "150-400",
      status: "normal" as const,
      trend: "down" as const
    },
    {
      test: "INR",
      currentValue: labResults.inr || "1.4",
      unit: "",
      previousValue: "1.1",
      normalRange: "0.8-1.2",
      status: "warning" as const,
      trend: "up" as const
    }
  ];

  // Auto-calculate prediction when data changes
  useEffect(() => {
    const hasVitals = vitals.heartRate && vitals.systolicBP;
    const hasLabs = labResults.hemoglobin || labResults.lactate;
    
    if (hasVitals || hasLabs) {
      const result = calculatePrediction(vitals, labResults);
      setPrediction(result);
      
      // Add to history if values changed significantly
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      
      const newEntry: PredictionHistoryEntry = {
        timestamp: currentTime,
        probability: result.confidence,
        riskScore: result.riskScore,
        status: getStatus(result.riskScore)
      };
      
      // Only add if different from last entry
      if (predictionHistory.length === 0 || 
          predictionHistory[predictionHistory.length - 1].probability !== newEntry.probability) {
        setPredictionHistory(prev => [...prev, newEntry]);
      }
    } else {
      setPrediction(null);
    }
  }, [vitals, labResults]);

  const handleLoadExample = () => {
    setVitals({
      heartRate: "132",
      systolicBP: "78",
      diastolicBP: "45",
      respiratoryRate: "28",
      temperature: "36.2",
      spO2: "91",
      gcs: "12"
    });

    setLabResults({
      hemoglobin: "8.2",
      lactate: "5.1",
      whiteBloodCells: "16.5",
      baseDeficit: "-7.2",
      platelets: "165",
      inr: "1.4",
      peritonealSigns: true,
      fastPositive: true
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 p-6">
      <Toaster />
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1>Trauma Laparotomy Prediction System</h1>
              <p className="text-muted-foreground">
                Predictive analytics for exploratory laparotomy decision support
              </p>
            </div>
          </div>
          
          <Button onClick={handleLoadExample} variant="outline">
            Load Example Case
          </Button>
        </div>

        {/* Patient Info */}
        <PatientHeader patient={mockPatient} />

        {/* Tabbed Navigation */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="vitals">Vitals Detail</TabsTrigger>
            <TabsTrigger value="labs">Lab Results</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <VitalsForm vitals={vitals} onChange={setVitals} />
                <LabResultsForm labResults={labResults} onChange={setLabResults} />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <PredictionResult prediction={prediction} history={predictionHistory} />
                <VitalsMonitor vitals={vitalSignsData.slice(0, 4)} />
              </div>
            </div>

            {/* Imaging Summary */}
            <ImagingSummary studies={mockImagingStudies} />

            {/* Action Buttons */}
            <ActionButtons />

            {/* Case Timeline */}
            <CaseTimeline events={mockTimelineEvents} />
          </TabsContent>

          {/* Vitals Detail Tab */}
          <TabsContent value="vitals" className="mt-6">
            <VitalsDetailPage
              vitals={vitals}
              onChange={setVitals}
              vitalSigns={vitalSignsData}
              history={vitalsHistory}
            />
          </TabsContent>

          {/* Lab Results Tab */}
          <TabsContent value="labs" className="mt-6">
            <LabResultsDetailPage
              labResults={labResults}
              onChange={setLabResults}
              labData={labResultsData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
