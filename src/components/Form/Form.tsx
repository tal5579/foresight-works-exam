import React, {useState} from 'react';
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import styles from './Form.module.css';

// Example of options list
const optionsList = [
    {
        id: 1,
        label: 'Option 1',
        value: 1
    },
    {
        id: 2,
        label: 'Option 2',
        value: 2
    },
    {
        id: 3,
        label: 'Option 3',
        value: 3
    },
    {
        id: 4,
        label: 'Option 4',
        value: 4
    },
    {
        id: 5,
        label: 'Option 5',
        value: 5
    },
];

export enum FormFields {
    EMAIL = 'email',
    NAME = 'name',
    OPTION_LIST_IDS = 'option_list_ids'
}

export interface IFormData {
    email: string;
    name: string;
    option_list_ids: number[]; // List of selected options ids
}

export interface IOption {
    id: number;
    label: string;
    value: number
}

const Form = () => {
    const [formData, setFormData] = useState<IFormData>({
        email: '',
        name: '',
        option_list_ids: [],
    });

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>, newSelectedOptions?: number[]) => {
        const { id, value } = e.target;
        const isOptionInput = id === FormFields.OPTION_LIST_IDS;
        setFormData({
            ...formData,
            [id]: isOptionInput ? newSelectedOptions : value
        });
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    const alertSelectedOptions = (newSelectedOptions?: number[]) => {
        const selectedOptionsAsString = newSelectedOptions?.join(', ') || 'None selected';
        alert('Selected option ids: ' + selectedOptionsAsString);
    }

    const toggleOptions = (newSelectedOptions: number[]) => {
        setFormData({
            ...formData,
            [FormFields.OPTION_LIST_IDS]: newSelectedOptions
        });
    }

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <div className={styles.form_wrapper}>
                <Input type="email" id={FormFields.EMAIL} value={formData.email} onChange={changeFormData} placeholder={"Email"} />
                <Input type="text" id={FormFields.NAME} value={formData.name} onChange={changeFormData} placeholder={"Name"} />
                <Select
                    listOfOptions={optionsList} // List of options
                    allowMultipleSelection={true} // Allow multiple selection
                    placeholder={'Select an option:'} // Placeholder for the select
                    changeFormData={changeFormData} // Function to change the form data
                    alertSelectedOptions={alertSelectedOptions} // For only alerting selected options
                    toggleOptions={toggleOptions}
                />
                <Button type={"submit"} label={"Submit Form"} />
            </div>
        </form>
    )
}

export default Form;