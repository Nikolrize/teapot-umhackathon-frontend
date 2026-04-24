import { ClientGuide } from "@/components/client/client-guide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientHome() {
  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-primary font-bold">Guide</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ClientGuide />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-primary  font-bold">Recent</CardTitle>
          </CardHeader>
          <CardContent>
            <Card></Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
