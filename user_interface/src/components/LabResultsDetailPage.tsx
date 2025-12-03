import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { LabResultsForm, LabResultsData } from "./LabResultsForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from "lucide-react";

interface LabResult {
  test: string;
  currentValue: string;
  unit: string;
  previousValue?: string;
  normalRange: string;
  status: "normal" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
}

interface LabResultsDetailPageProps {
  labResults: LabResultsData;
  onChange: (labResults: LabResultsData) => void;
  labData: LabResult[];
}

export function LabResultsDetailPage({
  labResults,
  onChange,
  labData,
}: LabResultsDetailPageProps) {
  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    if (!trend) return null;
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-blue-500" />;
      case "stable":
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusIcon = (status: "normal" | "warning" | "critical") => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "normal":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const criticalCount = labData.filter(lab => lab.status === "critical").length;
  const warningCount = labData.filter(lab => lab.status === "warning").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical Results</p>
              <p className="text-red-500">{criticalCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Warning Results</p>
              <p className="text-orange-500">{warningCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Normal Results</p>
              <p className="text-green-500">{labData.length - criticalCount - warningCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Lab Results Table */}
      <Card className="p-6">
        <h3 className="mb-4">Laboratory Results</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Previous Value</TableHead>
                <TableHead>Normal Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labData.map((lab, index) => (
                <TableRow key={index}>
                  <TableCell>{lab.test}</TableCell>
                  <TableCell>
                    <span className={
                      lab.status === "critical" ? "text-red-500" :
                      lab.status === "warning" ? "text-orange-500" :
                      "text-foreground"
                    }>
                      {lab.currentValue} {lab.unit}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {lab.previousValue ? `${lab.previousValue} ${lab.unit}` : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {lab.normalRange}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(lab.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {getTrendIcon(lab.trend)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Lab Input Form */}
      <LabResultsForm labResults={labResults} onChange={onChange} />

      {/* Clinical Significance */}
      <Card className="p-6">
        <h3 className="mb-4">Clinical Significance</h3>
        <div className="space-y-3">
          <div className="p-4 border-l-4 border-red-500 bg-red-500/5">
            <h4 className="text-red-500 mb-1">Critical Values</h4>
            <p className="text-sm">
              Hemoglobin {'<'} 7 g/dL, Lactate {'>'} 4 mmol/L, Base Deficit {'<'} -6 mEq/L indicate severe physiological derangement requiring immediate intervention.
            </p>
          </div>
          <div className="p-4 border-l-4 border-orange-500 bg-orange-500/5">
            <h4 className="text-orange-500 mb-1">Warning Values</h4>
            <p className="text-sm">
              Hemoglobin 7-9 g/dL, Lactate 2-4 mmol/L suggest ongoing blood loss or inadequate resuscitation requiring close monitoring.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
