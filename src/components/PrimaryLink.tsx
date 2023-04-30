import clsx from "clsx";
import Link, { type LinkProps } from "next/link";

type PrimaryLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

const PrimaryLink = ({ children, className, ...props }: PrimaryLinkProps) => {
  return (
    <Link href={props.href} className={clsx(className, "hover:text-slate-400")}>
      {children}
    </Link>
  );
};
export default PrimaryLink;
