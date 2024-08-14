import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, TOKEN } from "../../constants/BASE_URL";
import CardCriptos from "./CardCriptos";
import CriptoList from "./CriptoList";
import SquareLoader from "../../components/SquareLoader";
import CoinLoader from "../../components/CoinLoader";
import { goToHomePage } from "../../routes/Cordinator";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../components/useDebounce";

const SearchCriptos = () => {
    const navigate = useNavigate()

    const [dataCrypto, setDataCrypto] = useState([]);
    const [nomeCrypto, setNomeCrypto] = useState("")
    const [loading, setLoading] = useState(false)

    const debouncedNomeCrypto = useDebounce(nomeCrypto, 800)

    useEffect(() => {
        if (debouncedNomeCrypto) {
            handleCrypto();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedNomeCrypto]);

    const handleCrypto = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}v2/crypto?coin=${debouncedNomeCrypto}&currency=BRL&${TOKEN}`);
            setDataCrypto(res.data.coins);
            setLoading(false)
            toast.success("Criptomoeda encontrada!")
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
            toast.error('Criptomoeda não encontrada!', error.message);
            toast.error("Você não tem acesso a este recurso, considere fazer um upgrade para um plano que suporte o acesso a moedas em https://brapi.dev/pricing");
        }
    };

    const handleCryptoClick = async (selectedItemCrypto) => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}v2/crypto?coin=${selectedItemCrypto}&currency=BRL&${TOKEN}`);
            setDataCrypto(res.data.coins);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
            toast.error("Você não tem acesso a este recurso, considere fazer um upgrade para um plano que suporte o acesso a moedas em https://brapi.dev/pricing");
        }
    };

    return (
        <div className="App">
            <h2 style={{ color: 'white', textShadow: '-1px 0 black, 0 1px #0a95ff, 1px 0 #ff0000, 0 -1px black', letterSpacing: '3px' }}>Criptomoedas</h2>
            <ToastContainer />
            <CriptoList handleCryptoClick={handleCryptoClick} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                <input type="text" className="input" placeholder="Buscar" value={nomeCrypto.toUpperCase()} onChange={(event) => setNomeCrypto(event.target.value)} />
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