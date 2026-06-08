import "./index.css";

const CategoriesTabs = (props) => {
  const { eachCategory, activeCategory, categoryChange } = props;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChangeCategory = () => {
    categoryChange(eachCategory.slug);
    scrollToTop();
  };

  return (
    <button
      type="button"
      className={
        activeCategory === eachCategory.slug
          ? "category-btn active"
          : "category-btn"
      }
      onClick={onChangeCategory}
    >
      {eachCategory.name}
    </button>
  );
};

export default CategoriesTabs;
