import { useFormikContext } from "formik";
import styled from "styled-components";
import { useState } from "react";
import { Map as MapIcon } from "lucide-react";
import LocalizationModal from "@/components/modals/LocalizationModal";
import FormikInputField from "@/components/forms/FormikInputField";

interface FormikLocalizationFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
  disabled?: boolean;
  margin?: string;
  padding?: string;
}

const FormikLocalizationField: React.FC<FormikLocalizationFieldProps> = ({
  name,
  label,
  isRequired = false,
  disabled = false,
  margin,
  padding,
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const handleLocalizationSelect = async (selectedLocalization: string) => {
    await setFieldValue(name, selectedLocalization);
    setFieldTouched(name, true);
    hideModal();
  };

  return (
    <FieldWrapper>
      <InputContainer>
        <FormikInputField
          name={name}
          label={label}
          type="text"
          isRequired={isRequired}
          disabled={disabled}
          margin={margin}
          padding={padding}
        />
        <LocalizationIcon $disabled={disabled} onClick={showModal} />
      </InputContainer>

      <LocalizationModal
        isVisible={isModalVisible}
        onClose={hideModal}
        onLocalizationSelect={handleLocalizationSelect}
        languageCode="pl"
      />
    </FieldWrapper>
  );
};

export default FormikLocalizationField;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const LocalizationIcon = styled(MapIcon)<{ $disabled?: boolean }>`
  position: absolute;
  top: 34px;
  right: 20px;
  color: var(--dark);
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  transition: transform 0.3s ease;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:hover {
    transform: ${({ $disabled }) => ($disabled ? "none" : "scale(1.1)")};
  }
`;
