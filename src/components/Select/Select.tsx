import React, {useCallback, useMemo, useState} from 'react';
import {debounce} from '../../utils/common';
import Button from "../Button/Button";
import {FormFields, IOption} from "../Form/Form";
import Input from "../Input/Input";
import styles from './Select.module.css';

interface IProps {
    listOfOptions: IOption[]; // List of options to be displayed
    allowMultipleSelection: boolean; // Allow multiple selection
    placeholder: string; // Placeholder for the select
    changeFormData: (e: React.ChangeEvent<HTMLInputElement>, newSelectedOptions: number[]) => void; // Function to change form data
    alertSelectedOptions: (selectedOptions: number[]) => void; // For only alerting selected options
    toggleOptions: (newSelectedOptions: number[]) => void;
}

const Select = (props: IProps) => {
    const {
        listOfOptions,
        allowMultipleSelection,
        placeholder,
        changeFormData,
        alertSelectedOptions,
        toggleOptions
    } = props;

    const [items, setItems] = useState<IOption[]>(listOfOptions);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newSelectedOptions = [...selectedOptions];
        const value = Number(event.target.value);
        const index = newSelectedOptions.findIndex(item => item === value);
        if (index === -1) {
            if (!allowMultipleSelection) {
                newSelectedOptions = [];
            }
            newSelectedOptions.push(value);
        } else {
            newSelectedOptions.splice(index, 1);
        }
        setSelectedOptions(newSelectedOptions);
        changeFormData(event, newSelectedOptions);
        alertSelectedOptions(newSelectedOptions);
    };

    const allItemsSelected = useMemo(() => (
        selectedOptions?.length === listOfOptions?.length
    ), [selectedOptions?.length, listOfOptions?.length]);

    const clickOnSelectOrDeselectAll = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newSelectedOptions: number[] = [];
        if (allItemsSelected) {
            newSelectedOptions = [];
        } else {
            newSelectedOptions = listOfOptions.map(option => option.id);
        }
        setSelectedOptions(newSelectedOptions);
        toggleOptions(newSelectedOptions);
    }, [allItemsSelected, listOfOptions, setSelectedOptions, toggleOptions]);

    const onSearchOption = (newSearchValue: string) => {
        const listOfOptionsFiltered = listOfOptions.filter(option => {
            const lowerCasedOptionLabel = option.label.toLowerCase();
            const lowerCasedSearchValue = newSearchValue.toLowerCase();
            return lowerCasedOptionLabel.includes(lowerCasedSearchValue);
        });
        setItems(listOfOptionsFiltered);
    }

    const debouncedSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchValue = e.target.value;
        setSearchValue(newSearchValue);
        const debouncedSearch = debounce((newSearchValue) => onSearchOption(newSearchValue), 300);
        debouncedSearch(newSearchValue);
    }, [onSearchOption]);

    const collapseOptions = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowOptions(prev => !prev);
    }

    return (
        <div className={styles.container}>
            <Button onClick={collapseOptions} label={`${showOptions ? "Hide" : "Show"} Options`} />
            {showOptions && (
                <div className={styles.options__container}>
                    <Input type="text" value={searchValue} onChange={debouncedSearch} placeholder={"Search for options"} />
                    {
                        selectedOptions?.length === 0 && (
                            <div className={styles.placeholder}>{placeholder}</div>
                        )
                    }
                    <ul className={styles.list__container}>
                        {
                            items.map((option) => {
                                const isChecked = selectedOptions.includes(option.id);
                                return (
                                    <li key={option.id}>
                                        <label className={styles.label__container}>
                                            <Input
                                                type="checkbox"
                                                checked={isChecked}
                                                value={option.value}
                                                onChange={handleCheckboxChange}
                                                id={FormFields.OPTION_LIST_IDS}
                                            />
                                            {option.label}
                                        </label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {allowMultipleSelection && (
                        <Button
                            onClick={(e) => clickOnSelectOrDeselectAll(e)}
                            label={`${allItemsSelected ? 'Deselect' : 'Select'} All`}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Select;