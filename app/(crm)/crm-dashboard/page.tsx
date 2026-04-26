"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useGetLeadsOverview } from "@/hooks/useStats";

export default function CRMDashboard() {
  const { data: leads, isLoading } = useGetLeadsOverview();

  return (
    <div className="flex flex-col items-center px-20 py-4">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-primary font-bold">
              Leads Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Total Leads</Label>
            <Label>New Leads (Today / This Week)</Label>
            <Label>Converted Leads</Label>
            <Label>Lost Leads</Label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-brand-primary  font-bold">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>
              Conversion Rate = (Converted Leads / Total Leads) × 100%
            </Label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-brand-primary  font-bold">
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Average time to reply to a lead</Label>
            <Label>First response time</Label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-brand-primary  font-bold">
              Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Label>Leads handled per agent</Label>
            <Label>Conversion per agent</Label>
            <Label>Revenue per agent</Label>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
