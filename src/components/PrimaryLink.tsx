import Link, { type LinkProps } from "next/link";

const PrimaryLink = (props: LinkProps & { children: React.ReactNode }) => {
  return (
    <Link href={props.href} className="hover:text-cyan-500">
      {props.children}
    </Link>
  );
};
export default PrimaryLink;
