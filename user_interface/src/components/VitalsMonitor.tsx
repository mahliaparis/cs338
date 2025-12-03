import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface VitalSign {
  name: string;
  value: string;
  unit: string;
  change: number;
  desiredRange: string;
  trend: "up" | "down" | "stable";
  status: "normal" | "warning" | "critical";
}

interface VitalsMonitorProps {
  vitals: VitalSign[];
}

export function VitalsMonitor({ vitals }: VitalsMonitorProps) {
  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-blue-500" />;
      case "stable":
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: "normal" | "warning" | "critical") => {
    switch (status) {
      case "critical":
        return "text-red-500";
      case "warning":
        return "text-orange-500";
      case "normal":
        return "text-green-500";
    }
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-red-500";
    if (change < 0) return "text-green-500";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-6">
      <h3 className="mb-4">Vital Signs Monitor</h3>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vital Sign</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Desired Range</TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vitals.map((vital, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      vital.status === 'critical' ? 'bg-red-500' :
                      vital.status === 'warning' ? 'bg-orange-500' :
                      'bg-green-500'
                    }`} />
                    <span>{vital.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={getStatusColor(vital.status)}>
                      {vital.value} {vital.unit}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className={getChangeColor(vital.change)}>
                      {vital.change > 0 ? '+' : ''}{vital.change} {vital.unit}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {vital.desiredRange}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {getTrendIcon(vital.trend)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span>Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span>Warning</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Normal</span>
        </div>
      </div>
    </Card>
  );
}
