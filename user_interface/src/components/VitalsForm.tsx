import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

export interface VitalsData {
  heartRate: string;
  systolicBP: string;
  diastolicBP: string;
  respiratoryRate: string;
  temperature: string;
  spO2: string;
  gcs: string;
}

interface VitalsFormProps {
  vitals: VitalsData;
  onChange: (vitals: VitalsData) => void;
}

export function VitalsForm({ vitals, onChange }: VitalsFormProps) {
  const handleChange = (field: keyof VitalsData, value: string) => {
    onChange({ ...vitals, [field]: value });
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Vital Signs</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
          <Input
            id="heartRate"
            type="number"
            placeholder="e.g., 120"
            value={vitals.heartRate}
            onChange={(e) => handleChange("heartRate", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="systolicBP">Systolic BP (mmHg)</Label>
          <Input
            id="systolicBP"
            type="number"
            placeholder="e.g., 85"
            value={vitals.systolicBP}
            onChange={(e) => handleChange("systolicBP", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="diastolicBP">Diastolic BP (mmHg)</Label>
          <Input
            id="diastolicBP"
            type="number"
            placeholder="e.g., 55"
            value={vitals.diastolicBP}
            onChange={(e) => handleChange("diastolicBP", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="respiratoryRate">Respiratory Rate (breaths/min)</Label>
          <Input
            id="respiratoryRate"
            type="number"
            placeholder="e.g., 24"
            value={vitals.respiratoryRate}
            onChange={(e) => handleChange("respiratoryRate", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature (°C)</Label>
          <Input
            id="temperature"
            type="number"
            step="0.1"
            placeholder="e.g., 36.5"
            value={vitals.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="spO2">SpO2 (%)</Label>
          <Input
            id="spO2"
            type="number"
            placeholder="e.g., 95"
            value={vitals.spO2}
            onChange={(e) => handleChange("spO2", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gcs">Glasgow Coma Scale</Label>
          <Input
            id="gcs"
            type="number"
            placeholder="e.g., 13"
            min="3"
            max="15"
            value={vitals.gcs}
            onChange={(e) => handleChange("gcs", e.target.value)}
            className="bg-input-background"
          />
        </div>
      </div>
    </Card>
  );
}
