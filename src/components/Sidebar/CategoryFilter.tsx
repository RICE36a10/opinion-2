import { Categories } from "@/utils/constants/Categories";
import styled from "styled-components";
import { useState } from "react";
interface CategoryItemProps {
  selected: boolean;
}
const CategoryWrapper = styled.div`
  display: flex;
  padding: 24px;
  gap: 8px;
  flex-wrap: wrap;
  background: var(--primary-color);
  border-radius: var(--border-radius);
  @media (min-width: 768px) and (max-width: 1024px) {
    flex: 1;
  }
`;
const CategoryItem = styled.button<CategoryItemProps>`
  background: ${({ selected }) =>
    !selected ? `var(--bg-secondary)` : `var(--link-color)`};
  color: ${({ selected }) =>
    !selected ? `var(--link-color)` : `var(--primary-color)`};
  padding: 6px 16px;
  font-weight: 600;
  font-size: var(--body3-size);
  line-height: var(--body3-line);
  border-radius: var(--border-radius);
  transition: var(--transition);
  font-family: "Jost", sans-serif;
  &:hover {
    ${({ selected }) => !selected && ` background: var(--hover-color)`}
  }
`;
const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    Categories[0]
  );
  return (
    <CategoryWrapper>
      {Categories.map((category, index) => (
        <CategoryItem
          key={index}
          type="button"
          selected={selectedCategory === category}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </CategoryItem>
      ))}
    </CategoryWrapper>
  );
};

export default CategoryFilter;
