import clsx from "clsx";

const Input = (
  props: React.ComponentPropsWithoutRef<"input"> & { className?: string }
) => {
  return (
    <input
      {...props}
      required
      className={clsx(
        props.className,
        "rounded border border-gray-800 px-4 py-2 dark:text-gray-800"
      )}
    ></input>
  );
};
export default Input;
