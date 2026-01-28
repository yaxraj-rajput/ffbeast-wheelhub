import "./style.scss";

import { useState } from "react";

import { Button, Divider } from "@/components/ui";
import { DEFAULT_APP_PREFERENCES } from "@/config";
import { useAppPreferencesStore } from "@/stores";
import { THEMES } from "@/theme";

type TabType = "preferences" | "about" | "disclaimer";

interface Tab {
  id: TabType;
  label: string;
  icon?: string;
}

const tabs: Tab[] = [
  { id: "preferences", label: "Preferences" },
  { id: "about", label: "About" },
  { id: "disclaimer", label: "Disclaimer" },
];

export const Settings = () => {
  const { preferences, setTheme } = useAppPreferencesStore();

  const [activeTab, setActiveTab] = useState<TabType>("preferences");

  const renderThemeContent = () => (
    <div className="settings-content">
      <h2>App preferences</h2>
      <p className="settings-description">
        Customize the behaviour, look and feel of the application.
      </p>

      <Divider />

      <div className="theme-section">
        <h3>Themes</h3>
        <div className="color-grid">
          {THEMES.map((theme) => (
            <div
              key={theme.id}
              className={`color-option ${
                preferences.theme === theme.id ? "active" : ""
              }`}
              onClick={() => {
                setTheme(theme.id);
              }}
            >
              <div
                className="color-preview"
                style={{ backgroundColor: theme.preview.accent }}
              />
              <span className="color-name">{theme.name}</span>
            </div>
          ))}
        </div>
      </div>

      <Divider
        style={{
          marginTop: "1rem",
        }}
      />

      <div className="action-buttons">
        <Button onClick={() => setTheme(DEFAULT_APP_PREFERENCES.theme)}>
          Reset to Default
        </Button>
      </div>
    </div>
  );

  const renderAboutContent = () => (
    <div className="settings-content">
      <h2>About FFBeast</h2>

      <Divider />

      <div className="about-section">
        <div className="info-row">
          <span className="info-label">Version:</span>
          <span className="info-value">{__APP_VERSION__}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Build Date:</span>
          <span className="info-value">December 19, 2025</span>
        </div>
        <div className="info-row">
          <span className="info-label">License:</span>
          <span className="info-value">MIT License</span>
        </div>
      </div>

      <Divider />

      <div className="about-description">
        <h3>About This Application</h3>
        <p>
          FFBeast is a powerful force feedback management application designed
          to provide precise control over your force feedback devices. With
          advanced customization options and real-time monitoring, FFBeast
          ensures the best possible experience for your racing and simulation
          needs.
        </p>

        <h3>Features</h3>
        <ul>
          <li>Advanced force feedback control</li>
          <li>Real-time effect monitoring</li>
          <li>Customizable controller settings</li>
          <li>Performance statistics</li>
          <li>Intuitive user interface</li>
        </ul>
      </div>

      <Divider />

      <div className="action-buttons">
        <Button
          onClick={() =>
            window.open(
              "https://github.com/shubham0x13/ffbeast-wheel-webhid-api",
              "_blank",
            )
          }
        >
          WebApp - Github
        </Button>
        <Button
          onClick={() =>
            window.open(
              "https://github.com/shubham0x13/ffbeast-wheel-webhid-api",
              "_blank",
            )
          }
        >
          Web API - Github
        </Button>
        <Button
          style={{ marginLeft: "0rem" }}
          variant="secondary"
          onClick={() => window.open("https://ffbeast.github.io/", "_blank")}
        >
          Documentation
        </Button>
      </div>
    </div>
  );

  const renderDisclaimerContent = () => (
    <div className="settings-content">
      <h2>Disclaimer & Legal</h2>

      <Divider style={{ marginBottom: "1rem" }} />

      <div className="disclaimer-section">
        <h3>Important Notice</h3>
        <p>
          This software is provided &quot;as is&quot; without warranty of any
          kind, either expressed or implied. The developers and contributors are
          not liable for any damages or losses arising from the use of this
          software.
        </p>

        <h3>Hardware Compatibility</h3>
        <p>
          While FFBeast strives to be compatible with a wide range of force
          feedback devices, we cannot guarantee compatibility with all hardware.
          Always ensure your device is properly configured and drivers are up to
          date before use.
        </p>

        <h3>Safety Warning</h3>
        <p className="warning-text">
          Force feedback devices can produce strong forces. Always start with
          low strength settings and gradually increase them. Do not use the
          application if you experience any discomfort. Keep hands, clothing,
          and other objects away from moving parts of the device.
        </p>

        <h3>License</h3>
        <p>
          This software is licensed under the MIT License. You are free to use,
          modify, and distribute this software in accordance with the license
          terms.
        </p>

        <h3>Data Privacy</h3>
        <p>
          FFBeast does not collect or transmit any personal data. All settings
          and configurations are stored locally on your device.
        </p>

        <h3>Third-Party Software</h3>
        <p>
          This application uses various open-source libraries and dependencies.
          Please refer to the documentation for a complete list of third-party
          software and their respective licenses.
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "preferences":
        return renderThemeContent();
      case "about":
        return renderAboutContent();
      case "disclaimer":
        return renderDisclaimerContent();
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Customize your FFBeast experience</p>
        </div>

        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}

          <a
            href="https://www.buymeacoffee.com/yaxx"
            target="_blank"
            rel="noreferrer"
            className="buy_coffee"
          >
            <Button variant="primary" icon="fi fi-rr-coffee">
              Buy us a Coffee
            </Button>
          </a>
        </div>

        <div className="settings-body">{renderContent()}</div>
      </div>
    </div>
  );
};
