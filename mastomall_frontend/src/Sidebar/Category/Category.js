import "./Category.css";
import Input from "../../Components/Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="electronics"
          title="Electronics"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="book"
          title="Book"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="furniture"
          title="Furniture"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="clothing"
          title="Clothing"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
