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
      id: "U001",
      username: "john_doe",
      email: "john.doe@example.com",
      password: "Password",
      role: "Master Admin",
      max_token: 1200,
    },
    {
      id: "U002",
      username: "sarah_lee",
      email: "sarah.lee@example.com",
      password: "Password",
      role: "Admin",
      max_token: 850,
    },
    {
      id: "U003",
      username: "michael_chen",
      email: "michael.chen@example.com",
      password: "Password",
      role: "Client",
      max_token: 320,
    },
    {
      id: "U004",
      username: "emily_wong",
      email: "emily.wong@example.com",
      password: "Password",
      role: "Client",
      max_token: 0,
    },
    {
      id: "U005",
      username: "david_kim",
      email: "david.kim@example.com",
      password: "Password",
      role: "Admin",
      max_token: 540,
    },
    {
      id: "U006",
      username: "lisa_tan",
      email: "lisa.tan@example.com",
      password: "Password",
      role: "Client",
      max_token: 150,
    },
    {
      id: "U007",
      username: "alex_ngo",
      email: "alex.ngo@example.com",
      password: "Password",
      role: "Admin",
      max_token: 2100,
    },
    {
      id: "U008",
      username: "jasmine_lim",
      email: "jasmine.lim@example.com",
      password: "Password",
      role: "Client",
      max_token: 75,
    },
    {
      id: "U009",
      username: "ryan_lee",
      email: "ryan.lee@example.com",
      password: "Password",
      role: "Client",
      max_token: 980,
    },
    {
      id: "U010",
      username: "nina_patel",
      email: "nina.patel@example.com",
      password: "Password",
      role: "Admin",
      max_token: 430,
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
