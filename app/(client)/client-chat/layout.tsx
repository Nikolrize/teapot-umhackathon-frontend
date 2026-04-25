"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  useCreateNewConversation,
  useGetConversationsByUserId,
} from "@/hooks/useChat";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dot } from "lucide-react";
import { formatChatTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useGetAllUsers } from "@/hooks/useUser";
import { User } from "@/types/crm-types";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const currentUserId = Cookies.get("user_id") ?? "";
  const [username, setUsername] = useState("");

  const { data: conversations = [], isLoading: isLoadingConversations } =
    useGetConversationsByUserId(currentUserId);

  const { data: allUsers = [], isLoading: isLoadingAllUsers } =
    useGetAllUsers();

  const { mutate: createConversation } = useCreateNewConversation();

  const handleCreateNewConversation = (target_user_id: string) => {
    createConversation({
      target_user_id: target_user_id,
      current_user_id: currentUserId,
    });
    setUsername("");
  };

  const filteredUsers = allUsers.filter((user: User) =>
    user.username.toLowerCase().includes(username.toLowerCase()),
  );

  const getUserId = (user: any) => user.user_id ?? user.id;

  return (
    <div className="pr-20 flex justify-center items-center h-full overflow-hidden gap-4">
      {/* LEFT */}
      <div className="flex flex-col gap-4 border-l h-full overflow-y-auto p-4 bg-card w-[20vw]">
        <Label className="font-semibold text-brand-primary">Chat</Label>

        <Input
          placeholder="Search user..."
          onChange={(e) => setUsername(e.target.value)}
        />

        {username && (
          <div className="bg-card border rounded-md shadow-md max-h-60 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={getUserId(user)}
                  className="flex items-center gap-3 p-2 hover:bg-muted cursor-pointer"
                  onClick={() => handleCreateNewConversation(getUserId(user))}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar_url || "/icons/user.png"} />
                    <AvatarFallback>
                      {user.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <span className="text-sm">{user.username}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-sm text-muted-foreground">
                No users found
              </div>
            )}
          </div>
        )}

        {conversations.map((item) => (
          <Button
            key={item.id}
            onClick={() => router.push(`/client-chat/${item.id}`)}
            variant="outline"
            size="lg"
            className="justify-start py-8 px-4 gap-4"
          >
            <Avatar>
              <AvatarImage
                src={item.other_user.avatar_url || "/icons/user.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-start gap-1 w-full truncate">
              <span>{item.other_user.username}</span>
              <div className="text-muted-foreground flex items-center text-xs w-full">
                <span className="truncate">{item.last_message}</span>
                {item.last_message && <Dot />}
                <span>{formatChatTime(item.last_message_at)}</span>
              </div>
            </div>
          </Button>
        ))}
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex flex-col h-full gap-4 py-2">{children}</div>
    </div>
  );
}
