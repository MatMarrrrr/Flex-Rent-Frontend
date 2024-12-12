import React, { useState, useRef } from "react";
import styled from "styled-components";
import arrowDownBlack from "./../../assets/icons/arrowDownBlack.svg";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  options: Option[];
  defaultValue: string;
  isRequired?: boolean;
  margin?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  defaultValue,
  isRequired = false,
  margin,
  onChange,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleOptionClick = (value: string, optionValue: string) => {
    setSelectedValue(value);
    setIsOpen(false);

    if (selectRef.current) {
      selectRef.current.value = optionValue;

      const event = new Event("change", { bubbles: true });
      selectRef.current.dispatchEvent(event);
    }

    onChange && onChange(optionValue);
  };

  return (
    <Container $margin={margin}>
      <LabelText>
        {isRequired && <RequiredStar>* </RequiredStar>}
        {label}
      </LabelText>
      <Dropdown>
        <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
          {selectedValue}
          <ArrowIcon src={arrowDownBlack} $isOpen={isOpen} />
        </DropdownHeader>
        {isOpen && (
          <DropdownList>
            {options.map((option) => (
              <DropdownItem
                key={option.value}
                onClick={() => handleOptionClick(option.label, option.value)}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownList>
        )}

        <HiddenSelect
          ref={selectRef}
          name={name}
          required={isRequired}
          value={
            options.find((opt) => opt.label === selectedValue)?.value || ""
          }
          onChange={(e) => {
            const selectedOption = options.find(
              (opt) => opt.value === e.target.value
            );
            if (selectedOption) {
              setSelectedValue(selectedOption.label);
              onChange && onChange(selectedOption.value);
            }
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
  margin: 0;
  padding: 0;
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
