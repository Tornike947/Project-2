import { toast } from "react-toastify";
import { useState } from "react";
import { useInput } from "@/Hooks";
import { categoryStore } from "@/Stores";
import { isValid } from "@/Utils";
import categoryServices from "@/Services/CategoryServices";

const HandleCategory = () => {
  const [addMode, setAddMode] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { addCategory, deleteCategory, categories } = categoryStore();
  const categoryInput = useInput((value) => isValid(value));

  const handleAdd = () => {
    if (categoryInput.hasError || !categoryInput.value) {
      toast.error("Please enter a valid category");
      return;
    }
    categoryServices
      .addCategory({ name: categoryInput.value as string })
      .then(({ data }) => {
        addCategory(data);
        toast.success("Category added successfully");
        handleClose();
      })
      .catch(() => {
        toast.error("Error while adding category");
      });
  };
  const handleDelete = () => {
    if (!selectedKeys.length) {
      toast.error("Please select a category to delete");
      return;
    }
    new Promise<void>((resolve, reject) => {
      selectedKeys.forEach((id) => {
        categoryServices
          .deleteCategory(id)
          .then(() => {
            deleteCategory(id);
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    });
  };
  const handleClose = () => {
    categoryInput.clear();
    setAddMode(false);
  };
  const handleSelect = (id: string) => {
    if (selectedKeys.includes(id)) {
      setSelectedKeys(selectedKeys.filter((key) => key !== id));
    } else {
      setSelectedKeys([...selectedKeys, id]);
    }
  };
  const handleSelectAll = () => {
    if (selectedKeys.length === categories.length) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(categories.map((category) => category.id));
    }
  };

  return {
    handleAdd,
    handleDelete,
    handleSelect,
    handleSelectAll,
    selectedKeys,
    setSelectedKeys,
    addMode,
    setAddMode,
    categoryInput,
    handleClose,
  };
};

export default HandleCategory;
