import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { mixed, object, string } from "yup";
import { categoryStoreApi } from "../../services/CategoryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type CategoryFormInputs = {
  parent?: string | null | undefined;
  position: string;
  name: string;
  slug: string;
  description: string;
  displayMode?: string | null | undefined;
  status: string;
  categoryIcon?: File | any | null | undefined;
  additional?: string | null | undefined;
};

const validation = object().shape({
  parent: string().nullable(),
  position: string().required("Position is required."),
  name: string().required("Name is required."),
  slug: string().required("Slug is required."),
  description: string().required("Description is required."),
  displayMode: string().nullable(),
  status: string().required("Status is required."),
  categoryIcon: mixed()
    .nullable()
    .test("fileType", "File must be an image (jpg, jpeg, png)", (value) => {
      if (!value) return true; // Allow null values
      if (value instanceof FileList && value?.length === 0) return true;
      if (value instanceof File) {
        const supportedFormats = ["image/jpeg", "image/png", "image/jpg"];
        return supportedFormats.includes(value.type);
      }
      return false;
    }),
  additional: string().nullable(),
});

const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInputs>({
    resolver: yupResolver(validation, { strict: true }),
  });

  const handleCategorySubmit = (form: CategoryFormInputs) => {
    categoryStoreApi(
      form.parent,
      form.position,
      form.name,
      form.slug,
      form.description,
      form.displayMode,
      form.categoryIcon,
      parseInt(form.status),
      form.additional
    )
      .then((res) => {
        if (res) {
          console.log(res);
          toast.success("Category created successfully");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  return (
    <>
      <h3 className="text-white-75">Create Cateogory</h3>
      <form
        className="flex flex-col gap-[2rem] border-1 border-white-25 rounded-md p-[1.5rem]"
        onSubmit={handleSubmit(handleCategorySubmit)}
      >
        <div className="flex gap-[2rem] justify-between">
          <div className="relative flex-1/2">
            <input
              {...register("parent")}
              type="text"
              id="parent"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder=""
            />
            <label
              htmlFor="parent"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Parent Category
            </label>
            {errors.parent ? (
              <p className="text-red-400 text-[14px]">
                {errors.parent.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="relative flex-1/2">
            <input
              {...register("position")}
              type="text"
              id="position"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder=""
              required
            />
            <label
              htmlFor="position"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Position
            </label>
            {errors.position ? (
              <p className="text-red-400 text-[14px]">
                {errors.position.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex gap-[2rem] justify-between">
          <div className="relative flex-1/2">
            <input
              {...register("name")}
              type="text"
              id="name"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder=""
              required
            />
            <label
              htmlFor="name"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Name
            </label>
            {errors.name ? (
              <p className="text-red-400 text-[14px]">{errors.name.message}</p>
            ) : (
              ""
            )}
          </div>
          <div className="relative flex-1/2">
            <input
              {...register("slug")}
              type="text"
              id="slug"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder=""
            />
            <label
              htmlFor="slug"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Slug
            </label>
            {errors.slug ? (
              <p className="text-red-400 text-[14px]">{errors.slug.message}</p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="relative">
          <textarea
            {...register("description")}
            id="description"
            className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary min-h-[1.875rem] h-[1.875rem]"
            placeholder=""
            required
          />
          <label
            htmlFor="description"
            className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
          >
            Description
          </label>
          {errors.description ? (
            <p className="text-red-400 text-[14px]">
              {errors.description.message}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="flex gap-[2rem] justify-between">
          <div className="relative flex-1/2">
            <input
              {...register("displayMode")}
              type="text"
              id="displayMode"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder=""
            />
            <label
              htmlFor="displayMode"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Display Mode
            </label>
            {errors.displayMode ? (
              <p className="text-red-400 text-[14px]">
                {errors.displayMode.message}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="relative flex-1/2">
            <input
              {...register("status")}
              type="text"
              id="status"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder=""
              required
            />
            <label
              htmlFor="status"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Status
            </label>
            {errors.status ? (
              <p className="text-red-400 text-[14px]">
                {errors.status.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex justify-around">
          <div className="relative">
            <input
              {...register("categoryIcon")}
              type="file"
              id="categoryIcon"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder="asdf"
            />
            <label
              htmlFor="categoryIcon"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Category Icon
            </label>
            {errors.categoryIcon ? (
              <p className="text-red-400 text-[14px]">
                {typeof errors.categoryIcon === "string"
                  ? errors.categoryIcon
                  : ""}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <input
              {...register("additional")}
              type="string"
              id="additional"
              className="block w-full pb-1 border-b-1 border-white-50 peer focus:outline-0 focus:border-b-secondary"
              placeholder=""
            />
            <label
              htmlFor="additional"
              className="text-white-50 absolute top-[-1.25rem] scale-75 origin-[0] peer-focus:text-secondary peer-focus:scale-75 peer-focus:top-[-1.25rem] peer-placeholder-shown:scale-100 peer-placeholder-shown:top-0 transition-color transition-scale transition-top duration-200 ease-out"
            >
              Additional
            </label>
            {errors.additional ? (
              <p className="text-red-400 text-[14px]">
                {errors.additional.message}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-secondary w-[12rem] h-[3.5rem] mx-auto rounded-[.5rem] hover:shadow-xl shadow-white-15 transition-shadow ease-out text-black-75 font-bold text-[1.3rem] hover:text-black"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default Create;
