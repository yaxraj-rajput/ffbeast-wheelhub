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
        infoPanelProps={{
          description:
            "A safety cap on the total power sent to the motor. Protects your Power Supply (PSU) and prevents overheating.",
          impact:
            "Start low! If your PSU shuts down during high forces, lower this value.",
        }}
      />

      <Slider
        isPro
        label="Position Smoothing (%)"
        value={hardware.positionSmoothing}
        onValueCommit={(v) => setSetting(SettingField.PositionSmoothing, v)}
        infoPanelProps={{
          description:
            "Filters out jitter or noise from your encoder position sensor.",
          impact:
            "Keep at 0% unless your sensor is noisy. Adding too much introduces input lag.",
        }}
      />

      <Slider
        isPro
        label="Speed Sample Buffer Size"
        value={hardware.speedBufferSize}
        min={2}
        max={32}
        onValueCommit={(v) => setSetting(SettingField.SpeedBufferSize, v)}
        infoPanelProps={{
          description:
            "The averaging window for calculating rotation speed. Crucial for smooth Dampening effects.",
          impact:
            "If Dampening feels 'grainy' or noisy (common with low-resolution encoders), increase this value.",
        }}
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
        infoPanelProps={{
          description:
            "The resolution of your position sensor (Counts Per Revolution). Refer to your encoder's datasheet.",
          impact:
            "Must match your hardware exactly. If wrong, your rotation angles in-game will be incorrect.",
        }}
      />

      <Slider
        label="Motor Pole Pairs"
        value={hardware.polePairs}
        min={1}
        max={99}
        onValueCommit={(v) => setSetting(SettingField.PolePairs, v)}
        infoPanelProps={{
          description:
            "The internal magnet configuration of your motor (Total Magnets / 2). Hoverboard motors usually use 15.",
          impact:
            "If incorrect, the motor will stutter, make noise, or fail to spin smoothly.",
        }}
      />

      <Slider
        label="P Gain"
        value={hardware.proportionalGain}
        min={0}
        max={100}
        onValueCommit={(v) => setSetting(SettingField.PGain, v)}
        infoPanelProps={{
          description:
            "Proportional Gain for the motor's electrical current controller (PID).",
          impact:
            "Advanced setting. Defaults work for most motors. Only adjust if you are tuning the electrical response.",
        }}
      />

      <Slider
        label="I Gain"
        value={hardware.integralGain}
        max={500}
        onValueCommit={(v) => setSetting(SettingField.IGain, v)}
        infoPanelProps={{
          description:
            "Integral Gain for the motor's electrical current controller (PID).",
          impact:
            "Advanced setting. Defaults work for most motors. Controls how the motor corrects current errors over time.",
        }}
      />

      <Divider label="Calibration & Safety" disableLine={false} />

      <Slider
        label="Calibration Magnitude (%)"
        value={hardware.calibrationMagnitude}
        onValueCommit={(v) => setSetting(SettingField.CalibrationMagnitude, v)}
        infoPanelProps={{
          description:
            "The amount of force the wheel uses to find its center or stops during startup.",
          impact:
            "If too low, the wheel might get stuck. If too high, the startup sequence can be violent.",
        }}
      />

      <Slider
        label="Calibration Speed (%)"
        value={hardware.calibrationSpeed}
        onValueCommit={(v) => setSetting(SettingField.CalibrationSpeed, v)}
        infoPanelProps={{
          description:
            "How fast the wheel rotates during the startup sequence.",
          impact:
            "Lower this if the automatic calibration spin feels too fast or scary.",
        }}
      />

      <Slider
        label="Braking Resistor Limit (%)"
        value={hardware.brakingLimit}
        onValueCommit={(v) => setSetting(SettingField.BrakingLimit, v)}
        infoPanelProps={{
          description:
            "Protects your Power Supply (PSU) from voltage spikes caused by the motor generating electricity (regen) when spinning fast.",
          impact:
            "Increase this if your PSU shuts down during fast wheel movements (like drifting corrections).",
        }}
      />
    </div>
  );
};
