import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";
import apiClient from "@/utils/apiClient";
import { Category } from "@/types/interfaces";

interface CategoriesContextType {
  categories: Category[];
  isCategoriesLoading: boolean;
}

interface CategoriesProviderProps {
  children: ReactNode;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState<boolean>(true);

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await apiClient.get<Category[]>("/categories");
      const transformedCategories = response.data.map((category) => ({
        ...category,
        name: t(`category${category.id}`),
      }));
      setCategories(transformedCategories);
      console.log(transformedCategories);
    } catch (error) {
      console.error("Error while fetching categories:", error);
    } finally {
      setIsCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isCategoriesLoading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }

  return context;
};
