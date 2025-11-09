import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { User } from 'lucide-react';
import { redirect } from 'next/navigation';

const UserProfile = () => {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} size={'icon'} className='cursor-pointer'>
                        <User />
                        <span className='sr-only'>User Profile</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => redirect("/profile")}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => redirect("/settings")}>
                        Settings
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserProfile
