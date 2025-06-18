import React, { useState, useEffect, useMemo } from 'react';
import { differenceInSeconds, intervalToDuration } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card'; // Using shadcn Card for styling

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerDisplayProps {
  targetDate: string | Date; // ISO string or Date object
  onCountdownEnd?: () => void; // Optional callback when countdown finishes
  endedMessage?: string;
}

const CountdownTimerDisplay: React.FC<CountdownTimerDisplayProps> = ({
  targetDate,
  onCountdownEnd,
  endedMessage = "The event has started!",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [hasEnded, setHasEnded] = useState(false);

  const targetTimestamp = useMemo(() => new Date(targetDate).getTime(), [targetDate]);

  console.log("Rendering CountdownTimerDisplay, target date:", targetDate);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const diff = differenceInSeconds(targetTimestamp, now);

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setHasEnded(true);
        if (onCountdownEnd) {
          onCountdownEnd();
        }
        return;
      }

      const duration = intervalToDuration({ start: 0, end: diff * 1000 });
      setTimeLeft({
        days: duration.days || 0,
        hours: duration.hours || 0,
        minutes: duration.minutes || 0,
        seconds: duration.seconds || 0,
      });
      setHasEnded(false);
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp, onCountdownEnd]);

  if (hasEnded) {
    return (
      <div className="text-center text-2xl font-semibold py-8">
        {endedMessage}
      </div>
    );
  }

  if (!timeLeft) {
    return (
      <div className="text-center text-xl py-8">
        Loading countdown...
      </div>
    );
  }

  const TimeSegment: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <Card className="flex flex-col items-center justify-center p-4 md:p-6 bg-secondary text-secondary-foreground">
      <CardContent className="p-0">
        <div className="text-3xl md:text-5xl font-bold">{String(value).padStart(2, '0')}</div>
        <div className="text-xs md:text-sm uppercase tracking-wider">{label}</div>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto py-8">
      <TimeSegment value={timeLeft.days} label="Days" />
      <TimeSegment value={timeLeft.hours} label="Hours" />
      <TimeSegment value={timeLeft.minutes} label="Minutes" />
      <TimeSegment value={timeLeft.seconds} label="Seconds" />
    </div>
  );
};

export default CountdownTimerDisplay;