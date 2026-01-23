
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/common/PageHeader';
import ControlPanel from '@/components/common/ControlPanel';
import ResultPanel from '@/components/common/ResultPanel';
import { Button } from '@/components/ui/button';

export default function SliderPage() {
  const [value, setValue] = useState(50);

  return (
    <>
      <Helmet><title>Slider - UI Practice Hub</title></Helmet>
      <PageHeader title="Slider" subtitle="Practice slider/range input" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="page-slider-container">
        <ControlPanel title="Slider Control">
          <div className="space-y-4">
            <div>
              <label htmlFor="slider" className="block text-sm font-medium mb-2">
                Value: <output>{value}</output>
              </label>
              <input
                type="range"
                id="slider"
                min="0"
                max="100"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={value}
                data-testid="input-slider"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setValue(0)} size="sm" data-testid="button-set-0">Set 0</Button>
              <Button onClick={() => setValue(50)} size="sm" data-testid="button-set-50">Set 50</Button>
              <Button onClick={() => setValue(100)} size="sm" data-testid="button-set-100">Set 100</Button>
            </div>
          </div>
        </ControlPanel>

        <ResultPanel title="Current Value">
          <p className="text-4xl font-bold text-primary" data-testid="result-panel-slider-value">{value}</p>
        </ResultPanel>
      </div>
    </>
  );
}
