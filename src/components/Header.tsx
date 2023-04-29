import { api } from "~/utils/api";
import Button from "./Button";
import PrimaryLink from "./PrimaryLink";
import { signIn, signOut, useSession } from "next-auth/react";
import { useBuyCredit } from "~/hooks/useBuyCredits";

const Header = () => {
  const session = useSession();
  const isLoggedIn = !!session.data;
  const { buyCredits } = useBuyCredit();

  const { data: credits } = api.user.getCredits.useQuery();
  return (
    <header className="container mx-auto flex h-16 items-center justify-between px-4 dark:bg-gray-800">
      <PrimaryLink href="/">Icon Generator</PrimaryLink>
      <ul className="flex gap-4">
        <li>
          <PrimaryLink href="/generate">Generate</PrimaryLink>
        </li>
        <li>
          <PrimaryLink href="/community">Community</PrimaryLink>
        </li>
        {isLoggedIn && (
          <li>
            <PrimaryLink href="/collection">Collection</PrimaryLink>
          </li>
        )}
      </ul>
      <ul className="flex gap-2">
        {isLoggedIn && (
          <>
            {credits && (
              <li className="mr-2 flex items-center">Credits: {credits}</li>
            )}
            <li>
              <Button
                onClick={() => {
                  buyCredits().catch(console.error);
                }}
              >
                Buy
              </Button>
            </li>
            <li>
              <Button
                variant="secondary"
                onClick={() => {
                  signOut().catch(console.error);
                }}
              >
                Logout
              </Button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <li>
            <Button
              variant="secondary"
              onClick={() => {
                signIn().catch(console.error);
              }}
            >
              Login
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
