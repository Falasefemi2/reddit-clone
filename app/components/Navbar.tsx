import Link from 'next/link';
import RedditText from '../../public/logo-name.svg'
import redditMobile from '../../public/reddit-full.svg'
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserDropdown from './UserDropdown';


const Navbar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className='h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between'>
            <Link href='/' className='flex items-center gap-x-3'>
                <Image src={redditMobile} alt='reddit mobile icon' className='h-10 w-fit' />
                <Image src={RedditText} alt='reddit desktop' className='h-9 w-fit hidden lg:block' />
            </Link>
            <div className='flex items-center gap-x-4'>
                <ThemeToggle />
                {user ? (
                    // <Button>Log out</Button>
                    <UserDropdown userImage={user.picture} />
                ) : (
                    <div>
                        <Button variant="secondary" asChild>
                            <RegisterLink>Sign up</RegisterLink>
                        </Button>
                        <Button asChild>
                            <LoginLink>Sign in</LoginLink>
                        </Button>
                    </div>
                )}

            </div>
        </nav>
    );
}

export default Navbar;
