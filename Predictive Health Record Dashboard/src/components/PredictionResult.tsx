import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AlertTriangle, CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export interface PredictionData {
  needsLaparotomy: boolean;
  confidence: number;
  riskFactors: string[];
  recommendation: string;
  riskScore: number;
}

export interface PredictionHistoryEntry {
  timestamp: string;
  probability: number;
  riskScore: number;
  status: "critical" | "warning" | "stable";
}

interface PredictionResultProps {
  prediction: PredictionData | null;
  history: PredictionHistoryEntry[];
}

export function PredictionResult({ prediction, history }: PredictionResultProps) {
  if (!prediction) {
    return (
      <Card className="p-6">
        <div className="text-center py-8 text-muted-foreground">
          <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Enter patient vitals and lab results to generate prediction</p>
        </div>
      </Card>
    );
  }

  // Determine status based on risk score
  const getStatus = (riskScore: number): "critical" | "warning" | "stable" => {
    if (riskScore >= 75) return "critical";
    if (riskScore >= 40) return "warning";
    return "stable";
  };

  const currentStatus = getStatus(prediction.riskScore);

  const statusConfig = {
    critical: {
      color: "bg-red-500",
      textColor: "text-red-500",
      label: "IMMEDIATE SURGICAL INDICATION",
      bgColor: "bg-red-500/10"
    },
    warning: {
      color: "bg-orange-500",
      textColor: "text-orange-500",
      label: "MONITOR CLOSELY",
      bgColor: "bg-orange-500/10"
    },
    stable: {
      color: "bg-green-500",
      textColor: "text-green-500",
      label: "NON-SURGICAL MANAGEMENT LIKELY",
      bgColor: "bg-green-500/10"
    }
  };

  // Calculate trend from history
  const getTrend = () => {
    if (history.length < 2) return "stable";
    const current = history[history.length - 1].probability;
    const previous = history[history.length - 2].probability;
    const diff = current - previous;
    if (diff > 5) return "rising";
    if (diff < -5) return "falling";
    return "stable";
  };

  const trend = getTrend();

  return (
    <Card className="p-6">
      <h3 className="mb-4">Prediction Analysis</h3>
      
      <div className="space-y-6">
        {/* Status Badge */}
        <div className={`p-4 rounded-lg ${statusConfig[currentStatus].bgColor} border-2 border-${currentStatus === 'critical' ? 'red' : currentStatus === 'warning' ? 'orange' : 'green'}-500/20`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${statusConfig[currentStatus].color} animate-pulse`} />
            <span className={`${statusConfig[currentStatus].textColor}`}>
              {statusConfig[currentStatus].label}
            </span>
          </div>
        </div>

        {/* Main Prediction */}
        <Alert variant={prediction.needsLaparotomy ? "destructive" : "default"}>
          {prediction.needsLaparotomy ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <CheckCircle2 className="h-5 w-5" />
          )}
          <AlertTitle>
            {prediction.needsLaparotomy
              ? "Exploratory Laparotomy Recommended"
              : "Conservative Management Suggested"}
          </AlertTitle>
          <AlertDescription>{prediction.recommendation}</AlertDescription>
        </Alert>

        {/* Prediction History */}
        {history.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-muted-foreground">Prediction History</h4>
              <div className="flex items-center gap-2">
                {trend === "rising" && (
                  <>
                    <TrendingUp className="w-4 h-4 text-red-500" />
                    <span className="text-red-500">Rising</span>
                  </>
                )}
                {trend === "falling" && (
                  <>
                    <TrendingDown className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">Falling</span>
                  </>
                )}
                {trend === "stable" && (
                  <>
                    <Minus className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Stable</span>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              {history.slice(-4).reverse().map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${statusConfig[entry.status].color}`} />
                    <span className="text-sm text-muted-foreground">{entry.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{entry.probability}% probability</Badge>
                    {index < history.slice(-4).length - 1 && (
                      <>
                        {entry.probability > history.slice(-4).reverse()[index + 1].probability ? (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        ) : entry.probability < history.slice(-4).reverse()[index + 1].probability ? (
                          <TrendingDown className="w-4 h-4 text-green-500" />
                        ) : (
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Prediction Confidence</span>
            <Badge variant="secondary">{prediction.confidence}%</Badge>
          </div>
          <Progress value={prediction.confidence} className="h-2" />
        </div>

        {/* Risk Factors */}
        {prediction.riskFactors.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-muted-foreground">Identified Risk Factors</h4>
            <ul className="space-y-2">
              {prediction.riskFactors.map((factor, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 p-3 bg-muted/50 rounded-md"
                >
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="pt-4 border-t text-muted-foreground">
          <p className="text-sm">
            ⚠️ This prediction is for educational purposes only. Clinical judgment and
            additional diagnostic tools should guide treatment decisions.
          </p>
        </div>
      </div>
    </Card>
  );
}
