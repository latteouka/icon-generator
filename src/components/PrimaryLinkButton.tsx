import clsx from "clsx";
import Link, { type LinkProps } from "next/link";

const PrimaryLink = (
  props: LinkProps & { children: React.ReactNode; className?: string }
) => {
  const { className, children, ...others } = props;
  return (
    <Link
      {...others}
      href={props.href}
      className={clsx(
        className ?? "",
        "rounded bg-blue-400 px-4 py-2 text-white hover:bg-blue-500"
      )}
    >
      {children}
    </Link>
  );
};
export default PrimaryLink;
