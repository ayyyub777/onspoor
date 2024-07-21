import { logout } from "../actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "@/types";

export function UserNav({ user }: { user: User }) {
    const handleLogout = async () => {
        await logout();
        window.location.reload();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt="The users profile picture" />
                        <AvatarFallback>
                            {user.name[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[160px]" align="end" forceMount>
                <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
