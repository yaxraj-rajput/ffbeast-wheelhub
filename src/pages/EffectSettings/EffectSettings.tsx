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
        label="Motion Range (%)"
        value={effects.motionRange}
        max={1800}
        onValueCommit={(v) => setSetting(SettingField.MotionRange, v)}
        infoPanelProps={{
          description:
            "Determines how far you can physically turn the wheel. (e.g., 900% for standard road cars, 360% for F1).",
          impact:
            "Matches your physical steering lock to the car you are driving in-game.",
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
            "Lower this if the wheel feels dangerous or too heavy; raise it for maximum road detail.",
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
            "An always-on centering force that pulls the wheel back to the middle, ignoring game physics.",
          impact:
            "Necessary for old games without Force Feedback. For modern sims, set to 0% to let the game control the wheel.",
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
            "Adds constant weight or 'thickness' to the steering, simulating mechanical friction and tires.",
          impact:
            "Stabilizes the wheel on straightaways. Too much will make steering feel muddy and slow.",
          animationType: "dampen",
        }}
      />

      <Slider
        isPro
        label="Soft Stop Range (%)"
        value={effects.softStopRange}
        min={1}
        max={45}
        onValueCommit={(v) => setSetting(SettingField.SoftStopRange, v)}
        infoPanelProps={{
          description:
            "The buffer zone where the force ramps up as you reach the maximum rotation limit.",
          impact:
            "A larger range feels like a soft cushion; a smaller range feels like hitting a hard wall.",
        }}
      />

      <Slider
        isPro
        label="Soft Stop Strength (%)"
        value={effects.softStopStrength}
        onValueCommit={(v) => setSetting(SettingField.SoftStopStrength, v)}
        infoPanelProps={{
          description:
            "How hard the wheel pushes back when you reach the rotation limit (Soft Stop).",
          impact:
            "Ensures you don't turn past the defined Motion Range during intense driving.",
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
            "Extra resistance applied only when you are hitting the rotation limit.",
          impact:
            "Prevents the wheel from bouncing violently off the virtual stops.",
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
            "Scales specific Spring effects sent by the game engine (distinct from the Integrated Spring).",
          impact:
            "Usually controls centering forces in game menus or when resetting the car.",
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
            "Scales Constant Force effects, often used for sustained G-forces in long corners.",
          impact:
            "Adjusts the 'weight' of the car during turns without losing road texture details.",
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
            "Scales repetitive vibration effects like engine rumble, road strips, and collisions.",
          impact:
            "Enhances the tactile 'buzz' and immersion of the road surface.",
          animationType: "vibrate",
          value: 10,
        }}
      />
    </div>
  );
};
