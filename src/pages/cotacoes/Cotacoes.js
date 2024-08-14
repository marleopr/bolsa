import axios from "axios";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, TOKEN } from "../../constants/BASE_URL";
import SquareLoader from "../../components/SquareLoader";
import CoinLoader from "../../components/CoinLoader";
import { goToHomePage } from "../../routes/Cordinator";
import { useNavigate } from "react-router-dom";
import CardCotacoes from "./CardCotacoes";
import ModalCotacoes from "./ModalCotacoes";
import { toast, ToastContainer } from "react-toastify";

const Cotacoes = () => {
    const navigate = useNavigate()

    const [dataCotacoes, setDataCotacoes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        handleCotacoes()
    }, [])

    const handleCotacoes = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}v2/currency?currency=USD-BRL%2CEUR-BRL%2CGBP-BRL&${TOKEN}`);
            setDataCotacoes(res.data.currency);
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
            <h2 style={{ color: 'white', textShadow: '-1px 0 black, 0 1px #0a95ff, 1px 0 #ff0000, 0 -1px black', letterSpacing: '3px' }}>Cotações</h2>
            <div>
                <button className="buttonAll" style={{ width: '100px' }} onClick={openModal} >Conversor</button>
                <button className="buttonAll" onClick={() => goToHomePage(navigate)} >Voltar</button>
            </div>
            {modalOpen && (
                <ModalCotacoes openModal={openModal} closeModal={closeModal} dataCotacoes={dataCotacoes} />
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                {loading ? (
                    <CoinLoader />
                ) : (
                    dataCotacoes && dataCotacoes.length > 0 ? (
                        <CardCotacoes dataCotacoes={dataCotacoes} />
                    ) : (
                        <SquareLoader />
                    )
                )}
            </div>
        </div>
    );
}
export default Cotacoes