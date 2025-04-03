import "../../styles/components/formInput.scss";

interface FormInputProps {
  type?: "text" | "number" | "password";
  id: string;
  name: string;
  value: string | number;
  htmlFor: string;
  nameLabel: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({htmlFor, nameLabel, type = "text", id, name, value, placeholder, onChange, required }) => {
  return (
    <>
      <label className="mt-3" htmlFor={htmlFor}>{nameLabel}:</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
      />
    </>
  );
};