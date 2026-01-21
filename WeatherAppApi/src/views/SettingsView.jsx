
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnit } from '../slices/settingsSlice';

function SettingsView() {
    const unit = useSelector((state) => state.settings.unit);
    const dispatch = useDispatch();

    return (
        <div className="container" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
            <h1>Ustawienia</h1>

            <div className="infoTile" style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="infoLabel" style={{ fontSize: '1rem', marginBottom: 0 }}>Jednostka temperatury</span>
                <button
                    className="searchButton"
                    onClick={() => dispatch(toggleUnit())}
                    style={{ margin: 0, padding: '8px 20px', fontSize: '1rem' }}
                >
                    {unit === 'metric' && 'Celsjusz (°C)'}
                    {unit === 'imperial' && 'Fahrenheit (°F)'}
                    {unit === 'kelvin' && 'Kelvin (K)'}
                </button>
            </div>
        </div>
    )
}

export default SettingsView;