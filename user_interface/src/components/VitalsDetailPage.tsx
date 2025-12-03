import { Card } from "./ui/card";
import { VitalsForm, VitalsData } from "./VitalsForm";
import { VitalsMonitor } from "./VitalsMonitor";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface VitalsDetailPageProps {
  vitals: VitalsData;
  onChange: (vitals: VitalsData) => void;
  vitalSigns: Array<{
    name: string;
    value: string;
    unit: string;
    change: number;
    desiredRange: string;
    trend: "up" | "down" | "stable";
    status: "normal" | "warning" | "critical";
  }>;
  history: Array<{
    time: string;
    heartRate: number;
    systolicBP: number;
    spO2: number;
    respiratoryRate: number;
  }>;
}

export function VitalsDetailPage({
  vitals,
  onChange,
  vitalSigns,
  history,
}: VitalsDetailPageProps) {
  return (
    <div className="space-y-6">
      <VitalsMonitor vitals={vitalSigns} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VitalsForm vitals={vitals} onChange={onChange} />
        
        <Card className="p-6">
          <h3 className="mb-4">Vitals Trend - Last Hour</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="hsl(var(--chart-1))" 
                  name="Heart Rate (bpm)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="systolicBP" 
                  stroke="hsl(var(--chart-2))" 
                  name="Systolic BP (mmHg)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="spO2" 
                  stroke="hsl(var(--chart-3))" 
                  name="SpO2 (%)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="respiratoryRate" 
                  stroke="hsl(var(--chart-4))" 
                  name="Respiratory Rate"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4">Critical Thresholds</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Heart Rate</p>
            <p className="text-red-500">{'> 120 or < 50 bpm'}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Systolic BP</p>
            <p className="text-red-500">{'< 90 mmHg'}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">SpO2</p>
            <p className="text-red-500">{'< 92%'}</p>
          </div>
          <div className="p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Glasgow Coma Scale</p>
            <p className="text-red-500">{'< 13'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
