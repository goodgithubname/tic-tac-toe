import PropTypes from 'prop-types';

function Score({ xScore, oScore }) {

    return (
        <div className="score-container">
            <div>
                <span>X:</span>
                <span>{xScore === 0 ? "-" : xScore}</span>
            </div>
            <div>
                <span>O:</span>
                <span>{oScore === 0 ? "-" : oScore}</span>
            </div>
        </div>
    );
}

Score.propTypes = {
    xScore: PropTypes.number.isRequired,
    oScore: PropTypes.number.isRequired,
};

export default Score;