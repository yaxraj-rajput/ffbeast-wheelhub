import "./style.scss";

import logo from "@assets/steering-wheel.png";
import { toast } from "sonner";

import {
  Button,
  Combobox,
  type ComboboxItem,
  type ItemAction,
} from "@/components/ui";
import { useProfileSwitcher } from "@/hooks/use-profile-switcher";
import {
  useAppPreferencesStore,
  useDeviceSettingsStore,
  useProfileStore,
} from "@/stores";
import type { Profile } from "@/types";
import { confirmToast } from "@/utils/toast";

export const Topbar = () => {
  const profileStore = useProfileStore();
  const { profiles, activeProfile, isDirty } = profileStore;

  const { switchProfile } = useProfileSwitcher();

  const handleNewProfile = () => {
    const profileName = prompt("Enter a name for the new profile:");
    if (!profileName?.trim()) return;

    profileStore.createProfile(
      profileName,
      useDeviceSettingsStore.getState().settings,
      useAppPreferencesStore.getState().preferences,
      true,
    );
  };

  const handleProfileSave = () => {
    profileStore.updateActiveProfile(
      useDeviceSettingsStore.getState().settings,
      useAppPreferencesStore.getState().preferences,
    );
    toast.success("Changes saved!");
  };

  const handleProfileRename = (profile: Profile) => {
    const newName = prompt("Enter a new name for the profile:", profile.name);
    if (!newName?.trim() || newName === profile.name) return;
    try {
      profileStore.renameProfile(profile.id, newName);
      toast.success(`Profile renamed to "${newName}".`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleProfileDelete = async (profile: Profile) => {
    try {
      const confirmed = await confirmToast(
        `Are you sure you want to delete the profile "${profile.name}"?`,
        undefined,
        "profile-delete",
        "warning",
      );
      if (!confirmed) return;

      profileStore.deleteProfile(profile.id);
      toast.success(`Profile "${profile.name}" deleted.`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleImportProfiles = async () => {
    try {
      await profileStore.importProfiles();
      toast.success("Profiles imported successfully.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleExportProfiles = () => {
    try {
      profileStore.exportProfiles();
      toast.success("Profiles exported successfully.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const profileActions = (profile: Profile): ItemAction[] => {
    return [
      {
        icon: "icon fi fi-rr-pencil",
        label: "Rename",
        onClick: () => handleProfileRename(profile),
      },
      {
        icon: "icon fi fi-rr-trash",
        label: "Delete",
        className: "danger",
        onClick: () => handleProfileDelete(profile),
      },
    ];
  };

  return (
    <div className="topbar">
      <button
        className="logo_button"
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <img src={logo} alt="FFB" />
      </button>

      <div className="left">
        <div className="title">
          <h1>FFBeast WheelHub</h1>
        </div>
        <div className="info">
          <span className="tag">Wheel</span>
          <span className="version">v{__APP_VERSION__}</span>
        </div>
      </div>

      <div className="right">
        <Combobox
          icon="icon fi fi-sr-user"
          items={[
            ...profiles.map(
              (profile): ComboboxItem => ({
                value: profile.id,
                label: profile.name,
                actions: profileActions(profile),
              }),
            ),
          ]}
          actions={[
            {
              label: "New Profile",
              icon: "icon fi fi-sr-plus",
              onClick: () => handleNewProfile(),
            },
          ]}
          placeholder="Select Profile"
          value={activeProfile?.id}
          onChange={(item) => switchProfile(item.value)}
        />
        {isDirty && (
          <Button
            style={{
              margin: "0rem",
            }}
            onClick={() => {
              handleProfileSave();
            }}
          >
            Save Changes
          </Button>
        )}
        <Button
          variant="secondary"
          icon="icon fi fi-rr-file-import"
          onClick={() => handleImportProfiles()}
          style={{
            aspectRatio: 1 / 1,
            borderRadius: ".8rem",
          }}
        />

        <Button
          variant="secondary"
          icon="icon fi fi-rr-file-export"
          onClick={() => handleExportProfiles()}
          style={{
            aspectRatio: 1 / 1,
            borderRadius: ".8rem",
          }}
        />
      </div>
    </div>
  );
};
