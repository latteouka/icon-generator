import clsx from "clsx";

const FormGroup = (
  props: React.ComponentPropsWithoutRef<"div"> & { className?: string }
) => {
  return (
    <div className={clsx(props.className, "flex flex-col gap-4")}>
      {props.children}
    </div>
  );
};
export default FormGroup;
