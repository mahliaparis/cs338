import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Activity, Calendar, User, RefreshCw, FileText, Send } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PatientHeaderProps {
  patient: {
    id: string;
    name: string;
    age: number;
    sex: string;
    mrn: string;
    admissionTime: string;
    chiefComplaint: string;
  };
  onRefresh?: () => void;
  onExport?: () => void;
  onSendToOR?: () => void;
}

export function PatientHeader({ patient, onRefresh, onExport, onSendToOR }: PatientHeaderProps) {
  const handleRefresh = () => {
    toast.success("Patient data refreshed");
    onRefresh?.();
  };

  const handleExport = () => {
    toast.success("Report exported successfully");
    onExport?.();
  };

  const handleSendToOR = () => {
    toast.success("OR notification sent - Team alerted");
    onSendToOR?.();
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-muted-foreground" />
                <h2>{patient.name}</h2>
              </div>
              <Badge variant="outline">MRN: {patient.mrn}</Badge>
            </div>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>Age: {patient.age}</span>
                <span>•</span>
                <span>Sex: {patient.sex}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Admitted: {patient.admissionTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Chief Complaint:</span>
              <span>{patient.chiefComplaint}</span>
            </div>
          </div>
          
          <Badge variant="destructive" className="px-4 py-2">
            TRAUMA ALERT
          </Badge>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
          <Button onClick={handleExport} variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleSendToOR} variant="default" size="sm">
            <Send className="w-4 h-4 mr-2" />
            Send to OR
          </Button>
        </div>
      </div>
    </Card>
  );
}
