export const PrimaryButton = ({
  /**Name Attribute - also used in to define data-test-id */
  name,
  ...props
}) => {
  return (
    <button
      name={name}
      className="ml-4 text-submit-button-text bg-submit-button py-1.5 px-3 rounded-sm font-semibold"
      data-testid={`${name}-id`}
      {...props}
    >
      {props.children}
    </button>
  )
}
