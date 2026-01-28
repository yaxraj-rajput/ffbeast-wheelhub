import { SettingField } from "@shubham0x13/ffbeast-wheel-webhid-api";

import { Divider, Slider, ToggleSwitch } from "@/components/ui";
import { useSettingUI } from "@/hooks/use-setting-ui";
import { useDeviceSettingsStore } from "@/stores";

export const ControllerSettings = () => {
  const hardware = useDeviceSettingsStore((state) => state.settings.hardware);
  const setSetting = useSettingUI();
  return (
    <div className="settings">
      <ToggleSwitch
        label="Enable Forces (Requires Reboot)"
        checked={hardware.forceEnabled === 1}
        onToggle={(checked) =>
          setSetting(SettingField.ForceEnabled, checked ? 1 : 0)
        }
      />

      <ToggleSwitch
        label="Debug Forces"
        checked={hardware.debugTorque === 1}
        onToggle={(checked) =>
          setSetting(SettingField.DebugTorque, checked ? 1 : 0)
        }
      />

      <Slider
        label="Power Limit (%)"
        value={hardware.powerLimit}
        onValueCommit={(v) => setSetting(SettingField.PowerLimit, v)}
      />

      <Slider
        isPro
        label="Position Smoothing (%)"
        value={hardware.positionSmoothing}
        onValueCommit={(v) => setSetting(SettingField.PositionSmoothing, v)}
      />

      <Slider
        isPro
        label="Speed Sample Buffer Size"
        value={hardware.speedBufferSize}
        min={2}
        max={32}
        onValueCommit={(v) => setSetting(SettingField.SpeedBufferSize, v)}
      />

      <Divider label="Axis & Motor" disableLine={false} />

      <ToggleSwitch
        label="Invert Joystick Output"
        checked={hardware.encoderDirection === 1}
        onToggle={(checked) =>
          setSetting(SettingField.EncoderDirection, checked ? 1 : -1)
        }
      />

      <ToggleSwitch
        label="Invert Force Output"
        checked={hardware.forceDirection === 1}
        onToggle={(checked) =>
          setSetting(SettingField.ForceDirection, checked ? 1 : -1)
        }
      />

      <Slider
        label="Encoder CPR"
        value={hardware.encoderCPR}
        max={65535}
        onValueCommit={(v) => setSetting(SettingField.EncoderCPR, v)}
      />

      <Slider
        label="Motor Pole Pairs"
        value={hardware.polePairs}
        min={1}
        max={99}
        onValueCommit={(v) => setSetting(SettingField.PolePairs, v)}
      />

      <Slider
        label="P Gain"
        value={hardware.proportionalGain}
        max={50}
        onValueCommit={(v) => setSetting(SettingField.PGain, v)}
      />

      <Slider
        label="I Gain"
        value={hardware.integralGain}
        max={500}
        onValueCommit={(v) => setSetting(SettingField.IGain, v)}
      />

      <Divider label="Calibration & Safety" disableLine={false} />

      <Slider
        label="Calibration Magnitude (%)"
        value={hardware.calibrationMagnitude}
        onValueCommit={(v) => setSetting(SettingField.CalibrationMagnitude, v)}
      />

      <Slider
        label="Calibration Speed (%)"
        value={hardware.calibrationSpeed}
        onValueCommit={(v) => setSetting(SettingField.CalibrationSpeed, v)}
      />

      <Slider
        label="Braking Resistor Limit (%)"
        value={hardware.brakingLimit}
        onValueCommit={(v) => setSetting(SettingField.BrakingLimit, v)}
      />
    </div>
  );
};
