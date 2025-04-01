interface FormSelectProps {
  htmlFor: string;
  nameLabel: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({htmlFor, nameLabel, name, value, onChange, required }) => {
  return (
    <>
      <label className="mt-3" htmlFor={htmlFor}>{nameLabel}:</label>
      <select name={name} value={value} onChange={onChange} required={required}>
        <option value={0}>Selecione um status</option>
        <option value={1}>Em estoque</option>
        <option value={2}>Em reposição</option>
        <option value={3}>Em falta</option>
      </select>
    </>
  );
};
