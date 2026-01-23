
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import ResetButton from '@/components/common/ResetButton';
import { Calendar, Clock, MapPin } from 'lucide-react';

export default function DateSelectionPage() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleReset = () => {
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <>
      <Helmet>
        <title>Event Booking Calendar - UI Practice Hub</title>
        <meta name="description" content="Book your event date and time" />
      </Helmet>

      <PageHeader title="Event Booking Calendar" subtitle="Book your event date and time" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-date-picker-container">
        <ControlPanel title="Booking Details">
          <div className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium mb-2 flex items-center gap-2">
                 <Calendar className="h-4 w-4" /> Event Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                data-testid="input-date"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                    data-testid="input-datetime" // Mapping
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
                  />
                </div>
            </div>
            
            <div className="pt-4">
                <ResetButton onClick={handleReset} />
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Booking Summary">
          <div className="space-y-4" data-testid="result-panel-selected-date">
            {date ? (
                <div className="bg-card border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start border-b pb-3">
                        <h3 className="font-semibold text-lg">Event Reservation</h3>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium">Draft</span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                        <div className="flex gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>
                                {startTime || '--:--'} to {endTime || '--:--'}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Main Conference Hall A</span>
                        </div>
                    </div>
                    
                    {date && startTime && endTime && (
                        <button className="w-full mt-2 bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm">
                            Confirm Booking
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-center text-muted-foreground py-10">
                    <Calendar className="h-10 w-10 mx-auto mb-2 opacity-20" />
                    <p>Select a date to view available slots</p>
                </div>
            )}
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
