import { Layout } from "@/components/Layout";
import Button from "@/components/form/Button";
import Input from "@/components/form/Input";
import * as React from "react";
import { FieldValues, SubmitHandler, useForm, useFieldArray, Controller } from 'react-hook-form';
import toast from "react-hot-toast";
import axios from "axios"
import { DEFAULT_TOAST_MESSAGE } from "@/constant/toast";
import { useRouter } from "next/router";

export default function index() {

    const router = useRouter()

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }
    ];

    const [isLoading, setIsloading] = React.useState(false)
    const {
        register,
        handleSubmit,
        control,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            body: [],
            conditions: [],
            action: {
                atribute: '',
                label: '',
                type: ''
            },
            description: {
                condition: '',
                action: ''
            },
            rule: [],
        }
    })

    const {
        fields: bodyFields,
        append: bodyAppend,
        remove: bodyRemove,
    } = useFieldArray({
        control,
        name: "body",
    });
    const {
        fields: conditionsFields,
        append: conditionsAppend,
        remove: conditionsRemove,
    } = useFieldArray({
        control,
        name: "conditions",
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        toast.promise(
            axios.post(`api/static`, data)
              .then((res) => {
                router.push('/')
              }),
            {
              ...DEFAULT_TOAST_MESSAGE,
              success: 'Ruleset Successfully Created',
            }
          );

    }
    return (
        <Layout>
            <section className="layout">
                <button onClick={()=>router.back()}>
                    back
                </button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        id="name"
                        disabled={isLoading}
                        errors={errors}
                        register={register}
                        label="name"
                        required
                    />
                    {/* <Input
                        id="endpoint"
                        disabled={isLoading}
                        errors={errors}
                        register={register}
                        label="endpoint"
                        required
                    /> */}
                    <Input
                        id="description.condition"
                        disabled={isLoading}
                        errors={errors}
                        register={register}
                        label="deskripsi kondisi"

                    />
                    <Input
                        id="description.action"
                        disabled={isLoading}
                        errors={errors}
                        register={register}
                        label="deskripsi aksi"

                    />
                    <div>
                        <label>
                            Body
                        </label>
                        <ul>
                            {bodyFields.map((item, index) => {
                                return (
                                    <li key={item.id}>
                                        <input
                                            {...register(`body.${index}.name`, { required: true })}
                                        />

                                        <Controller
                                            render={({ field }) => <select {...field}>
                                                <option value="" disabled>pilih</option>
                                                <option value="volvo">Volvo</option>
                                                <option value="saab">Saab</option>
                                                <option value="opel">Opel</option>
                                                <option value="audi">Audi</option>
                                            </select>}
                                            name={`body.${index}.type`}
                                            control={control}
                                        />
                                        <button type="button" onClick={() => bodyRemove(index)}>
                                            Delete
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <button
                            type="button"
                            onClick={() => {
                                bodyAppend({ name: "", type: "" });
                            }}
                        >
                            Tambah body
                        </button>
                    </div>

                    <div>
                        <label>
                            conditions
                        </label>
                        <ul>
                            {conditionsFields.map((item, index) => {
                                return (
                                    <li key={item.id} className="flex flex-wrap">
                                        <div className="flex flex-col">
                                        <label>
                                            Atribute
                                        </label>
                                        <input
                                            {...register(`conditions.${index}.atribute`, { required: true })}
                                        />
                                        </div>
                                        <div className="flex flex-col">
                                        <label>
                                            operator
                                        </label>
                                        <input
                                            {...register(`conditions.${index}.operator`, { required: true })}
                                        />
                                        </div>
                                        <div className="flex flex-col">
                                        <label>
                                            label
                                        </label>
                                        <input
                                            {...register(`conditions.${index}.label`, { required: true })}
                                        />
                                        </div>
                                        <button type="button" onClick={() => conditionsRemove(index)}>
                                            Delete
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        <button
                            type="button"
                            onClick={() => {
                                conditionsAppend({ atribute: "", operator: "", label: "" });
                            }}
                        >
                            Tambah conditions
                        </button>
                    </div>

                    <div>
                        <label>
                            Tmabah Action
                        </label>
                        <Input
                            id="action.atribute"
                            disabled={isLoading}
                            errors={errors}
                            register={register}
                            label="atribute"

                        />
                        <Input
                            id="action.label"
                            disabled={isLoading}
                            errors={errors}
                            register={register}
                            label="label"

                        />
                        <Input
                            id="action.type"
                            disabled={isLoading}
                            errors={errors}
                            register={register}
                            label="type"

                        />
                    </div>
                    <Button disabled={isLoading} fullWidth type="submit">
                        Submit
                    </Button>
                </form>
            </section>
        </Layout>
    )
}