import { FC, PropsWithChildren } from "react";

type PrimaryButtonProps = PropsWithChildren<{
  name: string;
  onClick?: () => void;
  className?: string;
}>;

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  /**Name Attribute - also used in to define data-test-id */
  children,
  name,
  className = "",
  ...props
}: PrimaryButtonProps) => {
  /**
   *     Primary Button Classes
   */
  const primaryButtonClasses = "text-submit-button-text bg-submit-button";
  return (
    <button
      name={name}
      className={`ml-4 py-2 px-5 rounded-md border border-1 font-semibold ${className} ${primaryButtonClasses}`}
      data-testid={`${name}-id`}
      {...props}
    >
      {children}
    </button>
  );
};
