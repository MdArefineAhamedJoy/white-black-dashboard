import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

const AddProduct = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const mutation = useMutation((data) =>
        fetch("http://localhost:5000/admin/product/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    );

    const handleImageChange = (e) => {
        const url = e.target.value;
        if (url && imageUrls.length < 5) {
            setImageUrls((prevUrls) => [...prevUrls, url.toLowerCase()]);
        }
    };

    const toLowerCaseFields = (data) => {
        Object.keys(data).forEach((key) => {
            if (typeof data[key] === "string") {
                data[key] = data[key].toLowerCase();
            } else if (Array.isArray(data[key])) {
                data[key] = data[key].map((item) =>
                    typeof item === "string" ? item.toLowerCase() : item
                );
            }
        });
    };

    const onSubmit = (data) => {
        toLowerCaseFields(data);
        data.images = imageUrls;
        mutation.mutate(data);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Add Product Section</h1>
            <h1>Habi jabi from</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 grid grid-cols-2 gap-6"
            >
                <div className="col-span-2">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        {...register("title", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div className="col-span-2">
                    <label
                        htmlFor="color"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Color (comma-separated)
                    </label>
                    <input
                        id="color"
                        {...register("color", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.color && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>
                <div className="col-span-1">
                    <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Price
                    </label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.price && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>
                <div className="col-span-1">
                    <label
                        htmlFor="size"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Size (comma-separated)
                    </label>
                    <input
                        id="size"
                        {...register("size", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.size && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div className="col-span-1">
                    <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Status (New or Sold Out)
                    </label>
                    <select
                        id="status"
                        {...register("status", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select...</option>
                        <option value="New">New</option>
                        <option value="Sold Out">Sold Out</option>
                    </select>
                    {errors.status && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div className="col-span-1">
                    <label
                        htmlFor="discount"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Discount
                    </label>
                    <input
                        id="discount"
                        type="number"
                        step="1"
                        {...register("discount", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.discount && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Category
                    </label>
                    <select
                        id="category"
                        {...register("category", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select...</option>
                        <option value="tshirt">T-shirt</option>
                        <option value="polos">Polos</option>
                        <option value="headwear">Headwear</option>
                        <option value="begs/wallets">Bags/Wallets</option>
                        <option value="shirt">Shirt</option>
                        <option value="jackets">Jackets</option>
                        <option value="headware">Headware</option>
                        <option value="bottomware">Bottomware</option>
                        <option value="deals">Deals</option>
                        <option value="accessories">Accessories</option>
                        <option value="new">New</option>
                        <option value="deal">Deal</option>
                    </select>
                    {errors.category && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>
                <div className="col-span-1">
                    <label
                        htmlFor="fit"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Fit
                    </label>
                    <select
                        id="fit"
                        {...register("fit", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="">Select...</option>
                        <option value="Regular Fit">Regular Fit</option>
                        <option value="Slim Fit">Slim Fit</option>
                    </select>
                    {errors.fit && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="material"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Material
                    </label>
                    <input
                        id="material"
                        {...register("material", { required: true })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.material && (
                        <span className="text-red-500 text-sm">This field is required</span>
                    )}
                </div>

                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Images (Up to five URLs)
                    </label>
                    <input
                        type="text"
                        onChange={handleImageChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <div className="mt-2 flex gap-3">
                        {imageUrls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Image ${index + 1}`}
                                className="w-24 h-24 object-cover mr-2 mb-2 rounded-md"
                            />
                        ))}
                    </div>
                </div>

                <div className="col-span-2">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
