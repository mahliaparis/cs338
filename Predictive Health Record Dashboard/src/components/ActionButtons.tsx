import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Bell, Flag, Clock, FileText } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ActionButtonsProps {
  onNotifySurgical?: () => void;
  onFlagOR?: () => void;
  onViewTimeline?: () => void;
  onGenerateReport?: () => void;
}

export function ActionButtons({
  onNotifySurgical,
  onFlagOR,
  onViewTimeline,
  onGenerateReport,
}: ActionButtonsProps) {
  const handleNotifySurgical = () => {
    toast.success("Surgical team notified - ETA 5 minutes");
    onNotifySurgical?.();
  };

  const handleFlagOR = () => {
    toast.success("OR flagged for readiness - Room 3 being prepared");
    onFlagOR?.();
  };

  const handleViewTimeline = () => {
    toast.info("Opening case timeline");
    onViewTimeline?.();
  };

  const handleGenerateReport = () => {
    toast.success("Comprehensive report with audit trail generated");
    onGenerateReport?.();
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          onClick={handleNotifySurgical}
          variant="default"
          className="flex flex-col h-auto py-4 gap-2"
        >
          <Bell className="w-5 h-5" />
          <span className="text-sm">Notify Surgical Team</span>
        </Button>
        
        <Button
          onClick={handleFlagOR}
          variant="destructive"
          className="flex flex-col h-auto py-4 gap-2"
        >
          <Flag className="w-5 h-5" />
          <span className="text-sm">Flag for OR Readiness</span>
        </Button>
        
        <Button
          onClick={handleViewTimeline}
          variant="outline"
          className="flex flex-col h-auto py-4 gap-2"
        >
          <Clock className="w-5 h-5" />
          <span className="text-sm">View Case Timeline</span>
        </Button>
        
        <Button
          onClick={handleGenerateReport}
          variant="outline"
          className="flex flex-col h-auto py-4 gap-2"
        >
          <FileText className="w-5 h-5" />
          <span className="text-sm">Generate Report</span>
        </Button>
      </div>
    </Card>
  );
}
