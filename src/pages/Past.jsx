import React from "react";
import EventCard from "../components/EventCard.jsx";
import { Link } from "react-router-dom";
export default function Past({ events }) {
   console.log(events);
   const past = events.filter((events) => {
      return new Date(events.date.end) < new Date();
   });

   return (
      <div className='mt-2 w-full'>
         <h1>past</h1>
         <div className='w-full grid grid-cols-3 place-content-center gap-3'>
            {past.length > 0 ? (
               past.map((event) => {
                  return (
                     <div className=''>
                        <Link to={`/events/${event._id}/?type="past"`}>
                           <EventCard />
                        </Link>
                     </div>
                  );
               })
            ) : (
               <h1>No past events</h1>
            )}
         </div>
      </div>
   );
}
