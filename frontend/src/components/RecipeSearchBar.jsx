import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

export default function RecipeSearchBar({ value, onChange }) {
  return (
    <div className="max-w-md mx-auto mb-8 relative text-secondary-foreground">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-foreground" />
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search recipes..."
        className="pl-10 border-primary focus-visible:ring-primary text-secondary-foreground"
      />
    </div>
  );
}

RecipeSearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
