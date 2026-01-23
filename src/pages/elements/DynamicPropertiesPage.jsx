
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';
import ResetButton from '@/components/common/ResetButton';

export default function DynamicPropertiesPage() {
  const [delay, setDelay] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [colorChanged, setColorChanged] = useState(false);

  useEffect(() => {
    if (isRunning && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isRunning && countdown === 0) {
      setButtonEnabled(true);
      setTextVisible(true);
      setColorChanged(true);
      setIsRunning(false);
    }
  }, [isRunning, countdown]);

  const handleStart = () => {
    setButtonEnabled(false);
    setTextVisible(false);
    setColorChanged(false);
    setCountdown(delay);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCountdown(0);
    setButtonEnabled(false);
    setTextVisible(false);
    setColorChanged(false);
  };

  return (
    <>
      <Helmet>
        <title>Dynamic Properties - UI Practice Hub</title>
        <meta name="description" content="Practice dynamic element properties" />
      </Helmet>

      <PageHeader title="Dynamic Properties" subtitle="Practice elements with time-based property changes" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-dynamic-properties-container">
        <ControlPanel title="Controls">
          <div className="space-y-4">
            <div>
              <label htmlFor="delay" className="block text-sm font-medium mb-2">
                Delay (seconds): {delay}
              </label>
              <input
                type="range"
                id="delay"
                min="0"
                max="10"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                disabled={isRunning}
                className="w-full"
                data-testid="input-delay-slider"
              />
            </div>

            <Button onClick={handleStart} disabled={isRunning} data-testid="button-start-timer">
              Start ({delay}s delay)
            </Button>

            {isRunning && (
              <div className="p-4 bg-primary/10 rounded-lg text-center" data-testid="text-countdown">
                <p className="text-2xl font-bold">{countdown}s</p>
              </div>
            )}

            <Button disabled={!buttonEnabled} data-testid="button-enable-disable">
              Enable After Delay
            </Button>

            {textVisible && (
              <p className="p-4 bg-green-500/10 text-green-600 rounded-lg font-medium" data-testid="text-visible-after">
                ✓ Visible After Delay
              </p>
            )}

            <div
              className={`p-4 rounded-lg transition-colors duration-500 ${
                colorChanged ? 'bg-blue-500 text-white' : 'bg-muted'
              }`}
              data-testid="box-color-change"
            >
              Color Changes After Delay
            </div>

            <ResetButton onClick={handleReset} />
          </div>
        </ControlPanel>

        <ResultPanel title="Status">
          <div className="space-y-2" data-testid="result-panel-property-status">
            <p>Delay: {delay} seconds</p>
            <p>Status: {isRunning ? 'Running...' : 'Idle'}</p>
            <p>Button Enabled: {buttonEnabled ? 'Yes' : 'No'}</p>
            <p>Text Visible: {textVisible ? 'Yes' : 'No'}</p>
            <p>Color Changed: {colorChanged ? 'Yes' : 'No'}</p>
          </div>
        </ResultPanel>
      </div>
    </>
  );
}
