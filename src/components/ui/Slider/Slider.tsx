import "./style.scss";

import { Button, InfoPanel, type InfoPanelProps } from "@components/ui";
import { useState } from "react";

import { useWheelStore } from "@/stores";

export interface SliderProps {
  isPro?: boolean;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  infoPanelProps?: InfoPanelProps;
  disabled?: boolean;
  onValueChange?: (value: number) => void;
  onValueCommit?: (value: number) => void;
}

export const Slider = ({
  isPro = false,
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  infoPanelProps,
  disabled = false,
  onValueChange,
  onValueCommit,
}: SliderProps) => {
  const [localValue, setLocalValue] = useState(value);
  const [prevPropValue, setPrevPropValue] = useState(value);
  const [showInfo, setShowInfo] = useState(false);

  const clamp = (val: number) => Math.min(max, Math.max(min, val));

  if (value !== prevPropValue) {
    setPrevPropValue(value);
    setLocalValue(clamp(value));
  }

  const snapToStep = (val: number) => {
    return clamp(Math.round((val - min) / step) * step + min);
  };

  const handleLiveUpdate = (newValue: number) => {
    if (isDisabled) return;
    const clamped = clamp(newValue);
    setLocalValue(clamped);
    onValueChange?.(clamped);
  };

  const commitValue = (newValue: number) => {
    if (isDisabled) return;
    const final = snapToStep(newValue);
    setLocalValue(final);
    if (final !== value) onValueCommit?.(final);
  };

  const isRegistered = useWheelStore(
    (state) => state.deviceState?.isRegistered,
  );

  const isDisabled = disabled || (isPro && !isRegistered);

  const handleInfoClick = () => setShowInfo(!showInfo);

  return (
    <div className={`setting_option ${isDisabled ? "disabled" : ""}`}>
      <div className="option_title">
        <span>
          {label} {isPro && <span className="pro_badge">PRO</span>}
        </span>

        <div className="value_controls">
          <Button
            variant="secondary"
            disabled={isDisabled || value <= min}
            onClick={() => commitValue(value - step)}
          >
            −
          </Button>
          <input
            type="number"
            className="value_input"
            value={localValue}
            min={min}
            max={max}
            step={step}
            disabled={isDisabled}
            onChange={(e) => handleLiveUpdate(Number(e.target.value))}
            onBlur={() => commitValue(localValue)}
            onKeyDown={(e) => e.key === "Enter" && commitValue(localValue)}
          />

          <Button
            variant="secondary"
            disabled={isDisabled || value >= max}
            onClick={() => commitValue(value + step)}
          >
            +
          </Button>

          {infoPanelProps && (
            <Button
              variant="secondary"
              icon="icon fi fi-rr-info"
              // disabled={isDisabled}
              onClick={() => handleInfoClick()}
            />
          )}
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue}
        disabled={isDisabled}
        onChange={(e) => handleLiveUpdate(Number(e.target.value))}
        onMouseUp={() => commitValue(localValue)}
        onTouchEnd={() => commitValue(localValue)}
      />

      <div className="ranges_text">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      {showInfo && infoPanelProps && (
        <InfoPanel {...infoPanelProps}></InfoPanel>
      )}
    </div>
  );
};
