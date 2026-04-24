"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/data-table-column-header";
import { User } from "@/interfaces/crm-interface";
import EditUserDialog from "./edit-user-dialog";
import UpdatePasswordDialog from "./update-password-dialog";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.getValue("userId")}</span>
    ),
  },

  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;

      return (
        <span className="capitalize px-2 py-1 rounded-md bg-muted text-xs">
          {role}
        </span>
      );
    },
  },

  {
    accessorKey: "credits",
    header: () => <div className="text-right">Credits</div>,
    cell: ({ row }) => {
      const credits = row.getValue("credits") as number;

      return (
        <div className="text-right font-medium">{credits.toLocaleString()}</div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.userId)}
            >
              Copy User ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <EditUserDialog user={user}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                Edit User
              </DropdownMenuItem>
            </EditUserDialog>

            <UpdatePasswordDialog user={user}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                Update Password
              </DropdownMenuItem>
            </UpdatePasswordDialog>

            <DropdownMenuItem>Manage Credits</DropdownMenuItem>

            <DropdownMenuItem variant={"destructive"}>
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
