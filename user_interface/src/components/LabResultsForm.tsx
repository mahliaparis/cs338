import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

export interface LabResultsData {
  hemoglobin: string;
  lactate: string;
  whiteBloodCells: string;
  baseDeficit: string;
  platelets: string;
  inr: string;
  peritonealSigns: boolean;
  fastPositive: boolean;
}

interface LabResultsFormProps {
  labResults: LabResultsData;
  onChange: (labResults: LabResultsData) => void;
}

export function LabResultsForm({ labResults, onChange }: LabResultsFormProps) {
  const handleChange = (field: keyof LabResultsData, value: string | boolean) => {
    onChange({ ...labResults, [field]: value });
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Lab Results & Clinical Findings</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="hemoglobin">Hemoglobin (g/dL)</Label>
          <Input
            id="hemoglobin"
            type="number"
            step="0.1"
            placeholder="e.g., 8.5"
            value={labResults.hemoglobin}
            onChange={(e) => handleChange("hemoglobin", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lactate">Lactate (mmol/L)</Label>
          <Input
            id="lactate"
            type="number"
            step="0.1"
            placeholder="e.g., 4.2"
            value={labResults.lactate}
            onChange={(e) => handleChange("lactate", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="whiteBloodCells">WBC (×10³/µL)</Label>
          <Input
            id="whiteBloodCells"
            type="number"
            step="0.1"
            placeholder="e.g., 15.2"
            value={labResults.whiteBloodCells}
            onChange={(e) => handleChange("whiteBloodCells", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="baseDeficit">Base Deficit (mEq/L)</Label>
          <Input
            id="baseDeficit"
            type="number"
            step="0.1"
            placeholder="e.g., -6.5"
            value={labResults.baseDeficit}
            onChange={(e) => handleChange("baseDeficit", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="platelets">Platelets (×10³/µL)</Label>
          <Input
            id="platelets"
            type="number"
            placeholder="e.g., 180"
            value={labResults.platelets}
            onChange={(e) => handleChange("platelets", e.target.value)}
            className="bg-input-background"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="inr">INR</Label>
          <Input
            id="inr"
            type="number"
            step="0.1"
            placeholder="e.g., 1.3"
            value={labResults.inr}
            onChange={(e) => handleChange("inr", e.target.value)}
            className="bg-input-background"
          />
        </div>
      </div>
      
      <div className="space-y-3 pt-4 border-t">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="peritonealSigns"
            checked={labResults.peritonealSigns}
            onCheckedChange={(checked) => handleChange("peritonealSigns", checked as boolean)}
          />
          <Label
            htmlFor="peritonealSigns"
            className="cursor-pointer"
          >
            Peritoneal Signs Present
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="fastPositive"
            checked={labResults.fastPositive}
            onCheckedChange={(checked) => handleChange("fastPositive", checked as boolean)}
          />
          <Label
            htmlFor="fastPositive"
            className="cursor-pointer"
          >
            FAST Exam Positive
          </Label>
        </div>
      </div>
    </Card>
  );
}
