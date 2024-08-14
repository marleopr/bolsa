import { format } from "date-fns";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const CardAcoes = ({ data }) => {

    const formatCurrency = (value, notation = 'standard') => {
        const options = {
            style: 'currency',
            currency: 'BRL',
            notation: notation
        };

        return new Intl.NumberFormat('pt-BR', options).format(value);
    };

    const formatDateAndTime = (dateTimeString) => {
        const parsedDate = new Date(dateTimeString);
        return format(parsedDate, "dd/MM/yyyy, HH:mm:ss");
    };

    return (
        <>
            {data.map((item, index) => (
                <div key={index} className="card">
                    <div className="top-section">
                        <div className="border"></div>
                        <div className="icons">
                            <div className="logo">
                                <img style={{ borderRadius: '20%', width: '50px' }} src={item.logourl} alt={item.logourl} />
                                <h6>{formatDateAndTime(item.regularMarketTime)}</h6>
                            </div>
                            <div className="data-container">
                                <div className="symbol">
                                    <strong>{item.symbol}</strong>
                                </div>
                                <div className="market-cap">
                                    <h5>Valor de mercado: {item.regularMarketPrice ? formatCurrency(item.regularMarketPrice, 'compact') : "N/D"}</h5>
                                </div>
                                <div className="variation">
                                    <h5>Variação (dia):
                                        <span style={{ margin: '5px' }}>
                                            {formatCurrency(item.regularMarketChange)}
                                        </span>
                                        {item.regularMarketChangePercent > 0 ? <span className="green">{item.regularMarketChangePercent.toFixed(2)}%</span> : <span className="red">{item.regularMarketChangePercent.toFixed(2)}%</span>}
                                        {item.regularMarketChange > 0 ? <FaArrowUp className="green-arrow" /> : <FaArrowDown className="red-arrow" />}
                                    </h5>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="bottom-section">
                        <span className="title">{item.longName}</span>
                        <div className="row row1">
                            <div className="item">
                                <span className="big-text">{formatCurrency(item.regularMarketPrice)}</span>
                                <span className="regular-text">Preço</span>
                            </div>
                            <div className="item">
                                <span className="big-text">{formatCurrency(item.regularMarketDayLow)}</span>
                                <span className="regular-text">Mínimo (dia)</span>
                            </div>
                            <div className="item">
                                <span className="big-text">{formatCurrency(item.regularMarketDayHigh)}</span>
                                <span className="regular-text">Máximo (dia)</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
export default CardAcoes