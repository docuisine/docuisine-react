import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";
import {
  StatusItem,
  StatusTable,
} from "@/components/custom/sitesettings/status/item";
import {
  ConfigurationItem,
  ConfigurationTable,
} from "@/components/custom/sitesettings/configuration/item";
import api from "@/lib/api";
import appSettings from "@/lib/settings";
import { useEffect, useState } from "react";
import { type Configuration } from "@/lib/types";
import { BracesIcon, ImageIcon, DatabaseIcon, GithubIcon } from "lucide-react";
import Settings from "@/lib/settings";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

function getVersionDescription(
  upToDate: boolean,
  currentVersion: string,
  latestVersion: string,
) {
  return `${upToDate ? `Up to date (${latestVersion})` : `Update available (${currentVersion} -> ${latestVersion})`} `;
}

export default function SiteSettingsPage() {
  const [configuration, setConfiguration] = useState<Configuration | null>(
    null,
  );
  const [imageHostOK, setImageHostOK] = useState<boolean | null>(null);

  useEffect(() => {
    api.getConfiguration().then(setConfiguration);
    api.healthImageHost().then(setImageHostOK);
  }, []);

  if (!configuration) {
    return (
      <div className="flex justify-center items-center gap-4 h-full w-full m-auto text-lg">
        <Spinner className="w-8 h-8" /> Loading...
      </div>
    );
  }

  const isFrontendLatestVersion =
    appSettings.APP_VERSION === configuration.frontendLatestVersion;
  const isBackendLatestVersion =
    configuration.backendVersion === configuration.backendLatestVersion;
  const isUsingDefaultSecrets = configuration.defaultSecretsUsed.length > 0;

  const configurationItems = [
    { icon: <BracesIcon />, label: "API", description: Settings.BACKEND_URL },
    {
      icon: <ImageIcon />,
      label: "Image Host",
      description: appSettings.IMAGE_HOST,
    },
    {
      icon: <DatabaseIcon />,
      label: "Database",
      description: configuration.databaseURL,
    },
    {
      icon: <DatabaseIcon />,
      label: "Database Type",
      description: configuration.databaseType,
    },
  ];

  return (
    <MiniPage>
      <MiniPageSection title="Status">
        <MiniPageSectionContent>
          <StatusTable>
            <StatusItem
              color={isFrontendLatestVersion ? "green" : "yellow"}
              label="Frontend"
              description={getVersionDescription(
                isFrontendLatestVersion,
                appSettings.APP_VERSION,
                configuration.frontendLatestVersion,
              )}
            />
            <StatusItem
              color={isBackendLatestVersion ? "green" : "yellow"}
              label="Backend"
              description={getVersionDescription(
                isBackendLatestVersion,
                configuration.backendVersion,
                configuration.backendLatestVersion,
              )}
            />
            <StatusItem
              color={imageHostOK ? "green" : "red"}
              label="Image Host"
              description={
                imageHostOK === null
                  ? "Checking..."
                  : imageHostOK
                    ? "Image host is reachable"
                    : "Image host is not reachable"
              }
            />
            <StatusItem
              color={!isUsingDefaultSecrets ? "green" : "red"}
              label="Secrets"
              description={
                isUsingDefaultSecrets
                  ? `Default secrets are being used: ${configuration.defaultSecretsUsed.join(
                      ", ",
                    )}`
                  : "No default secrets in use"
              }
            />
          </StatusTable>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="Configuration">
        <MiniPageSectionContent>
          <ConfigurationTable>
            {configurationItems.map((item) => (
              <ConfigurationItem
                label={item.label}
                description={item.description}
              >
                {item.icon}
              </ConfigurationItem>
            ))}
          </ConfigurationTable>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="Bug Report">
        <MiniPageSectionContent>
          <Button>
            <GithubIcon />
            <a
              href="https://github.com/docuisine/backlog/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a bug or issue
            </a>
          </Button>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
