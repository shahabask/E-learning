import React from 'react'
import { Link } from 'react-router-dom'
import QuizCard from '../../../components/user/cards/QuizCard'

function Quiz() {
  return (
    <div style={{ height: "", backgroundColor: "	#fcdad1" }}>
    <div className='container'style={{paddingTop:'2rem'}}>
      {/* Header Row */}
      <div className='row '>
        <div className='col'>
        <div className='header d-flex justify-content-between align-items-center'>
            <div>
              <Link to='' style={{textDecoration:'none'}}>Quiz</Link>
            </div>
            {/* <button className='btn btn-primary'>Add Live</button>  */}
          </div>
        </div>
      </div>

      {/* Cards Row */}
      <div className='row mt-3'>
        <div className='col'>
          <QuizCard />
        </div>
        <div className='col'></div>
        {/* You can add more columns for additional cards */}
      </div>
    </div>
    </div>
  )
}

export default Quiz