import LiveCard from '../../../components/tutor/cards/LiveCard';
import { Link } from 'react-router-dom';

function LiveManagement() {
  return (
    <div style={{ height: "100vh", backgroundColor: "	#fcdad1" }}>
    <div className='container'style={{paddingTop:'2rem'}}>
      {/* Header Row */}
      <div className='row '>
        <div className='col'>
        <div className='header d-flex justify-content-between align-items-center'>
            <div>
              <Link to='/live' style={{textDecoration:'none'}}>Live</Link>
            </div>
            <button className='btn btn-primary'>Add Live</button> 
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div className='row mt-3'>
        <div className='col'>
          <LiveCard />
        </div>
        <div className='col'></div>
        {/* You can add more columns for additional cards */}
      </div>
    </div>
    </div>
  )
}

export default LiveManagement