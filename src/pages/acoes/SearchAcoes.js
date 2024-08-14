import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, TOKEN } from "../../constants/BASE_URL";
import CardAcoes from "./CardAcoes";
import AcoesList from "./AcoesList";
import SquareLoader from "../../components/SquareLoader";
import CoinLoader from "../../components/CoinLoader";
import { goToHomePage } from "../../routes/Cordinator";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../components/useDebounce";

const SearchAcoes = () => {
    const navigate = useNavigate()

    const [data, setData] = useState([]);

    const [nome, setNome] = useState("")
    const [loading, setLoading] = useState(false)

    const debouncedNome = useDebounce(nome, 800);

    useEffect(() => {
        if (debouncedNome) {
            handleAcoes()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedNome])

    const handleAcoes = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}quote/${debouncedNome}?range=1d&interval=1d&fundamental=true&${TOKEN}`);
            setData(res.data.results);
            setLoading(false)
            toast.success("Ação encontrada!")
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
            toast.error('Ação não encontrada!');
        }
    };

    const handleAcoesClick = async (selectedItem) => {
        setLoading(true);
        try {
            const res = await axios.get(`${BASE_URL}quote/${selectedItem}?range=1d&interval=1d&fundamental=true&${TOKEN}`);
            setData(res.data.results);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };

    return (
        <div className="App">
            <ToastContainer />
            <h2 style={{ color: 'white', textShadow: '-1px 0 black, 0 1px #0a95ff, 1px 0 #ff0000, 0 -1px black', letterSpacing: '3px' }}>Ações</h2>
            <AcoesList handleAcoesClick={handleAcoesClick} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
                <input style={{ color: 'white' }} type="text" className="input" placeholder="Buscar" value={nome.toUpperCase()} onChange={(event) => setNome(event.target.value)} />
                <button className="buttonAll" onClick={() => goToHomePage(navigate)} >Voltar</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                {loading ? (
                    <CoinLoader />
                ) : (
                    data && data.length > 0 ? (
                        <CardAcoes data={data} />
                    ) : (
                        <SquareLoader />
                    )
                )}
            </div>
        </div>
    );
}
export default SearchAcoes