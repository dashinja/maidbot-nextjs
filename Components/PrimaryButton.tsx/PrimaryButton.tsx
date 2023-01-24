export const PrimaryButton = ({
  /**Name Attribute - also used in to define data-test-id */
  name,
  className = '',
  ...props
}) => {

  /**
   * Primary Button Classes
   */
  const primaryButtonClasses = "text-submit-button-text bg-submit-button"
  return (
    <button
      name={name}
      className={"ml-4 py-2 px-5 rounded-md border border-1 font-semibold" + ' ' + className + ' ' + primaryButtonClasses}
      data-testid={`${name}-id`}
      {...props}
    >
      {props.children}
    </button>
  )
}
