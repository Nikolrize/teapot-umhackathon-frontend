"use client";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/crm/user-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddUserDialog from "@/components/crm/add-user-dialog";
import { useGetAllUsers } from "@/hooks/useUser";

export default async function CRMUsers() {
  const { data: users = [], isLoading } = useGetAllUsers();

  return (
    <div className="flex flex-col items-center px-20 py-4 overflow-y-auto">
      <div className="flex flex-col w-[70vw] gap-4">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <div className="flex flex-col">
              <CardTitle className="font-bold text-brand-primary">
                Users
              </CardTitle>
              <CardDescription>
                Manage all user-related details and actions here.
              </CardDescription>
            </div>
            <AddUserDialog>
              <Button className="bg-brand-primary">Add User</Button>
            </AddUserDialog>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
