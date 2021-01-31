import React from "react";
import Button from "../../components/Button/Button";
import {
  Error,
  FormFields,
  FormLabel,
} from "../../components/FormFields/FormFields";
import Input from "../../components/Input/Input";
import { useModalDispatch } from "../../context/ModalContext";
import {
  Form,
  ModalTitleWrapper,
  ModalTitle,
} from "../ModalItems/ModalItems.style";
// import { PlusIcon } from "../../assets/icons/PlusIcon";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneFields, EmailFields } from "./Fields";
import { addContact, useContact } from "../../api/hooks";
import _ from "lodash";
import { addServerErrors } from "../../utils/add-server-errors";
import{FormWrapper,ButtonWrapper} from "./ContactForm.style";

declare module "yup"{
    interface ArraySchema<T>{
        unique(propertyPath:string,message:string):ArraySchema<T>
    }
}

yup.addMethod(yup.array, "unique", function (propertyPath:string, message:string) {
  return this.test("unique", "", function (list) {
    const errors: any = [];

    list?.forEach((item, index) => {
      const propertyValue = _.get(item, propertyPath);

      if (
        propertyValue &&
        _.filter(list, [propertyPath, propertyValue]).length > 1
      ) {
        errors.push(
          this.createError({
            path: `${this.path}[${index}].${propertyPath}`,
            message,
          })
        );
      }
    });

    if (!_.isEmpty(errors)) {
      throw new yup.ValidationError(errors);
    }

    return true;
  });
});

const EmailSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email required")
    .email("Incorrect email format"),
});
const PhoneSchema = yup.object().shape({
  phone: yup.string().min(7, "Number length must be 7 or more"),
});
const ContactSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  //@ts-ignore
  emails: yup
    .array()
    .of(EmailSchema)
    .unique("email", "Email may not have duplicates"),
  //@ts-ignore
  phones: yup
    .array()
    .of(PhoneSchema)
    .unique("phone", "Phone may not have duplicates"),
});



const ContactForm: React.FC<any> = (props) => {
  const [updating, setUpdating] = React.useState(false);
  const { mutate } = useContact();

  const dispatch = useModalDispatch();
  //   const data = useModalState("data");
  const closeModal = React.useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  );

  const { control, handleSubmit, errors, register, setError } = useForm({
    defaultValues: {
      name: "",
      emails: [{ email: "" }],
      phones: [{ phone: "" }],
    },
    resolver: yupResolver(ContactSchema),
  });

  const onSubmit: SubmitHandler<IContact> = (formData) => {
    setUpdating(true);
   
    addContact(formData)
      .then((res) => {
        mutate()
          .then(() => {
            closeModal();
          })
          .catch((err) => console.log(err));

        console.log(res);
      })
      .catch((err) => {
        if (err.response.data.errors) {
          addServerErrors<{}>(err.response?.data?.errors, setError);
        } else {
          addServerErrors<{}>({ server: ["Unknown server error"] }, setError);
          alert("Unknown server error");
          console.log(errors);
        }
        console.log(err.response);
            setUpdating(false)
        }).finally(()=>setUpdating(false))
     
    
    console.log("data", formData);
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalTitleWrapper>
          <ModalTitle>Add Contact</ModalTitle>
        </ModalTitleWrapper>
        <FormFields>
          <FormLabel>Contact Name</FormLabel>
          <Controller
            name="name"
            control={control}
            defaultValue={""}
            render={({ onChange, onBlur, value, ref }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                inputRef={ref}
              />
            )}
          />
          {errors?.name && <Error>{errors.name?.message}</Error>}
        </FormFields>
        <FormFields>
          <FormLabel>Phone Number(s)</FormLabel>
          <PhoneFields register={register} errors={errors} control={control} />
        </FormFields>
        <FormFields>
          <FormLabel>Email(s)</FormLabel>
          <EmailFields register={register} errors={errors} control={control} />
        </FormFields>
        <ButtonWrapper>
          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  backgroundColor: $theme.colors.positive300,
                  ":hover": {
                    backgroundColor: $theme.colors.positive400,
                  },
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }),
              },
            }}
            isLoading={updating}
          >
            Add Contact
          </Button>
        </ButtonWrapper>
      </Form>
    </FormWrapper>
  );
};

export default ContactForm;
