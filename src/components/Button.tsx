import clsx from "clsx";

const Button = (
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "primary" | "secondary";
    className?: string;
  }
) => {
  const color =
    (props.variant ?? "primary") === "primary"
      ? "text-blue-900 bg-blue-400 hover:bg-blue-500"
      : "text-gray-900 bg-gray-400 hover:bg-gray-500";
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "rounded px-3 py-1 text-white disabled:bg-gray-600",
        color
      )}
    >
      {props.children}
    </button>
  );
};
export default Button;
