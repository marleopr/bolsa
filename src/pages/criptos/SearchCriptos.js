import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../constants/BASE_URL";
import CardCriptos from "./CardCriptos";
import CriptoList from "./CriptoList";
import SquareLoader from "../../components/SquareLoader";
import CoinLoader from "../../components/CoinLoader";
import { goToHomePage } from "../../routes/Cordinator";
import { useNavigate } from "react-router-dom";

const SearchCriptos = () => {
    const navigate = useNavigate()

    const [dataCrypto, setDataCrypto] = useState([]);
    // const tickers = 'COGN3,^BVSP';
    // const tickers = 'amer3';
    const [nomeCrypto, setNomeCrypto] = useState("")
    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(null)
    const [buttonClickedCrypto, setButtonClickedCrypto] = useState(false);


    useEffect(() => {
        if (buttonClickedCrypto) {
            handleCrypto();
            setButtonClickedCrypto(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buttonClickedCrypto]);

    const handleCrypto = async () => {
        // setError(null)
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}v2/crypto?coin=${nomeCrypto}&currency=BRL`);
            setDataCrypto(res.data.coins);
            setLoading(false)
            setNomeCrypto("")
            // console.log(res.data);
            toast.success("Criptomoeda encontrada!")
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
            toast.error('Criptomoeda não encontrada!');
        }
    };

    const handleCryptoClick = async (selectedItemCrypto) => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}v2/crypto?coin=${selectedItemCrypto}&currency=BRL`);
            setDataCrypto(res.data.coins);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h2 style={{ color: 'white', textShadow: '-1px 0 black, 0 1px #0a95ff, 1px 0 #ff0000, 0 -1px black', letterSpacing: '3px' }}>Criptomoedas</h2>
            <ToastContainer />
            <CriptoList handleCryptoClick={handleCryptoClick} />
            <div>
                <input type="text" className="input" placeholder="Buscar" value={nomeCrypto.toUpperCase()} onChange={(event) => setNomeCrypto(event.target.value)} />
                <button onClick={handleCrypto} disabled={!nomeCrypto}>Buscar</button>
                <button className="buttonAll" onClick={() => goToHomePage(navigate)} >Voltar</button>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                {loading ? (
                    <CoinLoader />
                ) : (
                    dataCrypto && dataCrypto.length > 0 ? (
                        <CardCriptos dataCrypto={dataCrypto} />
                    ) : (
                        <SquareLoader />
                    )
                )}
            </div>
        </div >
    );
}
export default SearchCriptos