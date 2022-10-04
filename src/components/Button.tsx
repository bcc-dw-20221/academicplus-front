interface IButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  typeCTA?: "success" | "cancel";
  onClick?: () => void;
}

export default function Button({
  text,
  type = "button",
  typeCTA = "success",
}: IButtonProps) {
  const CTA =
    typeCTA === "success"
      ? `
      bg-success-default
      hover:bg-success-hover 
      focus:bg-success-hover
      focus:outline-success-default
  `
      : `
      bg-cancel-default
      hover:bg-cancel-hover  
      focus:bg-cancel-hover
      focus:outline-cancel-default
  `;

  return (
    <button
      className={`px-6 py-2 ${CTA} text-white font-medium rounded transition-colors
      focus:outline-2`}
      type={type}
    >
      {text}
    </button>
  );
}
