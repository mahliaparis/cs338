import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { FileImage, AlertCircle, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ImagingStudy {
  type: string;
  timestamp: string;
  imageUrl: string;
  findings: string[];
  status: "positive" | "negative" | "pending";
}

interface ImagingSummaryProps {
  studies: ImagingStudy[];
}

export function ImagingSummary({ studies }: ImagingSummaryProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileImage className="w-5 h-5" />
        <h3>Imaging Summary</h3>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Studies</TabsTrigger>
          <TabsTrigger value="ct">CT Scans</TabsTrigger>
          <TabsTrigger value="fast">FAST</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studies.map((study, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <ImageWithFallback
                    src={study.imageUrl}
                    alt={study.type}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={study.status === "positive" ? "destructive" : "secondary"}
                    >
                      {study.status === "positive" ? (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Positive
                        </>
                      ) : study.status === "negative" ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Negative
                        </>
                      ) : (
                        "Pending"
                      )}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h4>{study.type}</h4>
                    <p className="text-sm text-muted-foreground">{study.timestamp}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Findings:</p>
                    <ul className="text-sm space-y-1">
                      {study.findings.map((finding, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-muted-foreground">•</span>
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ct" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studies
              .filter((study) => study.type.includes("CT"))
              .map((study, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <ImageWithFallback
                      src={study.imageUrl}
                      alt={study.type}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={study.status === "positive" ? "destructive" : "secondary"}
                      >
                        {study.status === "positive" ? (
                          <>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Positive
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Negative
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h4>{study.type}</h4>
                      <p className="text-sm text-muted-foreground">{study.timestamp}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Findings:</p>
                      <ul className="text-sm space-y-1">
                        {study.findings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="fast" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studies
              .filter((study) => study.type.includes("FAST"))
              .map((study, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <ImageWithFallback
                      src={study.imageUrl}
                      alt={study.type}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={study.status === "positive" ? "destructive" : "secondary"}
                      >
                        {study.status === "positive" ? (
                          <>
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Positive
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Negative
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h4>{study.type}</h4>
                      <p className="text-sm text-muted-foreground">{study.timestamp}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Findings:</p>
                      <ul className="text-sm space-y-1">
                        {study.findings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
