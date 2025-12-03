import { Card } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface VitalsChartProps {
  data: Array<{
    time: string;
    heartRate: number;
    systolicBP: number;
    spO2: number;
  }>;
}

export function VitalsChart({ data }: VitalsChartProps) {
  return (
    <Card className="p-6">
      <h3 className="mb-4">Vitals Trend</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
