import React, { useState, useRef } from "react";
import styled from "styled-components";
import { ChevronDown as ChevronDownIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  value: string;
  startValue: string;
  isRequired?: boolean;
  margin?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  startValue,
  isRequired = false,
  margin,
  onChange,
  name,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterText, setFilterText] = useState("");
  const selectRef = useRef<HTMLSelectElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (val: string) => {
    setIsOpen(false);
    setFilterText("");
    if (onChange) onChange(val);
  };

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setFilterText("");
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filterText.toLowerCase().trim())
  );

  return (
    <Container $margin={margin}>
      <LabelText>
        {isRequired && <RequiredStar>* </RequiredStar>}
        {label}
      </LabelText>
      <Dropdown>
        <DropdownHeader onClick={handleSelectClick} $disabled={disabled}>
          {selectedOption ? selectedOption.label : startValue}
          <ArrowIcon $isOpen={isOpen} $disabled={disabled} />
        </DropdownHeader>
        {isOpen && (
          <DropdownContainer>
            <SearchInput
              type="text"
              placeholder="Wyszukaj..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <OptionsList>
              {filteredOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </DropdownItem>
              ))}
              {filteredOptions.length === 0 && (
                <NoOptionsMessage>Nie znaleziono opcji</NoOptionsMessage>
              )}
            </OptionsList>
          </DropdownContainer>
        )}

        <HiddenSelect
          ref={selectRef}
          name={name}
          required={isRequired}
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e.target.value);
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </HiddenSelect>
      </Dropdown>
    </Container>
  );
};

export default Select;

const Container = styled.div<{ $margin?: string }>`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  position: relative;
  margin: ${({ $margin }) => $margin || "0"};
`;

const LabelText = styled.p`
  font-size: 18px;
  color: var(--dark);
  width: 100%;
  margin: 0 0 8px 0;
`;

const Dropdown = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div<{ $disabled?: boolean }>`
  border: 1px solid var(--dark-25);
  border-radius: 5px;
  height: 45px;
  font-size: 18px;
  padding: 0 10px;
  background: ${({ $disabled }) =>
    $disabled ? "var(--dark-2)" : "var(--white)"};
  color: ${({ $disabled }) => ($disabled ? "var(--dark-80)" : "var(--dark)")};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowIcon = styled(ChevronDownIcon)<{
  $isOpen: boolean;
  $disabled: boolean;
}>`
  height: 24px;
  width: 24px;
  color: var(--dark);
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  color: ${({ $disabled }) => ($disabled ? "var(--dark-80)" : "var(--dark)")};
  user-select: none;
`;

const DropdownContainer = styled.div`
  position: absolute;
  width: 100%;
  max-height: 280px;
  margin: 0;
  padding: 10px;
  border: 1px solid var(--dark-25);
  border-top: 0;
  border-radius: 5px;
  background: var(--white);
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const OptionsList = styled.ul`
  flex: 1;
  overflow-y: auto;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 10px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: var(--light);
  }
`;

const RequiredStar = styled.span`
  color: red;
  margin-right: 4px;
`;

const HiddenSelect = styled.select`
  display: none;
`;

const SearchInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 10px;
  border: 1px solid var(--dark-25);
  border-radius: 5px;
  font-size: 16px;
`;

const NoOptionsMessage = styled.p`
  text-align: center;
  padding: 10px;
  color: var(--dark-50);
  font-size: 16px;
`;
