import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { useStyletron } from "baseui";
import { useFieldArray, Controller,DeepMap, FieldError } from "react-hook-form";
import { Error, FormFields } from "../../components/FormFields/FormFields";
import { CloseIcon } from "../../assets/icons/CloseIcon";



type Errors={
    name:string|undefined
    emails:IEmail[]|undefined
    phones:IPhone[]|undefined
}

export const EmailFields: React.FC<{ control: any; errors: DeepMap<Errors,FieldError>,register:any }> = ({
  control,
  errors,
  register,
}) => {
  const [css, theme] = useStyletron();


  const { fields, append,remove } = useFieldArray({
    control,
    name: "emails",
    keyName: "_id",
  });

  return (
    <>
      {fields.map((item, index) => {
        return (
          <FormFields key={item._id}>
              <div className={css({display:"flex",alignItems:"center"})}>
            <Controller
              name={`emails[${index}].email`}
              control={control}
              defaultValue={item.email}
              render={({ onChange, onBlur, value, ref }) => (
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                />
              )}
            />{index>0&&
             <div className={css({marginLeft:"8px",marginRight:"-28px"})}>
                    <Button
              shape="round"
              size="mini"
              kind="minimal"

              onClick={()=>remove(index)}

            >  <CloseIcon height={8} width={8} color={theme.colors.negative400}/>
            </Button>
                </div>}
            </div>
            <input type="hidden" name={`emails[${index}].id`} ref={register()}  value={item.id}/>
{errors?.emails&&(
    errors.emails[index]&&<Error>{errors.emails[index]?.email?.message}</Error>)}

          </FormFields>
        );
      })}

      <div
        className={css({
          width: "100%",
          marginTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        <Button
          size="compact"
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
          onClick={(e) => {
            e.preventDefault();
            append({ email: "",id:"" });
          }}
        >
          <PlusIcon />
        </Button>
      </div>
    </>
  );
};

export const PhoneFields: React.FC<{ control: any; errors: DeepMap<Errors,FieldError>,register:any}> = ({
  control,
  errors,
  register,
}) => {
  const [css, theme] = useStyletron();

  const { fields, append,remove } = useFieldArray({
    control,
    name: "phones",
    keyName: "_id",
  });

  return (
    <>
      {fields.map((item, index) => {
        return (
          <FormFields key={item._id}>
              <div className={css({display:"flex",alignItems:"center"})}>
            <Controller
              name={`phones[${index}].phone`}
              control={control}
              defaultValue={item.phone}
              render={({ onChange, onBlur, value, ref }) => (
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
            
                {index>0&&<div className={css({marginLeft:"8px",marginRight:"-28px"})}>
                    <Button
              shape="round"
              size="mini"
              kind="minimal"
              onClick={()=>remove(index)}
            >  <CloseIcon height={8} width={8} color={theme.colors.negative400} />
            </Button>
                </div>}
              
            </div>
        <input type="hidden" name={`phones[${index}].id`} ref={register()} value={item.id}/>
{errors?.phones&&(
    errors.phones[index]&&<Error>{errors.phones[index]?.phone?.message}</Error>)}
          </FormFields>
        );
      })}

      <div
        className={css({
          width: "100%",
          marginTop: "10px",
          display: "flex",
          justifyContent: "flex-end",
        })}
      >
        <Button
          size="compact"
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
          onClick={(e) => {
            e.preventDefault();
            append({ phone: "",id:"" });
          }}
        >
          <PlusIcon />
        </Button>
      </div>
    </>
  );
};
