
import React from 'react';
import cancellationPolicyText from './cancellationPolicyText';
import './CancellationPolicy.css';

const CancellationPolicy = () => {
  return (
  <div className='policy'> 
	<div className="cancellation">
	  <h1>Cancellation Policy</h1>
      <div className="cancellation-detail">
      <div>
                <ul>
                    {cancellationPolicyText.split('\n').map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>


      </div>
	</div>
  </div> 
  );
};

export default CancellationPolicy;
