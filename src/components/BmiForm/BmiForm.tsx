import {ChangeEvent, useState} from 'react';
// styles
import './BmiForm.css';

export interface IBmiFormState {
    weight: string;
    height: string;
    date: string;
}

interface IBmiFormProps {
    onChange: (state: IBmiFormState) => void;
}

const initialState: IBmiFormState = {
    weight: '',
    height: '',
    date: ''
}

const BmiForm = ({onChange}: IBmiFormProps) => {
    const [formState, setFormState] = useState<IBmiFormState>(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        let value = +e.target.value;

        if (value > 999) {
            value = 999;
        }

        const date = new Date().toLocaleString().split(',')[0];

        setFormState(prev => ({
            ...prev,
            [name]: value.toString(),
            date
        }));
    };

    const handleSubmit = () => {
        onChange(formState);
        setFormState(initialState);
    };

    return (
        <>
            <div className="row">
                <div className="col m6 s12">
                    <label htmlFor="weight">Weight (in kg)</label>
                    <input
                        id="weight"
                        name="weight"
                        type="number"
                        min="1"
                        max="999"
                        placeholder="50"
                        value={formState.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="col m6 s12">
                    <label htmlFor="height">Height (in cm)</label>
                    <input
                        id="height"
                        name="height"
                        type="number"
                        min="1"
                        max="999"
                        placeholder="176"
                        value={formState.height}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="center">
                <button
                    id="bmi-btn"
                    className="calculate-btn"
                    type="button"
                    disabled={!formState.weight || !formState.height}
                    onClick={handleSubmit}
                >
                    Calculate BMI
                </button>
            </div>
        </>
    );
};

export default BmiForm;
