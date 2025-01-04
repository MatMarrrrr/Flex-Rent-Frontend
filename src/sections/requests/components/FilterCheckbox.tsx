import styled from "styled-components";

interface FilterCheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  label,
  isChecked,
  onChange,
}) => (
  <CheckboxContainer>
    <CheckboxWrapper>
      <Checkbox type="checkbox" checked={isChecked} onChange={onChange} />
      <CustomCheckbox />
    </CheckboxWrapper>
    <Label>{label}</Label>
  </CheckboxContainer>
);

export default FilterCheckbox;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: var(--light);
  border-radius: 8px;
  max-width: fit-content;
  border: 1px solid var(--gray);
  transition: background-color 0.2s, border-color 0.2s;

  &:hover {
    background-color: var(--light-hover);
    border-color: var(--primary);
  }
`;

const CheckboxWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
`;

const Checkbox = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;

  &:checked + div {
    background-color: var(--dark);
  }

  &:checked + div::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%) rotate(45deg);
    width: 6px;
    height: 12px;
    border: solid var(--light);
    border-width: 0 2px 2px 0;
  }
`;

const CustomCheckbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--white);
  border: 2px solid var(--dark);
  border-radius: 4px;
  transition: background-color 0.2s, border-color 0.2s;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: var(--dark);
  user-select: none;
`;
