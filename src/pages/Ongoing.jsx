import React from "react";

export default function Ongoing({ events }) {
   // if start date is less than current date and end date is greater than current date
   const ongoing = events.filter(
      (event) =>
         new Date(event.start_date) < new Date() &&
         new Date(event.end_date) > new Date()
   );
   console.log(ongoing);
   return (
      <div className='mt-2'>
         <h1>Ongoing</h1>
      </div>
   );
}
