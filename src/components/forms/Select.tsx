import React, { useState, useRef } from "react";
import styled from "styled-components";
import arrowDownBlack from "@/assets/icons/arrowDownBlack.svg";

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
    setIsOpen(!isOpen);
    setFilterText("");
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
        <DropdownHeader onClick={handleSelectClick}>
          {selectedOption ? selectedOption.label : startValue}
          <ArrowIcon src={arrowDownBlack} $isOpen={isOpen} />
        </DropdownHeader>
        {isOpen && (
          <DropdownList>
            <SearchInput
              type="text"
              placeholder="Wyszukaj..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
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
          </DropdownList>
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

const DropdownHeader = styled.div`
  border: 1px solid var(--dark-25);
  border-radius: 5px;
  height: 45px;
  font-size: 18px;
  padding: 0 10px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowIcon = styled.img<{ $isOpen: boolean }>`
  height: 24px;
  background-size: contain;
  background-repeat: no-repeat;
  transition: transform 0.3s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  user-select: none;
`;

const DropdownList = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 264px;
  overflow-y: scroll;
  margin: 0;
  padding: 10px;
  list-style: none;
  border: 1px solid var(--dark-25);
  border-top: 0;
  border-radius: 5px;
  background: #fff;
  z-index: 10;
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
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
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
