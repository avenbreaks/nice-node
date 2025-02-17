import type { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProgressBar, { type ProgressBarProps } from './ProgressBar';

export interface TimedProgressBarProps extends ProgressBarProps {
  totalTimeSeconds: number;
}

const timeRemainingCaption = (
  g: TFunction,
  totalTime: number,
  timeElapsed: number,
) => {
  if (timeElapsed >= totalTime) {
    return g('FinishingUp');
  }
  const seconds = totalTime - timeElapsed;
  if (seconds < 60) {
    return g('AboutSecondsRemaining', {
      seconds,
    });
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return g('AboutMinutesAndSecondsRemaining', {
    minutes,
    remainingSeconds,
  });
};

const TimedProgressBar = ({
  totalTimeSeconds,
  ...restProps
}: TimedProgressBarProps) => {
  const { t: g } = useTranslation('genericComponents');
  const [sElapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <ProgressBar
      progress={(sElapsedSeconds / totalTimeSeconds) * 100}
      caption={timeRemainingCaption(g, totalTimeSeconds, sElapsedSeconds)}
      {...restProps}
    />
  );
};

export default TimedProgressBar;
