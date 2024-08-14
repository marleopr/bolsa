import axios from "axios";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, TOKEN } from "../../constants/BASE_URL";
import SquareLoader from "../../components/SquareLoader";
import CoinLoader from "../../components/CoinLoader";
import { goToHomePage } from "../../routes/Cordinator";
import { useNavigate } from "react-router-dom";
import CardTaxas from "./CardTaxas";
import CardSelic from "./CardSelic";
import { styled } from "styled-components";
import { toast, ToastContainer } from "react-toastify";

const Taxas = () => {
    const navigate = useNavigate()

    const [dataTaxas, setDataTaxas] = useState([]);
    const [dataSelic, setDataSelic] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        handleTaxas()
        handleSelic()
    }, [])

    const handleTaxas = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}v2/inflation?country=brazil&historical=false&sortBy=date&sortOrder=desc&${TOKEN}`);
            setDataTaxas(res.data.inflation);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };
    const handleSelic = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}v2/prime-rate?country=brazil&historical=false&sortBy=date&sortOrder=desc&${TOKEN}`);
            setDataSelic(res.data['prime-rate']);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
            toast.error("Você não tem acesso a este recurso, considere fazer um upgrade para um plano que suporte o acesso a moedas em https://brapi.dev/pricing");
        }
    };

    return (
        <div className="App">
            <ToastContainer />
            <h2 style={{ color: 'white', textShadow: '-1px 0 black, 0 1px #0a95ff, 1px 0 #ff0000, 0 -1px black', letterSpacing: '3px' }}>Taxas</h2>
            <div>
                <button className="buttonAll" onClick={() => goToHomePage(navigate)} >Voltar</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                {loading ? (
                    <CoinLoader />
                ) : (
                    dataTaxas && dataTaxas.length > 0 ? (
                        <CardContainer >
                            <CardTaxas dataTaxas={dataTaxas} />
                            <CardSelic dataSelic={dataSelic} />
                        </CardContainer>
                    ) : (
                        <SquareLoader />
                    )
                )}
            </div>
        </div>
    );
}
export default Taxas

const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media screen and (max-device-width: 480px) {
    flex-direction: column;
  }
`