import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/crm/user-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/crm-types";
import { Button } from "@/components/ui/button";
import AddUserDialog from "@/components/crm/add-user-dialog";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      userId: "U001",
      username: "john_doe",
      email: "john.doe@example.com",
      password: "Password",
      role: "masterAdmin",
      credits: 1200,
    },
    {
      userId: "U002",
      username: "sarah_lee",
      email: "sarah.lee@example.com",
      password: "Password",
      role: "admin",
      credits: 850,
    },
    {
      userId: "U003",
      username: "michael_chen",
      email: "michael.chen@example.com",
      password: "Password",
      role: "client",
      credits: 320,
    },
    {
      userId: "U004",
      username: "emily_wong",
      email: "emily.wong@example.com",
      password: "Password",
      role: "client",
      credits: 0,
    },
    {
      userId: "U005",
      username: "david_kim",
      email: "david.kim@example.com",
      password: "Password",
      role: "admin",
      credits: 540,
    },
    {
      userId: "U006",
      username: "lisa_tan",
      email: "lisa.tan@example.com",
      password: "Password",
      role: "client",
      credits: 150,
    },
    {
      userId: "U007",
      username: "alex_ngo",
      email: "alex.ngo@example.com",
      password: "Password",
      role: "admin",
      credits: 2100,
    },
    {
      userId: "U008",
      username: "jasmine_lim",
      email: "jasmine.lim@example.com",
      password: "Password",
      role: "client",
      credits: 75,
    },
    {
      userId: "U009",
      username: "ryan_lee",
      email: "ryan.lee@example.com",
      password: "Password",
      role: "client",
      credits: 980,
    },
    {
      userId: "U010",
      username: "nina_patel",
      email: "nina.patel@example.com",
      password: "Password",
      role: "admin",
      credits: 430,
    },
  ];
}

export default async function CRMUsers() {
  const data = await getData();

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
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
