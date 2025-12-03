import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, AlertTriangle, Activity, FileText, Users, Bell } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface TimelineEvent {
  timestamp: string;
  type: "alert" | "vitals" | "lab" | "imaging" | "notification" | "action";
  title: string;
  description: string;
  user?: string;
  critical?: boolean;
}

interface CaseTimelineProps {
  events: TimelineEvent[];
}

export function CaseTimeline({ events }: CaseTimelineProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-4 h-4" />;
      case "vitals":
        return <Activity className="w-4 h-4" />;
      case "lab":
        return <FileText className="w-4 h-4" />;
      case "imaging":
        return <FileText className="w-4 h-4" />;
      case "notification":
        return <Bell className="w-4 h-4" />;
      case "action":
        return <Users className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getColor = (type: string, critical?: boolean) => {
    if (critical) return "text-red-500";
    switch (type) {
      case "alert":
        return "text-orange-500";
      case "vitals":
        return "text-blue-500";
      case "lab":
        return "text-purple-500";
      case "imaging":
        return "text-cyan-500";
      case "notification":
        return "text-green-500";
      case "action":
        return "text-indigo-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5" />
        <h3>Case Timeline & Audit Trail</h3>
      </div>

      <ScrollArea className="h-96 pr-4">
        <div className="relative space-y-4">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />

          {events.map((event, index) => (
            <div key={index} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background ${
                event.critical ? 'border-red-500' : 'border-border'
              }`}>
                <div className={`${getColor(event.type, event.critical)}`}>
                  {getIcon(event.type)}
                </div>
              </div>

              {/* Event content */}
              <div className="flex-1 space-y-1 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className={event.critical ? 'text-red-500' : ''}>
                      {event.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {event.timestamp}
                  </Badge>
                </div>
                {event.user && (
                  <p className="text-xs text-muted-foreground">By: {event.user}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
