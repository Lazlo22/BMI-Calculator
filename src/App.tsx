import {useEffect, useState} from "react";
import {v4 as uuidv4} from 'uuid';
// common
import {getData, storeData} from './utils/localStorage';
// components
import BmiForm, {IBmiFormState} from './components/BmiForm/BmiForm';
import Info from './components/Info/Info';
import Bar from './components/Bar/Bar';
// styles
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'

interface IAppState extends IBmiFormState {
    bmi: string;
    id: string;
}

interface IAppData {
    bmi: number[];
    date: string[];
}

function App() {
    const [appState, setAppState] = useState<IAppState[]>(getData('data') || []);
    const [appData, setAppData] = useState<IAppData>({bmi: [], date: []});

    useEffect(() => {
        const date = appState.map(obj => obj.date);
        const bmi = appState.map(obj => +obj.bmi);

        storeData('data', appState);
        setAppData({date, bmi});
    }, [appState]);

    const handleChange = (val: IBmiFormState) => {
        const heightInM = +val.height / 100;
        const value = {
            ...val,
            bmi: (+val.weight / (heightInM * heightInM)).toFixed(2),
            id: uuidv4(),
        };

        setAppState(prev => {
            if (prev.length > 6) {
                return [...prev.slice(1), value];
            }

            return [...prev, value];
        });
    };

    const handleDelete = (id: string) => {
        const newState = appState.filter(i => i.id !== id);

        storeData('lastState', appState);
        setAppState(newState);
    };

    return (
        <div className='container'>
            <div className='row center'>
                <h1 className='white-text'>BMI Tracker</h1>
            </div>
            <div className='row'>
                <div className='col m12 s12'>
                    <BmiForm onChange={handleChange}/>
                    <Bar labelData={appData.date} bmiData={appData.bmi}/>
                    <div>
                        <div className='row center'>
                            <h4 className='white-text'>7 Day Data</h4>
                        </div>
                        <div className='data-container row'>
                            {appState.length ? (
                                <>
                                    {appState.map(info => (
                                        <Info
                                            key={info.id}
                                            id={info.id}
                                            weight={info.weight}
                                            height={info.height}
                                            date={info.date}
                                            bmi={info.bmi}
                                            deleteCard={handleDelete}
                                        />
                                    ))}
                                </>
                            ) : (
                                <div className='center white-text'>No log found</div>
                            )}
                        </div>
                    </div>
                    {getData('lastState') && (
                        <div className='center'>
                            <button className='calculate-btn' onClick={() => setAppState(getData('lastState'))}>
                                Undo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default App
