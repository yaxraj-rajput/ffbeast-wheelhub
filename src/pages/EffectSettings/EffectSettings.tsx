import { SettingField } from "@shubham0x13/ffbeast-wheel-webhid-api";

import { Divider, Slider, ToggleSwitch } from "@/components/ui";
import { useSettingUI } from "@/hooks/use-setting-ui";
import { useDeviceSettingsStore } from "@/stores";

export const EffectSettings = () => {
  const effects = useDeviceSettingsStore((state) => state.settings.effects);
  const setSetting = useSettingUI();

  return (
    <div className="settings">
      <Slider
        label="Motion Range (°)"
        value={effects.motionRange}
        max={1440}
        onValueCommit={(v) => setSetting(SettingField.MotionRange, v)}
        infoPanelProps={{
          description:
            "Sets the maximum physical rotation of the steering wheel in degrees (e.g., 900° for road cars, 360 for Formula cars).",
          impact:
            "Matches the physical wheel rotation to the virtual car's steering lock.",
          animationType: "rotation",
          value: effects.motionRange,
        }}
      />

      <Slider
        label="Total Effect Strength (%)"
        value={effects.totalEffectStrength}
        onValueCommit={(v) => setSetting(SettingField.TotalEffectStrength, v)}
        infoPanelProps={{
          description:
            "The master gain control for all force feedback effects produced by the motor.",
          impact:
            "Scales the overall power. Lower this if the wheel feels too heavy or dangerous; raise it for maximum detail.",
          animationType: "vibrate",
          value: effects.totalEffectStrength,
        }}
      />

      <Slider
        isPro
        label="Integrated Spring Strength (%)"
        value={effects.integratedSpringStrength}
        onValueCommit={(v) =>
          setSetting(SettingField.IntegratedSpringStrength, v)
        }
        infoPanelProps={{
          description:
            "A synthetic centering force that pulls the wheel back to the middle, independent of the game.",
          impact:
            "Useful for older games without FFB. For modern sims, usually set to 0% to let the physics engine control the wheel.",
          animationType: "spring",
        }}
      />

      <Slider
        label="Static Dampening (%)"
        value={effects.staticDampeningStrength}
        onValueCommit={(v) =>
          setSetting(SettingField.StaticDampeningStrength, v)
        }
        infoPanelProps={{
          description:
            "Adds a constant viscous friction to the wheel's rotation, simulating heavy power steering or mechanical weight.",
          impact:
            "Stabilizes the wheel and reduces oscillation on straights, but too much can make the wheel feel sluggish.",
          animationType: "dampen",
        }}
      />

      <Slider
        isPro
        label="Soft Stop Range (°)"
        value={effects.softStopRange}
        max={45}
        onValueCommit={(v) => setSetting(SettingField.SoftStopRange, v)}
        infoPanelProps={{
          description:
            "The angular distance over which the virtual wall force ramps up when you reach the motion limit.",
          impact:
            "A larger range feels like a cushion; a smaller range feels like hitting a hard mechanical stop.",
          animationType: "limit",
        }}
      />

      <Slider
        isPro
        label="Soft Stop Strength (%)"
        value={effects.softStopStrength}
        onValueCommit={(v) => setSetting(SettingField.SoftStopStrength, v)}
        infoPanelProps={{
          description:
            "The maximum force applied when you hit the virtual rotation limit (Soft Stop).",
          impact:
            "Determines how hard the wheel resists when you try to turn past the defined Motion Range.",
          animationType: "bounce",
        }}
      />

      <Slider
        isPro
        label="Soft Stop Dampening (%)"
        value={effects.softStopDampeningStrength}
        onValueCommit={(v) =>
          setSetting(SettingField.SoftStopDampeningStrength, v)
        }
        infoPanelProps={{
          description:
            "Friction applied specifically when the wheel is inside the Soft Stop range.",
          impact:
            "Prevents the wheel from bouncing violently off the virtual wall.",
          animationType: "slow",
        }}
      />

      <Divider label="DirectX Settings" disableLine={false} />

      <ToggleSwitch
        label="Invert Constant Force"
        checked={effects.directXConstantDirection === 1}
        onToggle={(checked) =>
          setSetting(SettingField.DirectXConstantDirection, checked ? 1 : -1)
        }
      />

      <Slider
        isPro
        label="DirectX Spring Force Strength (%)"
        value={effects.directXSpringStrength}
        onValueCommit={(v) => setSetting(SettingField.DirectXSpringStrength, v)}
        infoPanelProps={{
          description:
            "Scales the Spring effects sent specifically by the game engine.",
          impact:
            "Often used by games for menu centering or simplified suspension alignment forces.",
          animationType: "spring",
        }}
      />

      <Slider
        isPro
        label="DirectX Constant Force Strength (%)"
        value={effects.directXConstantStrength}
        onValueCommit={(v) =>
          setSetting(SettingField.DirectXConstantStrength, v)
        }
        infoPanelProps={{
          description:
            "Scales the Constant Force effects, which usually represent sustained G-forces in corners.",
          impact:
            "Adjusts the weight of the car in turns without changing the detail of road texture or bumps.",
          animationType: "constant",
        }}
      />

      <Slider
        isPro
        label="DirectX Periodic Force Strength (%)"
        value={effects.directXPeriodicStrength}
        onValueCommit={(v) =>
          setSetting(SettingField.DirectXPeriodicStrength, v)
        }
        infoPanelProps={{
          description:
            "Scales repetitive vibration effects like engine rumble, road texture strips, and curbs.",
          impact:
            "Enhances the tactile 'buzz' and details of the road surface.",
          animationType: "vibrate",
        }}
      />
    </div>
  );
};
