import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function CurrentDateTime() {
  const [dateTime, setDateTime] = useState(format(new Date(), 'eeee, MMMM dd yy'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(format(new Date(), 'eeee, MMMM dd yy'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h6>{dateTime}</h6>
    </div>
  );
}

export default CurrentDateTime;
