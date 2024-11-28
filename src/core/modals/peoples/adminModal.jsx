import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setadmin_data, set_edit_admin } from "../../redux/action";

const AdminModal = ({ curAdmin, setCurAdmin }) => {
  const countriesOptions = [
    { value: "unitedkingdom", label: "UK" },
    { value: "unitedstates", label: "US" },
    { value: "germany", label: "Germany" },
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (curAdmin) {
      Object.keys(curAdmin).forEach((key) => {
        if (key === "Country") {
          console.log(curAdmin);
          setValue(
            "Country",
            countriesOptions.find((opt) => opt.value === curAdmin[key]?.value)
          );
        } else {
          setValue(key, curAdmin[key]);
        }
      });
    }
  }, [curAdmin]);

  const dispatch = useDispatch();

  const handleReset=()=>{
    console.log("Emptied")
    reset({
      Avatar: null,
      AdminName: "",
      Email: "",
      Phone: "",
      Address: "",
      City: "",
      Country: null,
      Desc: "",
    });
    setUploadedImage(null);
    
  }
  const handleImageChange = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log(data);
    const updatedData = {
      ...data,
      // Country: data.Country?.value || "",
      // Avatar: JSON.stringify(uploadedImage),
      id: curAdmin ? curAdmin.id : Math.random().toString(36),
    };

    if (curAdmin) {
      console.log("ssssssss", updatedData);
      dispatch(set_edit_admin(updatedData));
      setCurAdmin(null);
      handleReset();
      console.log("Edit",curAdmin)
    } else {
      console.log(updatedData);
      dispatch(setadmin_data(updatedData));
      setCurAdmin(null);
      handleReset();
      console.log("ADD",curAdmin)
    }

    document.getElementById("AddcloseButton").click();
  };

  return (
    <div className="modal fade" id="add-units">
      <div className="modal-dialog modal-dialog-centered custom-modal-two">
        <div className="modal-content">
          <div className="modal-header border-0 custom-modal-header">
            <h4>{curAdmin ? "Edit Admin" : "Add Admin"}</h4>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="AddcloseButton"
              onClick={()=>{curAdmin && handleReset();
              setCurAdmin(null)}}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body custom-modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Avatar Upload */}
              <div className="mb-4">
                <label className="form-label">Avatar</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="form-control"
                />
                {uploadedImage && <p>Selected image: {uploadedImage.name}</p>}
              </div>

              {/* Form Fields */}
              <div className="row">
                <FormInput
                  label="Admin Name"
                  name="AdminName"
                  register={register}
                  errors={errors}
                  validation={{ required: "Admin Name is required" }}
                />
                <FormInput
                  label="Email"
                  name="Email"
                  type="email"
                  register={register}
                  errors={errors}
                  validation={{ required: "Email is required" }}
                />
                <FormInput
                  label="Phone"
                  name="Phone"
                  register={register}
                  errors={errors}
                  validation={{ required: "Phone number is required" }}
                />
                <FormInput
                  label="Address"
                  name="Address"
                  register={register}
                  errors={errors}
                  validation={{ required: "Address is required" }}
                />
                <FormInput
                  label="City"
                  name="City"
                  register={register}
                  errors={errors}
                  validation={{ required: "City is required" }}
                />

                {/* Country Selector */}
                <div className="col-lg-6">
                  <label className="form-label">Country</label>
                  {/* <Controller
                    name="Country"
                    control={control}
                    render={({ field }) => (
                      console.log(field),
                      (
                        <Select
                          {...field}
                          options={countriesOptions}
                          classNamePrefix="react-select"
                          placeholder="Select a country"
                          defaultValue={field?.Country?.label || null}
                        />
                      )
                    )}
                  /> */}
                  <Controller
                    name="Country"
                    control={control}
                    defaultValue={curAdmin?.Country?.label || null} // Provide the default value during initialization
                    render={({ field }) => (
                      console.log(field,curAdmin),
                      <Select
                        {...field}
                        options={countriesOptions}
                        classNamePrefix="react-select"
                        placeholder="Select a country"
                        value={field.value} 
                        onChange={(selectedOption) =>
                          field.onChange(selectedOption)
                        } 
                      />
                    )}
                  />

                  {errors.Country && (
                    <p className="text-danger">Country is required</p>
                  )}
                </div>

                <div className="col-lg-12">
                  <label className="form-label">Descriptions</label>
                  <textarea
                    className="form-control"
                    {...register("Desc", {
                      required: "Description is required",
                      maxLength: {
                        value: 60,
                        message: "Description cannot exceed 60 characters",
                      },
                    })}
                  />
                  {errors.Desc && (
                    <p className="text-danger">{errors.Desc.message}</p>
                  )}
                  <p>Maximum 60 characters</p>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="modal-footer-btn">
                {/* <button
                  type="button"
                  className="btn btn-cancel me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button> */}
                <button type="submit" className="btn btn-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  errors,
  validation,
}) => (
  <div className="col-lg-6">
    <label className="form-label">{label}</label>
    <input
      type={type}
      className="form-control"
      {...register(name, validation)}
    />
    {errors[name] && <p className="text-danger">{errors[name].message}</p>}
  </div>
);

export default AdminModal;
